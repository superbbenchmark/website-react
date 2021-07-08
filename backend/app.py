from flask_restx import Api
from config import configs
from resources.user import UserInfo
from resources.file import LeaderBoard, Result
import os
from dotenv import load_dotenv
from flask_cors import CORS
import datetime
from flask_jwt_extended import JWTManager, create_access_token
from flask import Flask, request, send_file
from db import db
from models.user import UserModel
import google_token
from http import HTTPStatus

app = Flask(__name__)
load_dotenv()


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'SQLALCHEMY_DATABASE_URI', default="mysql+pymysql://root:root@127.0.0.1:3306/superb")
app.config['GOOGLE_CLIENT_ID'] = '796679159105-6335p2q2ub5pr15lnf3g2cqkhnucmvkl.apps.googleusercontent.com'
app.config['JWT_SECRET_KEY'] = 'speechlab531'
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # Max file size: 16MB
app.config['UPLOAD_DIR'] = "./upload"

mapping = {"constrained": 1, "less-constrained": 2, "unconstrained": 3}

jwt = JWTManager(app)
CORS(app)
api = Api(app)


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


# @app.route("/api/result/leaderboard", methods=['GET'])
# def leaderboard_request():
#     try:
#         leaderboard_default_data = get_leaderboard_default()
#         leaderboard_user_data = FileModel.find_show_on_leaderboard()
#         submission_names = []
#         for user_data in leaderboard_user_data:
#             submission_names.append(
#                 UserModel.find_by_email(email=user_data.email).name)
#         submission_info = submission_records_parser(
#             leaderboard_user_data, configs, mode="leaderboard")

#         for single_info, name in zip(submission_info, submission_names):
#             single_info.update({"name": name})

#         leaderboard_default_data += submission_info

#         return jsonify({"leaderboard": leaderboard_default_data}), HTTPStatus.OK

#     except Exception as e:
#         print(e)
#         return {"message": "Something went wrong!"}, HTTPStatus.INTERNAL_SERVER_ERROR


# @app.route("/api/profile/quota", methods=["GET"])
# @jwt_required()
# def get_user_quota():
#     try:
#         user_mail = get_jwt_identity()
#         daily_counts = FileModel.get_interval_upload_count_by_mail(
#             email=user_mail, AOEtime=get_AOE_today(to_str=False))
#         monthly_counts = FileModel.get_interval_upload_count_by_mail(
#             email=user_mail, AOEtime=get_AOE_month(to_str=False))
#         daily_left = configs["DAILY_SUBMIT_LIMIT"] - daily_counts
#         monthly_left = configs["MONTHLY_SUBMIT_LIMIT"] - monthly_counts
#         return {"mgs": "Your quota:", "daily_counts": daily_counts, "monthly_counts": monthly_counts, "daily_left": daily_left, "monthly_left": monthly_left}, HTTPStatus.OK

#     except Exception as e:
#         print(e)
#         return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


# @app.route("/api/profile/username", methods=["GET"])
# @jwt_required()
# def get_username():
#     try:
#         user_mail = get_jwt_identity()
#         user = UserModel.find_by_email(email=user_mail)
#         return jsonify({"username": user.name}), HTTPStatus.OK

#     except Exception as e:
#         print(e)
#         return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


# @app.route("/api/profile/resetusername", methods=["POST"])
# @jwt_required()
# def reset_username():
#     try:
#         user_mail = get_jwt_identity()
#         data = request.get_json()
#         newusername = data["newusername"]
#         if (len(newusername) == 0):
#             return jsonify({"msg": "Too short!"}), HTTPStatus.FORBIDDEN

#         UserModel.reset_username(email=user_mail, new_name=newusername)
#         return jsonify({"msg": newusername}), HTTPStatus.OK

#     except Exception as e:
#         print(e)
#         return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


@app.route("/api/download/example", methods=['GET'])
def download_example():
    try:
        return send_file("./examples/predict.zip", as_attachment=True)

    except Exception as e:
        return {"message": "Something went wrong!"}, HTTPStatus.INTERNAL_SERVER_ERROR


api.add_resource(Result, "/api/result")
api.add_resource(LeaderBoard, "/api/result/leaderboard")
api.add_resource(UserInfo, "/api/user/info")

if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5000, debug=True)
