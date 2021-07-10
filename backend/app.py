from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from flask_restx import Api
from marshmallow import ValidationError

from db import db
from resources.user import UserInfo, UserLogin
from resources.result import LeaderBoard, Result
from resources.dowload import Example

app = Flask(__name__)
load_dotenv()

app.config.from_object("flask_config")


jwt = JWTManager(app)
CORS(app, resource={r"/api/*":{"origin":"*"}})
api = Api(app)


@app.before_first_request
def create_tables():
    db.create_all()


@app.errorhandler(ValidationError)
def handle_marshmallow_validation(err):
    return jsonify(err.messages), 400


api.add_resource(Result, "/api/result")
api.add_resource(LeaderBoard, "/api/result/leaderboard")
api.add_resource(UserInfo, "/api/user/info")
api.add_resource(UserLogin, "/api/user/login")
api.add_resource(Example, "/api/download/example")

if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5000, debug=True)
