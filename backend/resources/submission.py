from flask_restx import Resource
from flask import request, jsonify, make_response, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from threading import Thread
from http import HTTPStatus

from models.file import FileModel, Task, Show
from models.hiddenfile import HiddenFileModel
from models.score import ScoreModel
from models.hiddenscore import HiddenScoreModel
from models.user import UserModel
from schemas.submission import SubmissionPublicSchema, SubmissionHiddenSchema
from utils import submission_records_parser, get_AOE_week, get_AOE_today,  get_leaderboard_default, get_hidden_leaderboard_default, check_admin_credential, admin_submission_records_parser
from sendmail import send_email
from calculate import metric_calculate_pipeline
from config import configs
import file_upload

publicFormSchema = SubmissionPublicSchema()
hiddenFormSchema = SubmissionHiddenSchema()

class AdminForHidden(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        '''Get all hidden submissions'''
        try:
            user_mail = get_jwt_identity()

            if check_admin_credential(user_mail):
                submission_records = HiddenFileModel.find_all()
                submission_info = admin_submission_records_parser(
                    submission_records, configs)
                return make_response(jsonify({"submission_info": submission_info}), HTTPStatus.OK)
            else:
                return {"message": "You are not admin."}, HTTPStatus.FORBIDDEN

        except Exception as e:
            print(e)
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


    @classmethod
    @jwt_required()
    def patch(cls, submitID, task, score):
        '''Change hidden score'''
        try:
            user_mail = get_jwt_identity()

            if check_admin_credential(user_mail):
                HiddenFileModel.find_by_submitID_task_and_modity_score(submitUUID=submitID, task=task, score=score)
                return {"message": "good"}, HTTPStatus.OK
            else:
                return {"message": "You are not admin."}, HTTPStatus.FORBIDDEN

        except Exception as e:
            print(e)
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR

class Submission(Resource):
    @classmethod
    @jwt_required()
    def get(cls, submitID):
        '''Get submission by submit uuid'''
        try:
            user_mail = get_jwt_identity()

            submission_record = FileModel.find_by_submitID(submitUUID=submitID)
            assert submission_record.email == user_mail
            download_path = submission_record.filePath

            return send_file(download_path, as_attachment=True)
        except Exception as e:
            print(e)
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    @jwt_required()
    def post(cls):
        '''Upload user submission'''
        try:
            user_mail = get_jwt_identity()

            # check current submission counts
            daily_counts = FileModel.get_interval_upload_count_by_mail(
                email=user_mail, AOEtime=get_AOE_today(to_str=False))
            weekly_counts = FileModel.get_interval_upload_count_by_mail(
                email=user_mail, AOEtime=get_AOE_week(to_str=False))
            if (daily_counts >= configs["DAILY_SUBMIT_LIMIT"]) or (weekly_counts >= configs["WEEKLY_SUBMIT_LIMIT"]):
                return {"message": f"Exceed Submission Limit: You have submitted {daily_counts} times today and {weekly_counts} times this week."}, HTTPStatus.FORBIDDEN

            # file validation
            file = request.files['file']

            if file.filename == "":
                return {"message": "No file selected."}, HTTPStatus.FORBIDDEN
            if not file_upload.zipfile_check(file):
                return {"message": "Wrong file format."}, HTTPStatus.FORBIDDEN

            # load form data
            formData = publicFormSchema.load(request.form)

            # get file path
            upload_count = FileModel.get_upload_count_by_mail(
                email=user_mail) + 1
            folder = file_upload.create_folder(user_mail, str(upload_count))
            file_path = file_upload.get_full_path(folder, file.filename)

            # add column for db
            formData.update({"email": user_mail, "filePath": file_path})

            fileObj = FileModel(**formData)
            scoreObj = ScoreModel()
            fileObj.scores.append(scoreObj)
            fileObj.save_to_db()
            try:
                file.save(file_path)

                # start processing
                thread = Thread(target=metric_calculate_pipeline, kwargs={"file_path": file_path,
                                                                          "submitUUID": formData["submitUUID"]})
                thread.start()

                return {"message": "Upload successfully!"}, HTTPStatus.OK
            except Exception as e:
                fileObj.delete_from_db()  # Rollback
                return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR
        except ValidationError as e:
            return {"message": "There's something worng with your input!"}, HTTPStatus.BAD_REQUEST
        except Exception as e:
            print(e)
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    @jwt_required()
    def patch(cls, submitID):
        '''Change user submission show on leaderboard or not by uuid'''
        try:
            user_mail = get_jwt_identity()

            submission_record = FileModel.find_by_submitID(submitUUID=submitID)

            assert submission_record.email == user_mail
            task_id = submission_record.task.value  # == mapping[task]

            if submission_record.showOnLeaderboard == Show.YES:
                FileModel.unset_show_attribute_by_submitID(submitUUID=submitID)
                return {"message": "Remove from the leaderboard!", "submitID": submitID}, HTTPStatus.OK

            else:
                FileModel.set_show_attribute_by_submitID(submitUUID=submitID)
                return {"message": "Shown on the leaderboard!", "submitID": submitID}, HTTPStatus.OK

        except Exception as e:
            print(e)
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


class SubmissionList(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        '''Get user all submission info'''
        try:
            user_mail = get_jwt_identity()
            submission_records = FileModel.find_by_email(email=user_mail).all()
            submission_info = submission_records_parser(
                submission_records, configs, mode="individual")
            return make_response(jsonify({"submission_info": submission_info}), HTTPStatus.OK)
        except Exception as e:
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


class LeaderBoard(Resource):
    @classmethod
    def get(cls):
        '''Get leaderboard data'''
        try:
            leaderboard_default_data = get_leaderboard_default()
            leaderboard_user_data = FileModel.find_show_on_leaderboard()
            submission_names = []
            for user_data in leaderboard_user_data:
                submission_names.append(
                    UserModel.find_by_email(email=user_data.email).name)
            submission_info = submission_records_parser(
                leaderboard_user_data, configs, mode="leaderboard")

            for single_info, name in zip(submission_info, submission_names):
                single_info.update({"name": name})

            leaderboard_default_data += submission_info

            return {"leaderboard": leaderboard_default_data}, HTTPStatus.OK

        except Exception as e:
            print(e)
            return {"message": "Something went wrong!"}, HTTPStatus.INTERNAL_SERVER_ERROR


class HiddenSubmission(Resource):
    @classmethod
    @jwt_required()
    def post(cls):
        '''Upload user submission'''
        try:
            user_mail = get_jwt_identity()

            # check current submission counts
            daily_counts = HiddenFileModel.get_interval_upload_count_by_mail(
                email=user_mail, AOEtime=get_AOE_today(to_str=False))
            weekly_counts = HiddenFileModel.get_interval_upload_count_by_mail(
                email=user_mail, AOEtime=get_AOE_week(to_str=False))
            if (daily_counts >= configs["HIDDEN_DAILY_SUBMIT_LIMIT"]) or (weekly_counts >= configs["HIDDEN_WEEKLY_SUBMIT_LIMIT"]):
                return {"message": f"Exceed Submission Limit: You have submitted {daily_counts} times today and {weekly_counts} times this week."}, HTTPStatus.FORBIDDEN

            # load form data
            formData = hiddenFormSchema.load(request.form)

            # add column for db
            formData.update({"email": user_mail})

            fileObj = HiddenFileModel(**formData)
            scoreObj = HiddenScoreModel()
            fileObj.scores.append(scoreObj)
            fileObj.save_to_db()

            # Google baned non official login since 2022/5/30, https://support.google.com/accounts/answer/6010255?hl=zh-Hant
            # send_email(participant_email = user_mail, formData = formData)

            return {"message": "Submit successfully!"}, HTTPStatus.OK

        except ValidationError as e:
            return {"message": "There's something worng with your input!"}, HTTPStatus.BAD_REQUEST
        except Exception as e:
            print(e)
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR

    @classmethod
    @jwt_required()
    def patch(cls, submitID):
        '''Change user submission show on leaderboard or not by uuid'''
        try:
            user_mail = get_jwt_identity()

            submission_record = HiddenFileModel.find_by_submitID(submitUUID=submitID)

            assert submission_record.email == user_mail
            task_id = submission_record.task.value  # == mapping[task]

            if submission_record.showOnLeaderboard == Show.YES:
                HiddenFileModel.unset_show_attribute_by_submitID(submitUUID=submitID)
                return {"message": "Remove from the leaderboard!", "submitID": submitID}, HTTPStatus.OK
            else:
                HiddenFileModel.set_show_attribute_by_submitID(submitUUID=submitID)
                return {"message": "Shown on the leaderboard!", "submitID": submitID}, HTTPStatus.OK

        except Exception as e:
            print(e)
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR

class HiddenSubmissionList(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        '''Get user all submission info'''
        try:
            user_mail = get_jwt_identity()
            submission_records = HiddenFileModel.find_by_email(email=user_mail).all()
            submission_info = submission_records_parser(
                submission_records, configs, mode="individual", competition_type="hidden")
            return make_response(jsonify({"submission_info": submission_info}), HTTPStatus.OK)
        except Exception as e:
            return {"message": "Internal Server Error!"}, HTTPStatus.INTERNAL_SERVER_ERROR


class HiddenLeaderBoard(Resource):
    @classmethod
    def get(cls):
        '''Get hidden leaderboard data'''
        try:
            leaderboard_default_data = get_hidden_leaderboard_default()
            leaderboard_user_data = HiddenFileModel.find_all()
            submission_names = []
            for user_data in leaderboard_user_data:
                submission_names.append(
                    UserModel.find_by_email(email=user_data.email).name)
            submission_info = submission_records_parser(
                leaderboard_user_data, configs, mode="leaderboard", competition_type="hidden")

            for single_info, name in zip(submission_info, submission_names):
                single_info.update({"name": name})

            leaderboard_default_data += submission_info

            return {"leaderboard": leaderboard_default_data}, HTTPStatus.OK

        except Exception as e:
            print(e)
            return {"message": "Something went wrong!"}, HTTPStatus.INTERNAL_SERVER_ERROR