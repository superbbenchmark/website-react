from flask import Flask, request
from db import db
from models.user import UserModel
import google_token
from http import HTTPStatus


app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:root@127.0.0.1:3306/superb"
app.config['GOOGLE_CLIENT_ID'] = '796679159105-6335p2q2ub5pr15lnf3g2cqkhnucmvkl.apps.googleusercontent.com'


@app.route("/api/login", methods=['POST'])
def login():

    try:
        if 'id_token' not in request.get_json():
            return {"message": "No ID token provided"}, HTTPStatus.FORBIDDEN

        token = request.get_json()['id_token']

        try:
            identity = google_token.validate_id_token(
                token, app.config['GOOGLE_CLIENT_ID'])
            print(identity)
        except ValueError:
            return {"message": 'Invalid ID token'}, HTTPStatus.FORBIDDEN

        # Get the user info out of the validated identity
        if ('email' not in identity or 'name' not in identity):
            return {"message": "Unexcpected authorization response"}, HTTPStatus.FORBIDDEN

        if not UserModel.find_by_email(email=identity['email']):
            user = UserModel(email=identity['email'], name=identity['name'])
            user.save_to_db()
        return {"message": "Login Success"}, HTTPStatus.OK
    except:
        return {"message": "Something went wrong!"}, HTTPStatus.INTERNAL_SERVER_ERROR


if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5000, debug=True)