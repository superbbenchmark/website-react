from db import db
from sqlalchemy.dialects.mysql import BIGINT

class HiddenScoreModel(db.Model):
    __tablename__ = "hiddenscores"

    id = db.Column(db.Integer, primary_key=True)
    fileId = db.Column(db.Integer, db.ForeignKey('hiddenfiles.id'), nullable=False)

    # metrics
    ## hidden dev set
    PR_per_hidden_dev = db.Column(db.Float)
    SID_acc_hidden_dev = db.Column(db.Float)
    ER_acc_hidden_dev = db.Column(db.Float)
    ASR_wer_hidden_dev = db.Column(db.Float)
    SV_eer_hidden_dev = db.Column(db.Float)
    SD_der_hidden_dev = db.Column(db.Float)
    QbE_map_hidden_dev = db.Column(db.Float)
    QbE_eer_hidden_dev = db.Column(db.Float)
    ST_bleu_hidden_dev = db.Column(db.Float)
    SS_sisdri_hidden_dev = db.Column(db.Float)
    SE_pesq_hidden_dev = db.Column(db.Float)
    SE_stoi_hidden_dev = db.Column(db.Float)

    ## hidden test set
    PR_per_hidden_test = db.Column(db.Float)
    SID_acc_hidden_test = db.Column(db.Float)
    ER_acc_hidden_test = db.Column(db.Float)
    ASR_wer_hidden_test = db.Column(db.Float)
    SV_eer_hidden_test = db.Column(db.Float)
    SD_der_hidden_test = db.Column(db.Float)
    QbE_map_hidden_test = db.Column(db.Float)
    QbE_eer_hidden_test = db.Column(db.Float)
    ST_bleu_hidden_test = db.Column(db.Float)
    SS_sisdri_hidden_test = db.Column(db.Float)
    SE_pesq_hidden_test = db.Column(db.Float)
    SE_stoi_hidden_test = db.Column(db.Float)
    
    # profiling
    params = db.Column(BIGINT(unsigned=True))
    macs = db.Column(BIGINT(unsigned=True))
    macsShort = db.Column(BIGINT(unsigned=True))
    macsMedium = db.Column(BIGINT(unsigned=True))
    macsLong = db.Column(BIGINT(unsigned=True))
    macsLonger = db.Column(BIGINT(unsigned=True))

    @classmethod
    def find_by_fileId(cls, _id: int) -> "HiddenScoreModel":
        return cls.query.filter_by(fileId=_id)

    @classmethod
    def find_by_id(cls, _id: int) -> "HiddenScoreModel":
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
