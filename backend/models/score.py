from db import db


class ScoreModel(db.Model):
    __tablename__ = "scores"

    id = db.Column(db.Integer, primary_key=True)
    fileId = db.Column(db.Integer, db.ForeignKey('files.id'), nullable=False)

    # metrics
    ASR = db.Column(db.Float)
    PR = db.Column(db.Float)
    SID = db.Column(db.Float)

    @classmethod
    def find_by_fileId(cls, _id: int) -> "ScoreModel":
        return cls.query.filter_by(fileId=_id)

    @classmethod
    def find_by_id(cls, _id: int) -> "ScoreModel":
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
