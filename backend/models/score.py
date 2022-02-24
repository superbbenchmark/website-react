from db import db


class ScoreModel(db.Model):
    __tablename__ = "scores"

    id = db.Column(db.Integer, primary_key=True)
    fileId = db.Column(db.Integer, db.ForeignKey('files.id'), nullable=False)

    # metrics
    PR_per_public = db.Column(db.Float)
    KS_acc_public = db.Column(db.Float)
    IC_acc_public = db.Column(db.Float)
    SID_acc_public = db.Column(db.Float)
    ER_acc_public = db.Column(db.Float)
    ERfold1_acc_public = db.Column(db.Float)
    ERfold2_acc_public = db.Column(db.Float)
    ERfold3_acc_public = db.Column(db.Float)
    ERfold4_acc_public = db.Column(db.Float)
    ERfold5_acc_public = db.Column(db.Float)
    ASR_wer_public = db.Column(db.Float)
    ASR_LM_wer_public = db.Column(db.Float)
    QbE_mtwv_public = db.Column(db.Float)
    SF_f1_public = db.Column(db.Float)
    SF_cer_public = db.Column(db.Float)
    SV_eer_public = db.Column(db.Float)
    SD_der_public = db.Column(db.Float)
    ST_bleu_public = db.Column(db.Float)
    SS_sisdri_public = db.Column(db.Float)
    SE_pesq_public = db.Column(db.Float)
    SE_stoi_public = db.Column(db.Float)

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
