"""SUPERB Metrics calculator"""
import os
import yaml
import numpy as np
import argparse
import re
import glob
import tempfile
from inference.metric import wer, slot_type_f1, slot_value_cer, EER

def read_file(path, callback=lambda x: x, sep=" "):
    content = {}
    with open(path, "r") as file:
        lines = file.readlines()
        for line in lines:
            filename, value = line.strip().split(sep, maxsplit=1)
            content[filename] = callback(value)
    return content

def metric_calculate_pipeline(file_path="./upload/aaa@gmail.com/1/predict.zip", submitUUID = ""):
    with open("configs.yaml") as f:
        configs = yaml.safe_load(f)

    #state = os.system(f"timeout {configs['UNZIP_TIMEOUT']} unzip {file_path} -d {os.path.dirname(file_path)}")
    # timeout!
    #print(state)
    #if (state != 0):
    #    print("unzip timeout")
    #    return
    
    ground_truth_root = configs["GROUND_TRUTH_ROOT"]
    predict_root = os.path.join(os.path.dirname(file_path), "predict")
    output_log = os.path.join(os.path.dirname(file_path), "metrics.log")

    with open(output_log, "w") as output_log_f:
        #============================================#
        #                   PR                       #
        #============================================#
        # PR PUBLIC
        if os.path.isdir(os.path.join(predict_root, "pr_public")):
            if os.path.isfile(os.path.join(predict_root, "pr_public", "predict.ark")):
                print("[PR PUBLIC]", file=output_log_f)
                try:
                    truth_file = os.path.join(ground_truth_root, "pr_public", "truth.ark")
                    predict_file = os.path.join(predict_root, "pr_public", "predict.ark")

                    predict = read_file(predict_file)
                    truth = read_file(truth_file)

                    filenames = sorted(predict.keys())
                    predict_values = [predict[filename] for filename in filenames]
                    truth_values = [truth[filename] for filename in filenames]

                    score = wer(predict_values, truth_values)
                    print(f"PR: per {score}")
                    print(f"PR: per {score}", file=output_log_f)
                except Exception as e:
                    print(e)
                    print(e, file=output_log_f)

                    

        #============================================#
        #                   KS                       #
        #============================================#
        # KS PUBLIC
        if os.path.isdir(os.path.join(predict_root, "ks_public")):
            if os.path.isfile(os.path.join(predict_root, "ks_public", "predict.txt")):
                print("[KS PUBLIC]", file=output_log_f)
                try:
                    truth_file = os.path.join(ground_truth_root, "ks_public", "truth.txt")
                    predict_file = os.path.join(predict_root, "ks_public", "predict.txt")

                    predict = read_file(predict_file)
                    truth = read_file(truth_file)

                    filenames = sorted(predict.keys())
                    predict_values = [predict[filename] for filename in filenames]
                    truth_values = [truth[filename] for filename in filenames]
                    match = [1 if p == t else 0 for p, t in zip(predict_values, truth_values)]
                    score = np.array(match).mean()
                    print(f"KS: acc {score}")
                    print(f"KS: acc {score}", file=output_log_f)
                except Exception as e:
                    print(e)
                    print(e, file=output_log_f)

        #============================================#
        #                   IC                       #
        #============================================#
        # IC PUBLIC
        if os.path.isdir(os.path.join(predict_root, "ic_public")):
            if os.path.isfile(os.path.join(predict_root, "ic_public", "predict.csv")):
                print("[IC PUBLIC]", file=output_log_f)
                try:
                    truth_file = os.path.join(ground_truth_root, "ic_public", "truth.csv")
                    predict_file = os.path.join(predict_root, "ic_public", "predict.csv")

                    predict = read_file(predict_file, lambda x: x.split(","), ",")
                    truth = read_file(truth_file, lambda x: x.split(","), ",")

                    filenames = sorted(predict.keys())
                    predict_values = [predict[filename] for filename in filenames]
                    truth_values = [truth[filename] for filename in filenames]
                    match = [1 if p == t else 0 for p, t in zip(predict_values, truth_values)]
                    score = np.array(match).mean()
                    print(f"IC: acc {score}")
                    print(f"IC: acc {score}", file=output_log_f)
                except Exception as e:
                    print(e)
                    print(e, file=output_log_f)

        #============================================#
        #                   SID                       #
        #============================================#
        # SID PUBLIC
        if os.path.isdir(os.path.join(predict_root, "sid_public")):
            if os.path.isfile(os.path.join(predict_root, "sid_public", "predict.txt")):
                print("[SID PUBLIC]", file=output_log_f)
                try:
                    truth_file = os.path.join(ground_truth_root, "sid_public", "truth.txt")
                    predict_file = os.path.join(predict_root, "sid_public", "predict.txt")

                    predict = read_file(predict_file)
                    truth = read_file(truth_file)

                    filenames = sorted(predict.keys())
                    predict_values = [predict[filename] for filename in filenames]
                    truth_values = [truth[filename] for filename in filenames]
                    match = [1 if p == t else 0 for p, t in zip(predict_values, truth_values)]
                    score = np.array(match).mean()
                    print(f"SID: acc {score}")
                    print(f"SID: acc {score}", file=output_log_f)
                except Exception as e:
                    print(e)
                    print(e, file=output_log_f)

        #============================================#
        #                   ER                       #
        #============================================#
        # ER PUBLIC
        if os.path.isdir(os.path.join(predict_root, "er_public")):
            if os.path.isfile(os.path.join(predict_root, "er_public", "predict.txt")):
                print("[ER PUBLIC]", file=output_log_f)
                try:
                    truth_file = os.path.join(ground_truth_root, "er_public", "truth.txt")
                    predict_file = os.path.join(predict_root, "er_public", "predict.txt")

                    predict = read_file(predict_file)
                    truth = read_file(truth_file)

                    filenames = sorted(predict.keys())
                    predict_values = [predict[filename] for filename in filenames]
                    truth_values = [truth[filename] for filename in filenames]
                    match = [1 if p == t else 0 for p, t in zip(predict_values, truth_values)]
                    score = np.array(match).mean()
                    print(f"ER: acc {score}")
                    print(f"ER: acc {score}", file=output_log_f)
                except Exception as e:
                    print(e)
                    print(e, file=output_log_f)

        #============================================#
        #                   ASR                      #
        #============================================#
        # ASR PUBLIC
        if os.path.isdir(os.path.join(predict_root, "asr_public")):
            if os.path.isfile(os.path.join(predict_root, "asr_public", "predict.ark")):
                print("[ASR PUBLIC]", file=output_log_f)
                try:
                    truth_file = os.path.join(ground_truth_root, "asr_public", "truth.ark")
                    predict_file = os.path.join(predict_root, "asr_public", "predict.ark")

                    predict = read_file(predict_file)
                    truth = read_file(truth_file)

                    filenames = sorted(predict.keys())
                    predict_values = [predict[filename] for filename in filenames]
                    truth_values = [truth[filename] for filename in filenames]

                    score = wer(predict_values, truth_values)
                    print(f"ASR: per {score}")
                    print(f"ASR: per {score}", file=output_log_f)
                except Exception as e:
                    print(e)
                    print(e, file=output_log_f)

        # ASR_LM PUBLIC
        if os.path.isdir(os.path.join(predict_root, "asr_lm_public")):
            pass

        #============================================#
        #                   QbE                      #
        #============================================#
        # QbE PUBLIC
        if os.path.isdir(os.path.join(predict_root, "qbe_public")):
            if os.path.isfile(os.path.join(predict_root, "qbe_public", "benchmark.stdlist.xml")):
                print("[QbE PUBLIC]", file=output_log_f)
                try:
                    scoring_dir = os.path.abspath(os.path.join(ground_truth_root, "qbe_public", "scoring"))
                    predict_dir = os.path.abspath(os.path.join(predict_root, "qbe_public"))
                    current_dir = os.getcwd()
                    os.chdir(scoring_dir)
                    os.system(f"./score-TWV-Cnxe.sh {predict_dir} groundtruth_quesst14_eval -10")
                    os.chdir(current_dir)

                    with open(os.path.join(predict_dir, "score.out"), "r") as log:
                        logging = log.read()
                        mtwv = float(re.search("maxTWV: [+-]?([0-9]*[.])?[0-9]+", logging).group().split()[1])

                    print(f"QbE: mtwv {mtwv}")
                    print(f"QbE: mtwv {mtwv}", file=output_log_f)
                except Exception as e:
                    print(e)
                    print(e, file=output_log_f)

        #============================================#
        #                   SF                       #
        #============================================#
        # SF PUBLIC
        if os.path.isdir(os.path.join(predict_root, "sf_public")):
            if os.path.isfile(os.path.join(predict_root, "sf_public", "predict.ark")):
                print("[SF PUBLIC]", file=output_log_f)
                try:
                    truth_file = os.path.join(ground_truth_root, "sf_public", "truth.ark")
                    predict_file = os.path.join(predict_root, "sf_public", "predict.ark")

                    predict = read_file(predict_file)
                    truth = read_file(truth_file)

                    filenames = sorted(predict.keys())
                    predict_values = [predict[filename] for filename in filenames]
                    truth_values = [truth[filename] for filename in filenames]

                    score = wer(predict_values, truth_values)
                    f1 = slot_type_f1(predict_values, truth_values)
                    cer = slot_value_cer(predict_values, truth_values)
                    print(f"SF: slot_type_f1 {f1}, slot_value_cer {cer}")
                    print(f"SF: slot_type_f1 {f1}, slot_value_cer {cer}", file=output_log_f)
                except Exception as e:
                    print(e)
                    print(e, file=output_log_f)

        #============================================#
        #                   SV                       #
        #============================================#
        # SV PUBLIC
        if os.path.isdir(os.path.join(predict_root, "sv_public")):
            if os.path.isfile(os.path.join(predict_root, "sv_public", "predict.txt")):
                print("[SV PUBLIC]", file=output_log_f)
                try:
                    truth_file = os.path.join(ground_truth_root, "sv_public", "truth.txt")
                    predict_file = os.path.join(predict_root, "sv_public", "predict.txt")

                    predict = read_file(predict_file, lambda x: float(x))
                    truth = read_file(truth_file, lambda x: float(x))

                    pairnames = sorted(predict.keys())
                    predict_scores = np.array([predict[name] for name in pairnames])
                    truth_scores = np.array([truth[name] for name in pairnames])

                    eer, *other = EER(truth_scores, predict_scores)
                    print(f"SV: eer {eer}")
                    print(f"SV: eer {eer}", file=output_log_f)
                except Exception as e:
                    print(e)
                    print(e, file=output_log_f)

        #============================================#
        #                   SD                       #
        #============================================#
        # SD PUBLIC
        if os.path.isdir(os.path.join(predict_root, "sd_public")):
            if len(glob.glob(os.path.join(predict_root, "sd_public", "*.h5"))) > 0:
                print("[SD PUBLIC]", file=output_log_f)
                try:
                    with tempfile.TemporaryDirectory() as scoring_dir:
                        sd_predict_dir = os.path.join(predict_root, "sd_public")
                        os.system(f"./{os.path.join(ground_truth_root, 'sd_public', 'score.sh')} {scoring_dir} {sd_predict_dir} {os.path.join(ground_truth_root, 'sd_public')} | tail -n 1 | awk '{{print $4}}' > {scoring_dir}/result.log")
                        with open(f"{scoring_dir}/result.log", "r") as result:
                            der = result.readline().strip()
                    print(f"SD: der {der}")
                    print(f"SD: der {der}", file=output_log_f)
                except Exception as e:
                    print(e)
                    print(e, file=output_log_f)
    
metric_calculate_pipeline()