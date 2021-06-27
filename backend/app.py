from flask import Flask, request
from db import db
from models.user import UserModel

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:root@127.0.0.1:3306/superb"


@app.route("/api/login", methods=['POST'])
def login():
    # print(request.get_json())
    req = request.get_json()
    user = UserModel(name=req['name'], email=req['email'])
    user.save_to_db()
    return {"message": "Hello world"}, 200


if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5000, debug=True)
