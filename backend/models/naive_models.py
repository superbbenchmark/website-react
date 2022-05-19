from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, Enum, Float, DateTime, String, Text, TIMESTAMP, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from models.file import Status, Task, Show
from sqlalchemy.dialects.mysql import BIGINT

Base = declarative_base()

class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String(80), nullable=False, unique=True)
    name = Column(String(80), nullable=False)

class FileModel(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True)
    email = Column(ForeignKey('users.email'), nullable=False)
    submitUUID = Column(String(36),  nullable=False)

    # upload froms
    submitName = Column(String(80),  nullable=False)
    modelURL = Column(String(264))
    modelDesc = Column(Text())
    stride = Column(Text())
    inputFormat = Column(Text())
    corpus = Column(Text())
    paramDesc = Column(Text())
    paramShared = Column(String(80))
    fineTunedParam = Column(String(80))
    taskSpecParam = Column(String(80))
    task = Column(Enum(Task),  nullable=False)

    # others
    state = Column(Enum(Status),  nullable=False)
    stateInfo = Column(String(80))
    filePath = Column(String(264), nullable=False)
    aoeTimeUpload = Column(DateTime, nullable=False)
    dateUpload = Column(DateTime)
    showOnLeaderboard = Column(Enum(Show),  nullable=False)
    
    # profiling
    macs = Column(BIGINT(unsigned=True))
    macsShort = Column(BIGINT(unsigned=True))
    macsMedium = Column(BIGINT(unsigned=True))
    macsLong = Column(BIGINT(unsigned=True))
    macsLonger = Column(BIGINT(unsigned=True))

    scores = relationship("ScoreModel",  backref="files")

class HiddenFileModel(Base):
    __tablename__ = "hiddenfiles"

    id = Column(Integer, primary_key=True)
    email = Column(ForeignKey('users.email'), nullable=False)
    submitUUID = Column(String(36),  nullable=False)

    # upload froms
    submitName = Column(String(80),  nullable=False)
    modelDesc = Column(Text())
    huggingfaceOrganizationName = Column(String(80))
    huggingfaceRepoName = Column(String(80))
    huggingfaceCommonHash = Column(String(80))
    paramShared = Column(String(80))
    task = Column(Enum(Task),  nullable=False)

    # others
    state = Column(Enum(Status),  nullable=False)
    stateInfo = Column(String(80))
    aoeTimeUpload = Column(DateTime, nullable=False)
    dateUpload = Column(DateTime)
    showOnLeaderboard = Column(Enum(Show),  nullable=False)

    scores = relationship("HiddenScoreModel",  backref="hiddenfiles")

class ScoreModel(Base):
    __tablename__ = "scores"

    id = Column(Integer, primary_key=True)
    fileId = Column(Integer, ForeignKey('files.id'), nullable=False)

    # metrics
    PR_per_public = Column(Float)
    KS_acc_public = Column(Float)
    IC_acc_public = Column(Float)
    SID_acc_public = Column(Float)
    ER_acc_public = Column(Float)
    ERfold1_acc_public = Column(Float)
    ERfold2_acc_public = Column(Float)
    ERfold3_acc_public = Column(Float)
    ERfold4_acc_public = Column(Float)
    ERfold5_acc_public = Column(Float)
    ASR_wer_public = Column(Float)
    ASR_LM_wer_public = Column(Float)
    QbE_mtwv_public = Column(Float)
    SF_f1_public = Column(Float)
    SF_cer_public = Column(Float)
    SV_eer_public = Column(Float)
    SD_der_public = Column(Float)
    ST_bleu_public = Column(Float)
    SS_sisdri_public = Column(Float)
    SE_pesq_public = Column(Float)
    SE_stoi_public = Column(Float)

class HiddenScoreModel(Base):
    __tablename__ = "hiddenscores"

    id = Column(Integer, primary_key=True)
    fileId = Column(Integer, ForeignKey('hiddenfiles.id'), nullable=False)

    # metrics
    ## hidden dev set
    PR_per_hidden_dev = Column(Float)
    SID_acc_hidden_dev = Column(Float)
    ER_acc_hidden_dev = Column(Float)
    ASR_wer_hidden_dev = Column(Float)
    SV_eer_hidden_dev = Column(Float)
    SD_der_hidden_dev = Column(Float)
    QbE_map_hidden_dev = Column(Float)
    QbE_eer_hidden_dev = Column(Float)
    ST_bleu_hidden_dev = Column(Float)
    SS_sisdri_hidden_dev = Column(Float)
    SE_pesq_hidden_dev = Column(Float)
    SE_stoi_hidden_dev = Column(Float)

    ## hidden test set
    PR_per_hidden_test = Column(Float)
    SID_acc_hidden_test = Column(Float)
    ER_acc_hidden_test = Column(Float)
    ASR_wer_hidden_test = Column(Float)
    SV_eer_hidden_test = Column(Float)
    SD_der_hidden_test = Column(Float)
    QbE_map_hidden_test = Column(Float)
    QbE_eer_hidden_test = Column(Float)
    ST_bleu_hidden_test = Column(Float)
    SS_sisdri_hidden_test = Column(Float)
    SE_pesq_hidden_test = Column(Float)
    SE_stoi_hidden_test = Column(Float)
    
    # profiling
    params = Column(BIGINT(unsigned=True))
    macs = Column(BIGINT(unsigned=True))
    macsShort = Column(BIGINT(unsigned=True))
    macsMedium = Column(BIGINT(unsigned=True))
    macsLong = Column(BIGINT(unsigned=True))
    macsLonger = Column(BIGINT(unsigned=True))
