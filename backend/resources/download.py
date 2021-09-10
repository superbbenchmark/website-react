from flask_restx import Resource
from flask import send_file
from http import HTTPStatus


class Example(Resource):
    @classmethod
    def get(cls):
        '''Download examples'''
        try:
            return send_file("./examples/predict.zip", as_attachment=True)
        except Exception as e:
            return {"message": "Something went wrong!"}, HTTPStatus.INTERNAL_SERVER_ERROR

class Expdirs(Resource):
    @classmethod
    def get(cls):
        '''Download examples'''
        try:
            return send_file("./examples/expdirs.zip", as_attachment=True)
        except Exception as e:
            return {"message": "Something went wrong!"}, HTTPStatus.INTERNAL_SERVER_ERROR
