from typing import List
from db import db
import enum


class Status(enum.Enum):
    UPLOADED = 1
    COMPUTING = 2
    DONE = 3


class FileModel(db.Model):
    __tablename__ = "files"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.ForeignKey('users.email'), nullable=False)
    submitName = db.Column(db.String(80),  nullable=False)
    state = db.Column(db.Enum(Status),  nullable=False,
                      default=Status.UPLOADED)
    filePath = db.Column(db.String(264), nullable=False)
    ModelURL = db.Column(db.String(264))
    ModelDescription = db.Column(db.Text())
    TotalScore = db.Column(db.Float)
    PRscore = db.Column(db.Float)
    ASRscore = db.Column(db.Float)
    date_upload = db.Column(db.DateTime,  default=db.func.current_timestamp())

    @classmethod
    def find_by_email(cls, email: str) -> "FileModel":
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_all(cls) -> List["FileModel"]:
        return cls.query.all()

    @classmethod
    def get_upload_count_by_mail(cls, email: str) -> int:
        return cls.query.filter_by(email=email).count()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
