from typing import List
from db import db
import enum
import datetime
from .file import Status, Task, Show


class HiddenFileModel(db.Model):
    __tablename__ = "hiddenfiles"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.ForeignKey('users.email'), nullable=False)
    submitUUID = db.Column(db.CHAR(36),  nullable=False)

    # upload froms
    submitName = db.Column(db.String(80),  nullable=False)
    modelDesc = db.Column(db.Text())
    huggingfaceOrganizationName = db.Column(db.String(80))
    huggingfaceRepoName = db.Column(db.String(80))
    huggingfaceCommonHash = db.Column(db.String(80))
    paramShared = db.Column(db.String(80))
    task = db.Column(db.Enum(Task),  nullable=False)

    # others
    state = db.Column(db.Enum(Status),  nullable=False,
                      default=Status.UPLOADED)
    stateInfo = db.Column(db.String(80))
    aoeTimeUpload = db.Column(db.DateTime, nullable=False)
    dateUpload = db.Column(db.DateTime,  default=db.func.current_timestamp())
    showOnLeaderboard = db.Column(db.Enum(Show),  nullable=False, default=Show.NO)

    scores = db.relationship("HiddenScoreModel",  backref="hiddenfiles")

    @classmethod
    def find_by_email(cls, email: str) -> "HiddenFileModel":
        return cls.query.filter_by(email=email)
    
    @classmethod
    def find_by_submitID(cls, submitUUID: str) -> "HiddenFileModel":
        return cls.query.filter_by(submitUUID=submitUUID).first()
    
    @classmethod
    def find_by_submitID_task_and_modity_score(cls, submitUUID: str, task: str, score) -> None:
        submission = cls.query.filter_by(submitUUID=submitUUID).first()
        setattr(submission.scores[0], task, float(score))
        db.session.commit()

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
    def find_all(cls) -> List["HiddenFileModel"]:
        return cls.query.all()

    @classmethod
    def find_show_on_leaderboard(cls) -> List["HiddenFileModel"]:
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
