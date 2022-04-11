"""SUPERB Metrics calculator"""
import os
import yaml
import numpy as np
import argparse
import re
import glob
import tempfile
from inference.metric import wer, slot_type_f1, slot_value_cer, EER
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from models.naive_models import UserModel, FileModel, ScoreModel
from models.file import Status
from dotenv import load_dotenv
from utils import is_plaintext, is_csv
from config import configs
import csv
from pathlib import Path
from sacrebleu.metrics import BLEU

def read_file(path, callback=lambda x: x, sep=" ", default_value=""):
    content = {}
    with open(path, "r") as file:
        lines = file.readlines()
        for line in lines:
            fields = line.strip().split(sep, maxsplit=1)
            if len(fields) > 1:
                filename, value = fields
            else:
                filename = fields[0]
                value = default_value
            content[filename] = callback(value)
    return content


def set_error_msg(session, file_model, error_msg):
    file_model.state = Status.ERROR
    file_model.stateInfo = error_msg
    session.commit()


def metric_calculate_pipeline(file_path, submitUUID):
    #  connect in memory sqlite database or you can connect your own database
    load_dotenv()
    engine = create_engine(os.getenv('SQLALCHEMY_DATABASE_URI',
                           default="mysql+pymysql://root:root@127.0.0.1:3306/superb"))

    # create session and bind engine
    Session = sessionmaker(bind=engine)
    session = Session()

    file_model = session.query(FileModel).filter_by(
        submitUUID=submitUUID).first()
    score_model = file_model.scores[0]

    file_model.state = Status.COMPUTING
    session.commit()

    output_log = os.path.join(os.path.dirname(file_path), "metrics.log")
    with open(output_log, "w") as output_log_f:
        #state = os.system(f"timeout {configs['UNZIP_TIMEOUT']} unzip {file_path} -d {os.path.dirname(file_path)}")
        state = os.system(f"unzip -qq {file_path} -d {os.path.dirname(file_path)}")
        # timeout!
        # if (state != 0):
        #    print("Unzip timeout")
        #    print("Unzip timeout", file=output_log_f)
        #    set_error_msg(session, file_model, "Unzip timeout")
        #    return

        ground_truth_root = configs["GROUND_TRUTH_ROOT"]
        predict_root = os.path.join(os.path.dirname(file_path), "predict")

        #============================================#
        #                   PR                       #
        #============================================#
        # PR PUBLIC
        if os.path.isdir(os.path.join(predict_root, "pr_public")):
            if os.path.isfile(os.path.join(predict_root, "pr_public", "predict.ark")):
                if is_plaintext(os.path.join(predict_root, "pr_public", "predict.ark")):
                    print("[PR PUBLIC]", file=output_log_f)
                    try:
                        truth_file = os.path.join(
                            ground_truth_root, "pr_public", "truth.ark")
                        predict_file = os.path.join(
                            predict_root, "pr_public", "predict.ark")

                        predict = read_file(predict_file)
                        truth = read_file(truth_file)

                        filenames = sorted(predict.keys())
                        predict_values = [predict[filename]
                                        for filename in filenames]
                        truth_values = [truth[filename] for filename in filenames]

                        score = wer(predict_values, truth_values)
                        print(f"PR: per {score}", file=output_log_f)
                        score_model.PR_per_public = score
                        session.commit()
                    except Exception as e:
                        print(e, file=output_log_f)

        #============================================#
        #                   KS                       #
        #============================================#
        # KS PUBLIC
        if os.path.isdir(os.path.join(predict_root, "ks_public")):
            if os.path.isfile(os.path.join(predict_root, "ks_public", "predict.txt")):
                if is_plaintext(os.path.join(predict_root, "ks_public", "predict.txt")):
                    print("[KS PUBLIC]", file=output_log_f)
                    try:
                        truth_file = os.path.join(
                            ground_truth_root, "ks_public", "truth.txt")
                        predict_file = os.path.join(
                            predict_root, "ks_public", "predict.txt")

                        predict = read_file(predict_file)
                        truth = read_file(truth_file)

                        filenames = sorted(predict.keys())
                        predict_values = [predict[filename]
                                        for filename in filenames]
                        truth_values = [truth[filename] for filename in filenames]
                        match = [1 if p == t else 0 for p,
                                t in zip(predict_values, truth_values)]
                        score = np.array(match).mean()
                        print(f"KS: acc {score}", file=output_log_f)
                        score_model.KS_acc_public = score
                        session.commit()
                    except Exception as e:
                        print(e, file=output_log_f)

        #============================================#
        #                   IC                       #
        #============================================#
        # IC PUBLIC
        if os.path.isdir(os.path.join(predict_root, "ic_public")):
            if os.path.isfile(os.path.join(predict_root, "ic_public", "predict.csv")):
                if is_csv(os.path.join(predict_root, "ic_public", "predict.csv")):
                    print("[IC PUBLIC]", file=output_log_f)
                    try:
                        truth_file = os.path.join(
                            ground_truth_root, "ic_public", "truth.csv")
                        predict_file = os.path.join(
                            predict_root, "ic_public", "predict.csv")

                        predict = read_file(
                            predict_file, lambda x: x.split(","), ",")
                        truth = read_file(truth_file, lambda x: x.split(","), ",")

                        filenames = sorted(predict.keys())
                        predict_values = [predict[filename]
                                        for filename in filenames]
                        truth_values = [truth[filename] for filename in filenames]
                        match = [1 if p == t else 0 for p,
                                t in zip(predict_values, truth_values)]
                        score = np.array(match).mean()
                        print(f"IC: acc {score}", file=output_log_f)
                        score_model.IC_acc_public = score
                        session.commit()
                    except Exception as e:
                        print(e, file=output_log_f)

        #============================================#
        #                   SID                       #
        #============================================#
        # SID PUBLIC
        if os.path.isdir(os.path.join(predict_root, "sid_public")):
            if os.path.isfile(os.path.join(predict_root, "sid_public", "predict.txt")):
                if is_plaintext(os.path.join(predict_root, "sid_public", "predict.txt")):
                    print("[SID PUBLIC]", file=output_log_f)
                    try:
                        truth_file = os.path.join(
                            ground_truth_root, "sid_public", "truth.txt")
                        predict_file = os.path.join(
                            predict_root, "sid_public", "predict.txt")

                        predict = read_file(predict_file)
                        truth = read_file(truth_file)

                        filenames = sorted(predict.keys())
                        predict_values = [predict[filename]
                                        for filename in filenames]
                        truth_values = [truth[filename] for filename in filenames]
                        match = [1 if p == t else 0 for p,
                                t in zip(predict_values, truth_values)]
                        score = np.array(match).mean()
                        print(f"SID: acc {score}", file=output_log_f)
                        score_model.SID_acc_public = score
                        session.commit()
                    except Exception as e:
                        print(e, file=output_log_f)

        #============================================#
        #                   ER                       #
        #============================================#
        # ER PUBLIC
        er_scores = []
        for foldid in range(1, 6):
            if os.path.isdir(os.path.join(predict_root, f"er_fold{foldid}_public")):
                if os.path.isfile(os.path.join(predict_root, f"er_fold{foldid}_public", "predict.txt")):
                    if is_plaintext(os.path.join(predict_root, f"er_fold{foldid}_public", "predict.txt")):
                        print(f"[ER FOLD{foldid} PUBLIC]", file=output_log_f)
                        try:
                            truth_file = os.path.join(
                                ground_truth_root, f"er_fold{foldid}_public", "truth.txt")
                            predict_file = os.path.join(
                                predict_root, f"er_fold{foldid}_public", "predict.txt")

                            predict = read_file(predict_file)
                            truth = read_file(truth_file)

                            filenames = sorted(predict.keys())
                            predict_values = [predict[filename]
                                            for filename in filenames]
                            truth_values = [truth[filename] for filename in filenames]
                            match = [1 if p == t else 0 for p,
                                    t in zip(predict_values, truth_values)]
                            score = np.array(match).mean()
                            er_scores.append(score)
                            print(f"ER FOLD{foldid}: acc {score}", file=output_log_f)
                            setattr(score_model, f"ERfold{foldid}_acc_public", score)
                            session.commit()
                        except Exception as e:
                            print(e, file=output_log_f)
        if len(er_scores) == 5:
            try:
                score = np.array(er_scores).mean()
                print(f"ER: acc {score}", file=output_log_f)
                score_model.ER_acc_public = score
                session.commit()
            except Exception as e:
                print(e, file=output_log_f)

        #============================================#
        #                   ASR                      #
        #============================================#
        # ASR PUBLIC
        if os.path.isdir(os.path.join(predict_root, "asr_public")):
            if os.path.isfile(os.path.join(predict_root, "asr_public", "predict.ark")):
                if is_plaintext(os.path.join(predict_root, "asr_public", "predict.ark")):
                    print("[ASR PUBLIC]", file=output_log_f)
                    try:
                        truth_file = os.path.join(
                            ground_truth_root, "asr_public", "truth.ark")
                        predict_file = os.path.join(
                            predict_root, "asr_public", "predict.ark")

                        predict = read_file(predict_file)
                        truth = read_file(truth_file)

                        filenames = sorted(predict.keys())
                        predict_values = [predict[filename]
                                        for filename in filenames]
                        truth_values = [truth[filename] for filename in filenames]

                        score = wer(predict_values, truth_values)
                        print(f"ASR: wer {score}", file=output_log_f)
                        score_model.ASR_wer_public = score
                        session.commit()
                    except Exception as e:
                        print(e, file=output_log_f)

        # ASR_LM PUBLIC
        if os.path.isdir(os.path.join(predict_root, "asr_lm_public")):
            if os.path.isfile(os.path.join(predict_root, "asr_lm_public", "predict.ark")):
                if is_plaintext(os.path.join(predict_root, "asr_lm_public", "predict.ark")):
                    print("[ASR LM PUBLIC]", file=output_log_f)
                    try:
                        truth_file = os.path.join(
                            ground_truth_root, "asr_public", "truth.ark")
                        predict_file = os.path.join(
                            predict_root, "asr_lm_public", "predict.ark")

                        predict = read_file(predict_file)
                        truth = read_file(truth_file)

                        filenames = sorted(predict.keys())
                        predict_values = [predict[filename]
                                        for filename in filenames]
                        truth_values = [truth[filename] for filename in filenames]

                        score = wer(predict_values, truth_values)
                        print(f"ASR LM: wer {score}", file=output_log_f)
                        score_model.ASR_LM_wer_public = score
                        session.commit()
                    except Exception as e:
                        print(e, file=output_log_f)

        #============================================#
        #                   QbE                      #
        #============================================#
        # QbE PUBLIC
        if os.path.isdir(os.path.join(predict_root, "qbe_public")):
            if os.path.isfile(os.path.join(predict_root, "qbe_public", "benchmark.stdlist.xml")):
                print("[QbE PUBLIC]", file=output_log_f)
                try:
                    scoring_dir = os.path.abspath(os.path.join(
                        ground_truth_root, "qbe_public", "scoring"))
                    predict_dir = os.path.abspath(
                        os.path.join(predict_root, "qbe_public"))
                    current_dir = os.getcwd()
                    os.chdir(scoring_dir)
                    os.system(
                        f"./score-TWV-Cnxe.sh {predict_dir} groundtruth_quesst14_eval -10")
                    os.chdir(current_dir)

                    with open(os.path.join(predict_dir, "score.out"), "r") as log:
                        logging = log.read()
                        mtwv = float(
                            re.search("maxTWV: [+-]?([0-9]*[.])?[0-9]+", logging).group().split()[1])

                    print(f"QbE: mtwv {mtwv}", file=output_log_f)
                    score_model.QbE_mtwv_public = mtwv
                    session.commit()
                except Exception as e:
                    print(e, file=output_log_f)

        #============================================#
        #                   SF                       #
        #============================================#
        # SF PUBLIC
        if os.path.isdir(os.path.join(predict_root, "sf_public")):
            if os.path.isfile(os.path.join(predict_root, "sf_public", "predict.ark")):
                if is_plaintext(os.path.join(predict_root, "sf_public", "predict.ark")):
                    print("[SF PUBLIC]", file=output_log_f)
                    try:
                        truth_file = os.path.join(
                            ground_truth_root, "sf_public", "truth.ark")
                        predict_file = os.path.join(
                            predict_root, "sf_public", "predict.ark")

                        predict = read_file(predict_file)
                        truth = read_file(truth_file)

                        filenames = sorted(predict.keys())
                        predict_values = [predict[filename]
                                        for filename in filenames]
                        truth_values = [truth[filename] for filename in filenames]

                        score = wer(predict_values, truth_values)
                        f1 = slot_type_f1(predict_values, truth_values)
                        cer = slot_value_cer(predict_values, truth_values)
                        print(
                            f"SF: slot_type_f1 {f1}, slot_value_cer {cer}", file=output_log_f)
                        score_model.SF_f1_public = f1
                        score_model.SF_cer_public = cer
                        session.commit()
                    except Exception as e:
                        print(e, file=output_log_f)

        #============================================#
        #                   SV                       #
        #============================================#
        # SV PUBLIC
        if os.path.isdir(os.path.join(predict_root, "sv_public")):
            if os.path.isfile(os.path.join(predict_root, "sv_public", "predict.txt")):
                if is_plaintext(os.path.join(predict_root, "sv_public", "predict.txt")):
                    print("[SV PUBLIC]", file=output_log_f)
                    try:
                        truth_file = os.path.join(
                            ground_truth_root, "sv_public", "truth.txt")
                        predict_file = os.path.join(
                            predict_root, "sv_public", "predict.txt")

                        predict = read_file(predict_file, lambda x: float(x))
                        truth = read_file(truth_file, lambda x: float(x))

                        pairnames = sorted(predict.keys())
                        predict_scores = np.array(
                            [predict[name] for name in pairnames])
                        truth_scores = np.array([truth[name]
                                                for name in pairnames])

                        eer, *other = EER(truth_scores, predict_scores)
                        print(f"SV: eer {eer}", file=output_log_f)
                        score_model.SV_eer_public = eer
                        session.commit()
                    except Exception as e:
                        print(e, file=output_log_f)

        #============================================#
        #                   SD                       #
        #============================================#
        # SD PUBLIC
        sd_dir = os.path.join(predict_root, "sd_public")
        if os.path.isdir(sd_dir):
            if len(glob.glob(os.path.join(sd_dir, "*.h5"))) > 0:
                prediction_dir = os.path.join(sd_dir, "scoring", "predictions")
                os.makedirs(prediction_dir, exist_ok=True)
                os.system(f"mv {sd_dir}/*.h5 {prediction_dir}")

            if len(glob.glob(os.path.join(predict_root, "sd_public", "scoring", "predictions", "*.h5"))) > 0:
                print("[SD PUBLIC]", file=output_log_f)
                try:
                    with tempfile.TemporaryDirectory() as scoring_dir:
                        sd_predict_dir = os.path.join(
                            predict_root, "sd_public")
                        os.system(f"./{os.path.join(ground_truth_root, 'sd_public', 'score.sh')} {sd_predict_dir} {os.path.join(ground_truth_root, 'sd_public', 'test')} | tail -n 1 | awk '{{print $4}}' > {scoring_dir}/result.log")
                        with open(f"{scoring_dir}/result.log", "r") as result:
                            der = result.readline().strip()
                    print(f"SD: der {der}", file=output_log_f)
                    score_model.SD_der_public = der
                    session.commit()
                except Exception as e:
                    print(e, file=output_log_f)

        #============================================#
        #                   SE                       #
        #============================================#
        # SE PUBLIC
        if os.path.isdir(os.path.join(predict_root, "se_public")):
            if os.path.isfile(os.path.join(predict_root, "se_public", "metrics.txt")):
                if is_plaintext(os.path.join(predict_root, "se_public", "metrics.txt")):
                    print("[SE PUBLIC]", file=output_log_f)
                    try:
                        predict_file = os.path.join(
                            predict_root, "se_public", "metrics.txt")

                        with open(predict_file) as file:
                            for line in file.readlines():
                                metric, score = line.strip().split(maxsplit=1)
                                if metric == "pesq":
                                    pesq = score
                                    score_model.SE_pesq_public = float(pesq)
                                elif metric == "stoi":
                                    stoi = score
                                    score_model.SE_stoi_public = float(stoi)

                        print(f"SE: pesq {pesq}, stoi {stoi}", file=output_log_f)
                        session.commit()
                    except Exception as e:
                        print(e, file=output_log_f)

        #============================================#
        #                   SS                       #
        #============================================#
        # SS PUBLIC
        if os.path.isdir(os.path.join(predict_root, "ss_public")):
            if os.path.isfile(os.path.join(predict_root, "ss_public", "metrics.txt")):
                if is_plaintext(os.path.join(predict_root, "ss_public", "metrics.txt")):
                    print("[SS PUBLIC]", file=output_log_f)
                    try:
                        predict_file = os.path.join(
                            predict_root, "ss_public", "metrics.txt")

                        with open(predict_file) as file:
                            for line in file.readlines():
                                metric, score = line.strip().split(maxsplit=1)
                                if "si_sdr" in metric:
                                    si_sdri = score
                                    score_model.SS_sisdri_public = float(si_sdri)

                        print(f"SS: si_sdri {si_sdri}", file=output_log_f)
                        session.commit()
                    except Exception as e:
                        print(e, file=output_log_f)

        #============================================#
        #                   ST                       #
        #============================================#
        # ST PUBLIC
        if os.path.isdir(os.path.join(predict_root, "st_public")):
            if os.path.isfile(os.path.join(predict_root, "st_public", "predict.tsv")):
                if is_plaintext(os.path.join(predict_root, "st_public", "predict.tsv")):
                    print("[ST PUBLIC]", file=output_log_f)
                    try:
                        predict_file = os.path.join(
                            predict_root, "st_public", "predict.tsv")

                        hyps, refs = [], []

                        with open(predict_file, 'r') as f:
                            reader = csv.DictReader(
                                f,
                                delimiter='\t',
                                quotechar=None,
                                doublequote=False,
                                lineterminator='\n',
                                quoting=csv.QUOTE_NONE,
                            )
                            for line in reader:
                                hyps.append(line["hyp"])
                                refs.append(line["ref"])

                        bleu = BLEU()
                        score = bleu.corpus_score(hyps, [refs]).score
                        score_model.ST_bleu_public = float(score)

                        print(f"ST: bleu {score}", file=output_log_f)
                        session.commit()
                    except Exception as e:
                        print(e, file=output_log_f)

        file_model.state = Status.DONE
        session.commit()
