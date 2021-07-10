import os

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_DATABASE_URI = os.getenv(
    'SQLALCHEMY_DATABASE_URI', default="mysql+pymysql://root:root@127.0.0.1:3306/superb")

JWT_SECRET_KEY = 'speechlab531'
MAX_CONTENT_LENGTH = 50 * 1024 * 1024
JWT_ERROR_MESSAGE_KEY = "message"
