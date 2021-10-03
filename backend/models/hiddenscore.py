from db import db


class HiddenScoreModel(db.Model):
    __tablename__ = "hiddenscores"

    id = db.Column(db.Integer, primary_key=True)
    fileId = db.Column(db.Integer, db.ForeignKey('hiddenfiles.id'), nullable=False)

    # metrics
    ## hidden dev set
    PR_per_hidden_dev = db.Column(db.Float)
    KS_acc_hidden_dev = db.Column(db.Float)
    IC_acc_hidden_dev = db.Column(db.Float)
    SID_acc_hidden_dev = db.Column(db.Float)
    ER_acc_hidden_dev = db.Column(db.Float)
    ERfold1_acc_hidden_dev = db.Column(db.Float)
    ERfold2_acc_hidden_dev = db.Column(db.Float)
    ERfold3_acc_hidden_dev = db.Column(db.Float)
    ERfold4_acc_hidden_dev = db.Column(db.Float)
    ERfold5_acc_hidden_dev = db.Column(db.Float)
    ASR_wer_hidden_dev = db.Column(db.Float)
    ASR_LM_wer_hidden_dev = db.Column(db.Float)
    QbE_mtwv_hidden_dev = db.Column(db.Float)
    SF_f1_hidden_dev = db.Column(db.Float)
    SF_cer_hidden_dev = db.Column(db.Float)
    SV_eer_hidden_dev = db.Column(db.Float)
    SD_der_hidden_dev = db.Column(db.Float)

    ## hidden test set
    PR_per_hidden_test = db.Column(db.Float)
    KS_acc_hidden_test = db.Column(db.Float)
    IC_acc_hidden_test = db.Column(db.Float)
    SID_acc_hidden_test = db.Column(db.Float)
    ER_acc_hidden_test = db.Column(db.Float)
    ERfold1_acc_hidden_test = db.Column(db.Float)
    ERfold2_acc_hidden_test = db.Column(db.Float)
    ERfold3_acc_hidden_test = db.Column(db.Float)
    ERfold4_acc_hidden_test = db.Column(db.Float)
    ERfold5_acc_hidden_test = db.Column(db.Float)
    ASR_wer_hidden_test = db.Column(db.Float)
    ASR_LM_wer_hidden_test = db.Column(db.Float)
    QbE_mtwv_hidden_test = db.Column(db.Float)
    SF_f1_hidden_test = db.Column(db.Float)
    SF_cer_hidden_test = db.Column(db.Float)
    SV_eer_hidden_test = db.Column(db.Float)
    SD_der_hidden_test = db.Column(db.Float)

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
