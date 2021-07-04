from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, Enum, Float, DateTime, String, Text, TIMESTAMP, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from models.file import Status, Task, Show

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

    scores = relationship("ScoreModel",  backref="files")

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
    ASR_wer_public = Column(Float)
    ASR_LM_wer_public = Column(Float)
    QbE_mtwv_public = Column(Float)
    SF_f1_public = Column(Float)
    SF_cer_public = Column(Float)
    SV_eer_public = Column(Float)
    SD_der_public = Column(Float)