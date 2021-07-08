from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os
from flask_restx import Api
from db import db
from resources.user import UserInfo, UserLogin
from resources.result import LeaderBoard, Result
from resources.dowload import Example

app = Flask(__name__)
load_dotenv()


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'SQLALCHEMY_DATABASE_URI', default="mysql+pymysql://root:root@127.0.0.1:3306/superb")
app.config['GOOGLE_CLIENT_ID'] = '796679159105-6335p2q2ub5pr15lnf3g2cqkhnucmvkl.apps.googleusercontent.com'
app.config['JWT_SECRET_KEY'] = 'speechlab531'
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # Max file size: 16MB
app.config['UPLOAD_DIR'] = "./upload"


jwt = JWTManager(app)
CORS(app)
api = Api(app)


@app.before_first_request
def create_tables():
    db.create_all()


api.add_resource(Result, "/api/result")
api.add_resource(LeaderBoard, "/api/result/leaderboard")
api.add_resource(UserInfo, "/api/user/info")
api.add_resource(UserLogin, "/api/user/login")
api.add_resource(Example, "/api/download/example")

if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5000, debug=True)
