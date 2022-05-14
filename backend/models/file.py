from typing import List
from db import db
import enum
import datetime
from sqlalchemy.dialects.mysql import BIGINT


class Status(enum.Enum):
    UPLOADED = 1
    COMPUTING = 2
    DONE = 3
    ERROR = 4


class Task(enum.Enum):
    CONSTRAINED = 1
    LESS_CONSTRAINED = 2
    UNCONSTRAINED = 3


class Show(enum.Enum):
    NO = 0
    YES = 1


class FileModel(db.Model):
    __tablename__ = "files"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.ForeignKey('users.email'), nullable=False)
    submitUUID = db.Column(db.CHAR(36),  nullable=False)

    # upload froms
    submitName = db.Column(db.String(80),  nullable=False)
    modelURL = db.Column(db.String(264))
    modelDesc = db.Column(db.Text())
    stride = db.Column(db.Text())
    inputFormat = db.Column(db.Text())
    corpus = db.Column(db.Text())
    paramDesc = db.Column(db.Text())
    paramShared = db.Column(db.String(80))
    fineTunedParam = db.Column(db.String(80))
    taskSpecParam = db.Column(db.String(80))
    task = db.Column(db.Enum(Task),  nullable=False)

    # others
    state = db.Column(db.Enum(Status),  nullable=False,
                      default=Status.UPLOADED)
    stateInfo = db.Column(db.String(80))
    filePath = db.Column(db.String(264), nullable=False)
    aoeTimeUpload = db.Column(db.DateTime, nullable=False)
    dateUpload = db.Column(db.DateTime,  default=db.func.current_timestamp())
    showOnLeaderboard = db.Column(db.Enum(Show),  nullable=False, default=Show.NO)
    
    # profiling
    macs = db.Column(BIGINT(unsigned=True))
    macsShort = db.Column(BIGINT(unsigned=True))
    macsMedium = db.Column(BIGINT(unsigned=True))
    macsLong = db.Column(BIGINT(unsigned=True))
    macsLonger = db.Column(BIGINT(unsigned=True))

    scores = db.relationship("ScoreModel",  backref="files")

    @classmethod
    def find_by_email(cls, email: str) -> "FileModel":
        return cls.query.filter_by(email=email)
    
    @classmethod
    def find_by_submitID(cls, submitUUID: str) -> "FileModel":
        return cls.query.filter_by(submitUUID=submitUUID).first()

    @classmethod
    def reset_same_task_show_attribute(cls, email: str, task: enum.Enum) -> None:
        submissions = cls.query.filter_by(email=email, task=task).all()
        for submission in submissions:
            submission.showOnLeaderboard = Show.NO
        db.session.commit()
    
    @classmethod
    def set_show_attribute_by_submitID(cls, submitUUID) -> None:
        submission = cls.query.filter_by(submitUUID=submitUUID).first()
        submission.showOnLeaderboard = Show.YES
        db.session.commit()

    @classmethod
    def unset_show_attribute_by_submitID(cls, submitUUID) -> None:
        submission = cls.query.filter_by(submitUUID=submitUUID).first()
        submission.showOnLeaderboard = Show.NO
        db.session.commit()

    @classmethod
    def find_all(cls) -> List["FileModel"]:
        return cls.query.all()

    @classmethod
    def find_show_on_leaderboard(cls) -> List["FileModel"]:
        return cls.query.filter_by(showOnLeaderboard=Show.YES).all()

    @classmethod
    def get_upload_count_by_mail(cls, email: str) -> int:
        return cls.query.filter_by(email=email).count()
    
    @classmethod
    def get_interval_upload_count_by_mail(cls, email: str, AOEtime: datetime.datetime) -> int:
        return cls.query.filter_by(email=email).filter(cls.aoeTimeUpload >= AOEtime).count()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
