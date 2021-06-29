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
    state = db.Column(db.Enum(Status))
    filePath = db.Column(db.String(264))
    SubmitName = db.Column(db.String(80))
    ModelURL = db.Column(db.String(264))
    ModelDescription = db.Column(db.Text())
    TotalScore = db.Column(db.Float)
    PRscore = db.Column(db.Float)
    ASRscore = db.Column(db.Float)

    @classmethod
    def find_by_email(cls, email: str) -> "FileModel":
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_all(cls) -> List["FileModel"]:
        return cls.query.all()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
