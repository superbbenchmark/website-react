from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from flask_restx import Api
from marshmallow import ValidationError

from db import db
from resources.user import UserInfo, UserLogin
from resources.submission import LeaderBoard, Submission, SubmissionList
from resources.download import Example

app = Flask(__name__)
load_dotenv()

app.config.from_object("flask_config")


jwt = JWTManager(app)
CORS(app, resource={r"/api/*": {"origin": "*"}})
api = Api(app)


@app.before_first_request
def create_tables():
    db.create_all()


@app.errorhandler(ValidationError)
def handle_marshmallow_validation(err):
    return jsonify(err.messages), 400


api.add_resource(Submission, "/api/submission", methods=["POST"])
api.add_resource(Submission, "/api/submission/<string:submitID>",
                 methods=["GET", "PATCH"])
api.add_resource(SubmissionList, "/api/submissions")
api.add_resource(LeaderBoard, "/api/submission/leaderboard")
api.add_resource(UserInfo, "/api/user/info")
api.add_resource(UserLogin, "/api/user/login")
api.add_resource(Example, "/api/download/example")

db.init_app(app)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
