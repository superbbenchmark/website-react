from flask import Flask, request, jsonify
from db import db
from models.user import UserModel
from models.files import FileModel
import google_token
from http import HTTPStatus
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime
from flask_cors import CORS
from utils import get_leaderboard
import file_upload

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:root@127.0.0.1:3306/superb"
app.config['GOOGLE_CLIENT_ID'] = '796679159105-6335p2q2ub5pr15lnf3g2cqkhnucmvkl.apps.googleusercontent.com'
app.config['JWT_SECRET_KEY'] = 'speechlab531'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Max file size: 16MB
app.config['UPLOAD_DIR'] = "./upload"

jwt = JWTManager(app)
CORS(app)


@app.before_first_request
def create_tables():
    db.create_all()


@app.route("/api/login", methods=['POST'])
def login():
    try:
        if 'id_token' not in request.get_json():
            return {"message": "No Google ID token provided"}, HTTPStatus.FORBIDDEN

        token = request.get_json()['id_token']

        try:
            identity = google_token.validate_id_token(
                token, app.config['GOOGLE_CLIENT_ID'])
        except ValueError:
            return {"message": 'Invalid Google ID token'}, HTTPStatus.FORBIDDEN

        # Get the user info out of the validated identity
        if ('email' not in identity or 'name' not in identity):
            return {"message": "Unexcpected authorization response"}, HTTPStatus.FORBIDDEN

        if not UserModel.find_by_email(email=identity['email']):
            user = UserModel(email=identity['email'], name=identity['name'])
            user.save_to_db()
        access_token = create_access_token(
            identity=identity['email'], expires_delta=datetime.timedelta(hours=1))
        return {"message": "Login Success", "access_token": access_token}, HTTPStatus.OK

    except Exception as e:
        print(e)
        return {"message": "Something went wrong!"}, HTTPStatus.INTERNAL_SERVER_ERROR


@app.route("/api/result/leaderboard", methods=['GET'])
def leaderboard_request():
    try:
        leaderboard_data = get_leaderboard()
        return jsonify({"leaderboard": leaderboard_data}), HTTPStatus.OK

    except Exception as e:
        print(e)
        return {"message": "Something went wrong!"}, HTTPStatus.INTERNAL_SERVER_ERROR


@app.route("/api/result/upload", methods=["POST"])
@jwt_required()
def result_upload():
    try:
        user_mail = get_jwt_identity()
        file = request.files['file']

        if file.filename == "":
            return {"msg": "No file selected."}, HTTPStatus.FORBIDDEN
        if not file_upload.zipfile_check(file):
            return {"msg": "Wrong file format."}, HTTPStatus.FORBIDDEN

        upload_count = FileModel.get_upload_count_by_mail(email=user_mail) + 1
        folder = file_upload.create_folder(user_mail, str(upload_count))
        file_path = file_upload.get_path(folder, file.filename)
        fileObj = FileModel(
            email=user_mail, submitName="Test", filePath=file_path)
        fileObj.save_to_db()

        try:
            file.save(file_path)
            return {"msg": "Upload Success!"}, HTTPStatus.OK
        except Exception as e:
            fileObj.delete_from_db()  # Rollback
            return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR
    except:
        return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5000, debug=True)
