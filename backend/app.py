import flask
from flask import Flask

app = Flask(__name__)


@app.route("/login")
def login():
    return {"message": "Hello world"}, 200


if __name__ == '__main__':
    app.run(debug=True)
