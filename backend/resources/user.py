from flask_restx import Resource
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from http import HTTPStatus

from models.user import UserModel
from models.file import FileModel
from utils import get_AOE_today, get_AOE_month
from config import configs


class UserInfo(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        try:
            user_mail = get_jwt_identity()
            user = UserModel.find_by_email(email=user_mail)

            daily_counts = FileModel.get_interval_upload_count_by_mail(
                email=user_mail, AOEtime=get_AOE_today(to_str=False))
            monthly_counts = FileModel.get_interval_upload_count_by_mail(
                email=user_mail, AOEtime=get_AOE_month(to_str=False))
            daily_left = configs["DAILY_SUBMIT_LIMIT"] - daily_counts
            monthly_left = configs["MONTHLY_SUBMIT_LIMIT"] - monthly_counts
            return {"username": user.name, "daily_counts": daily_counts, "monthly_counts": monthly_counts, "daily_left": daily_left, "monthly_left": monthly_left}, HTTPStatus.OK

        except Exception as e:
            print(e)
            return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    @jwt_required()
    def patch(cls):
        try:
            user_mail = get_jwt_identity()
            data = request.get_json()
            newusername = data["name"]
            if (len(newusername) == 0):
                return {"msg": "Too short!"}, HTTPStatus.FORBIDDEN

            UserModel.reset_username(email=user_mail, new_name=newusername)
            return {"newUserName": newusername}, HTTPStatus.OK

        except Exception as e:
            print(e)
            return {"msg": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR
