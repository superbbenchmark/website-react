from flask import Flask, request, jsonify, send_file
from threading import Thread
from db import db
from models.user import UserModel
from models.file import FileModel, Task, Show
from models.score import ScoreModel
import google_token
from http import HTTPStatus
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime
from flask_cors import CORS
from utils import get_leaderboard_default, get_AOETime, get_uuid, submission_records_parser
import file_upload
from calculate import metric_calculate_pipeline
from dotenv import load_dotenv
import os
import yaml

app = Flask(__name__)
load_dotenv()

with open("configs.yaml") as f:
    configs = yaml.safe_load(f)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI', default="mysql+pymysql://root:root@127.0.0.1:3306/superb")
app.config['GOOGLE_CLIENT_ID'] = '796679159105-6335p2q2ub5pr15lnf3g2cqkhnucmvkl.apps.googleusercontent.com'
app.config['JWT_SECRET_KEY'] = 'speechlab531'
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # Max file size: 16MB
app.config['UPLOAD_DIR'] = "./upload"

mapping = {"constrained":1, "less-constrained":2, "unconstrained":3}

jwt = JWTManager(app)
CORS(app)


@app.before_first_request
def create_tables():
    db.create_all()


@app.route("/api/login", methods=['POST'])
def login():
    try:
        if 'id_token' not in request.get_json():
            return {"msg": "No Google ID token provided"}, HTTPStatus.FORBIDDEN

        token = request.get_json()['id_token']

        try:
            identity = google_token.validate_id_token(
                token, app.config['GOOGLE_CLIENT_ID'])
        except ValueError:
            return {"msg": 'Invalid Google ID token'}, HTTPStatus.FORBIDDEN

        # Get the user info out of the validated identity
        if ('email' not in identity or 'name' not in identity):
            return {"msg": "Unexcpected authorization response"}, HTTPStatus.FORBIDDEN

        if not UserModel.find_by_email(email=identity['email']):
            user = UserModel(email=identity['email'], name=identity['name'])
            user.save_to_db()
        access_token = create_access_token(
            identity=identity['email'], expires_delta=datetime.timedelta(hours=1))
        return {"msg": "Login Success", "access_token": access_token}, HTTPStatus.OK

    except Exception as e:
        print(e)
        return {"msg": "Something went wrong!"}, HTTPStatus.INTERNAL_SERVER_ERROR


@app.route("/api/result/leaderboard", methods=['GET'])
def leaderboard_request():
    try:
        leaderboard_default_data = get_leaderboard_default()
        leaderboard_user_data = FileModel.find_show_on_leaderboard()
        submission_info = submission_records_parser(leaderboard_user_data, configs, mode = "leaderboard")
        leaderboard_default_data += submission_info

        return jsonify({"leaderboard": leaderboard_default_data}), HTTPStatus.OK

    except Exception as e:
        print(e)
        return {"message": "Something went wrong!"}, HTTPStatus.INTERNAL_SERVER_ERROR

@app.route("/api/result/individual", methods=["GET"])
@jwt_required()
def individual_upload():
    try:
        user_mail = get_jwt_identity()
        submission_records = FileModel.find_by_email(email=user_mail).all()
        submission_info = submission_records_parser(submission_records, configs, mode="individual")

        return jsonify({"submission_info": submission_info}), HTTPStatus.OK
    except Exception as e:
        print(e)
        return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR

@app.route("/api/result/shown", methods=["POST"])
@jwt_required()
def set_shown_result():
    try:
        user_mail = get_jwt_identity()
        data = request.get_json()
        task = data["task"]
        submitID = data["submission_id"]
        submission_record = FileModel.find_by_submitID(submitUUID=submitID)

        assert submission_record.email == user_mail
        task_id = submission_record.task.value #== mapping[task]

        if submission_record.showOnLeaderboard == Show.YES:
            # set the "show" of all the same task submission to "NO"
            FileModel.reset_same_task_show_attribute(email=user_mail, task=Task(task_id))
            return jsonify({"msg": "Remove from the leaderboard!", "submitID":submitID}), HTTPStatus.OK
        
        else:
            # set the "show" of all the same task submission to "NO"
            FileModel.reset_same_task_show_attribute(email=user_mail, task=Task(task_id))
            FileModel.set_show_attribute_by_submitID(submitUUID=submitID)
            return jsonify({"msg": "Shown on the leaderboard!", "submitID":submitID}), HTTPStatus.OK

    except Exception as e:
        return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR

@app.route("/api/result/upload", methods=["POST"])
@jwt_required()
def result_upload():
    try:
        user_mail = get_jwt_identity()

        # TODO: Form Validation
        submitName = request.form.get('submitName')
        modelURL = request.form.get('modelURL')
        modelDesc = request.form.get('modelDesc')
        stride = request.form.get('stride')
        inputFormat = request.form.get('inputFormat')
        corpus = request.form.get('corpus')
        paramDesc = request.form.get('paramDesc')
        paramShared = request.form.get('paramShared')
        fineTunedParam = request.form.get('fineTunedParam')
        taskSpecParam = request.form.get('taskSpecParam')
        task = request.form.get('task')
        task = Task(mapping[task])
        file = request.files['file']
        if not (submitName and modelDesc and paramDesc):
            return {"msg": "Column Missing."}, HTTPStatus.FORBIDDEN

        if file.filename == "":
            return {"msg": "No file selected."}, HTTPStatus.FORBIDDEN
        if not file_upload.zipfile_check(file):
            return {"msg": "Wrong file format."}, HTTPStatus.FORBIDDEN

        upload_count = FileModel.get_upload_count_by_mail(email=user_mail) + 1

        folder = file_upload.create_folder(user_mail, str(upload_count))
        file_path = file_upload.get_full_path(folder, file.filename)

        submitUUID = get_uuid()

        fileObj = FileModel(
            email=user_mail,
            submitUUID=submitUUID,
            submitName=submitName,
            modelURL=modelURL,
            modelDesc=modelDesc,
            stride=stride,
            inputFormat=inputFormat,
            corpus=corpus,
            paramDesc=paramDesc,
            paramShared=paramShared,
            fineTunedParam=fineTunedParam,
            taskSpecParam=taskSpecParam,
            task=task,
            filePath=file_path,
            aoeTimeUpload=get_AOETime()
        )
        scoreObj = ScoreModel()
        fileObj.scores.append(scoreObj)
        fileObj.save_to_db()

        try:
            file.save(file_path)

            # start processing
            thread = Thread(target=metric_calculate_pipeline, kwargs={"file_path":file_path,
                                                                      "submitUUID":submitUUID})
            thread.start()

            return {"msg": "Upload Success!"}, HTTPStatus.OK
        except Exception as e:
            fileObj.delete_from_db()  # Rollback
            return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR
    except Exception as e:
        return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR

@app.route("/api/download/example", methods=['GET'])
def download_example():
    try:
        return send_file("./examples/predict.zip", as_attachment=True)

    except Exception as e:
        return {"message": "Something went wrong!"}, HTTPStatus.INTERNAL_SERVER_ERROR


if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5000, debug=True)
