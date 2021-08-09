import datetime 
import uuid
import enum
import datetime
import magic

def is_plaintext(file_path):
    f = magic.Magic(mime=True)
    return True if (f.from_file(file_path) == 'text/plain') else False

def is_csv(file_path):
    f = magic.Magic(mime=True)
    return True if (f.from_file(file_path) == 'application/csv' or f.from_file(file_path) == 'text/csv' or f.from_file(file_path) == 'text/plain') else False

def get_uuid():
    return str(uuid.uuid4())
    
def get_AOETime(to_str = True):
    aoe_time = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=12))
    if to_str:
        return aoe_time.strftime("%Y-%m-%d %H:%M:%S")
    else:
        return aoe_time.replace(microsecond=0)

def get_AOE_today(to_str=True):
    aoe_time = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=12)).replace(hour=0,minute=0,second=0,microsecond=0)
    if to_str:
        return aoe_time.strftime("%Y-%m-%d %H:%M:%S")
    else:
        return aoe_time

def get_AOE_month(to_str=True):
    aoe_time = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=12)).replace(day=1,hour=0,minute=0,second=0,microsecond=0)
    if to_str:
        return aoe_time.strftime("%Y-%m-%d %H:%M:%S")
    else:
        return aoe_time


def submission_records_parser(submission_records, configs, mode="individual"):

    def __submission_records_parser(attribute, key_name):
        if attribute is None:
            return "-"
        elif attribute == "":
            return "-"
        elif isinstance(attribute, enum.Enum):
            return attribute.name
        elif isinstance(attribute, datetime.datetime):
            return attribute.strftime("%Y-%m-%d %H:%M:%S")
        elif isinstance(attribute, float):
            if (("per" in key_name) or ("acc" in key_name) or ("wer" in key_name) or ("f1" in key_name) or ("cer" in key_name) or ("eer" in key_name)):
                return round(attribute * 100, 2)
            elif ("der" in key_name):
                return round(attribute, 2)
            elif ("mtwv" in key_name):
                return round(attribute, 4)
            else:
                return attribute
        else:
            return attribute
    if mode == "individual":
        config_mode = "INDIVIDUAL_SUBMISSION_INFO"
    elif mode == "leaderboard":
        config_mode = "LEADERBOARD_INFO"
    file_info_list = configs[config_mode]["FILE"]
    score_info_list = configs[config_mode]["SCORE"]

    submission_info = []
    for file_model in submission_records:
        single_info = {}
        score_model = file_model.scores[0]
        for file_info in file_info_list:
            single_info[file_info] = __submission_records_parser(file_model.__dict__[file_info], file_info)
        for score_info in score_info_list:
            single_info[score_info] = __submission_records_parser(score_model.__dict__[score_info], score_info)
        
        submission_info.append(single_info)
    return submission_info

def get_leaderboard_default():
    data = [{
            "name":"paper",
            "aoeTimeUpload":"Interspeech2021",
            "task":"CONSTRAINED",
            "submitName": "FBANK",
            "modelURL":"-",
            "modelDesc": "classic feature",
            "stride":10,
            "inputFormat": "waveform",
            "corpus":"-",
            "paramDesc":"-",
            "paramShared": 0,
            "fineTunedParam":"-",
            "taskSpecParam":"-",
            "PR_per_public": 82.01,
            "KS_acc_public": 8.63,
            "IC_acc_public": 9.10,
            "SID_acc_public": 8.5e-4,
            "ER_acc_public": 35.39,
            "ASR_wer_public": 23.18,
            "ASR_LM_wer_public": 15.21,
            "QbE_mtwv_public": 0.0058,
            "SF_f1_public": 69.64,
            "SF_cer_public": 52.94,
            "SV_eer_public": 9.56,
            "SD_der_public": 10.05,
        },
        {
            "name":"paper",
            "aoeTimeUpload":"Interspeech2021",
            "task":"CONSTRAINED",
            "submitName": "PASE+",
            "modelURL":"-",
            "modelDesc": "multi-task",
            "stride":10,
            "inputFormat": "waveform",
            "corpus": "LS 50 hr",
            "paramDesc":"-",
            "paramShared": 7.83e6,
            "PR_per_public": 58.87,
            "KS_acc_public": 82.54,
            "IC_acc_public": 29.82,
            "SID_acc_public": 37.99,
            "ER_acc_public": 57.86,
            "ASR_wer_public": 25.11,
            "ASR_LM_wer_public": 16.62,
            "QbE_mtwv_public": 0.0072,
            "SF_f1_public": 62.14,
            "SF_cer_public": 60.17,
            "SV_eer_public": 11.61,
            "SD_der_public": 8.68,
        },
        {
            "name":"paper",
            "aoeTimeUpload":"Interspeech2021",
            "task":"CONSTRAINED",
            "submitName": "APC",
            "modelURL":"-",
            "modelDesc": "F-G",
            "stride": 10,
            "inputFormat": "FBANK",
            "corpus": "LS 360 hr",
            "paramDesc":"-",
            "paramShared": 4.11e6,
            "PR_per_public": 41.98,
            "KS_acc_public": 91.01,
            "IC_acc_public": 74.69,
            "SID_acc_public": 60.42,
            "ER_acc_public": 59.33,
            "ASR_wer_public": 21.28,
            "ASR_LM_wer_public": 14.74,
            "QbE_mtwv_public": 0.031,
            "SF_f1_public": 70.46,
            "SF_cer_public": 50.89,
            "SV_eer_public": 8.56,
            "SD_der_public": 10.53,
        },
        {
            "name":"paper",
            "aoeTimeUpload":"Interspeech2021",
            "task":"CONSTRAINED",
            "submitName": "VQ-APC",
            "modelURL":"-",
            "modelDesc": "F-G + VQ",
            "stride": 10,
            "inputFormat": "FBANK",
            "corpus": "LS 360 hr",
            "paramDesc":"-",
            "paramShared": 4.63e6,
            "PR_per_public": 41.08,
            "KS_acc_public": 91.11,
            "IC_acc_public": 74.48,
            "SID_acc_public": 60.15,
            "ER_acc_public": 59.66,
            "ASR_wer_public": 21.20,
            "ASR_LM_wer_public": 15.21,
            "QbE_mtwv_public": 0.0251,
            "SF_f1_public": 68.53,
            "SF_cer_public": 52.91,
            "SV_eer_public": 8.72,
            "SD_der_public": 10.45,
        },
        {
            "name":"paper",
            "aoeTimeUpload":"Interspeech2021",
            "task":"CONSTRAINED",
            "submitName": "NPC",
            "modelURL":"-",
            "modelDesc": "M-G + VQ",
            "stride": 10,
            "inputFormat": "FBANK",
            "corpus": "LS 360 hr",
            "paramDesc":"-",
            "paramShared": 19.38e6,
            "PR_per_public": 43.81,
            "KS_acc_public": 88.96,
            "IC_acc_public": 69.44,
            "SID_acc_public": 55.92,
            "ER_acc_public": 59.08,
            "ASR_wer_public": 20.20,
            "ASR_LM_wer_public": 13.91,
            "QbE_mtwv_public": 0.0246,
            "SF_f1_public": 72.79,
            "SF_cer_public": 48.44,
            "SV_eer_public": 9.4,
            "SD_der_public": 9.34,
        },
        {
            "name":"paper",
            "aoeTimeUpload":"Interspeech2021",
            "task":"CONSTRAINED",
            "submitName": "Mockingjay",
            "modelURL":"-",
            "modelDesc": "time M-G",
            "stride": 10,
            "inputFormat": "FBANK",
            "corpus": "LS 360 hr",
            "paramDesc":"-",
            "paramShared": 85.12e6,
            "PR_per_public": 70.19,
            "KS_acc_public": 83.67,
            "IC_acc_public": 34.33,
            "SID_acc_public": 32.29,
            "ER_acc_public": 50.28,
            "ASR_wer_public": 22.82,
            "ASR_LM_wer_public": 15.48,
            "QbE_mtwv_public": 6.6E-04,
            "SF_f1_public": 61.59,
            "SF_cer_public": 58.89,
            "SV_eer_public": 11.66,
            "SD_der_public": 10.54,
        },
        {
            "name":"paper",
            "aoeTimeUpload":"Interspeech2021",
            "task":"CONSTRAINED",
            "submitName": "TERA",
            "modelURL":"-",
            "modelDesc": "time/freq M-G",
            "stride": 10,
            "inputFormat": "FBANK",
            "corpus": "LS 960 hr",
            "paramDesc":"-",
            "paramShared": 21.33e6,
            "PR_per_public": 49.17,
            "KS_acc_public": 89.48,
            "IC_acc_public": 58.42,
            "SID_acc_public": 57.57,
            "ER_acc_public": 56.27,
            "ASR_wer_public": 18.17,
            "ASR_LM_wer_public": 12.16,
            "QbE_mtwv_public": 0.0013,
            "SF_f1_public": 67.50,
            "SF_cer_public": 54.17,
            "SV_eer_public": 15.89,
            "SD_der_public": 9.96,
        },
        {
            "name":"paper",
            "aoeTimeUpload":"Interspeech2021",
            "task":"CONSTRAINED",
            "submitName": "modified CPC",
            "modelURL":"-",
            "modelDesc": "F-C",
            "stride": 10,
            "inputFormat": "waveform",
            "corpus": "LL 60k hr",
            "paramDesc":"-",
            "paramShared": 1.84e6,
            "PR_per_public": 42.54,
            "KS_acc_public": 91.88,
            "IC_acc_public": 64.09,
            "SID_acc_public": 39.63,
            "ER_acc_public": 60.96,
            "ASR_wer_public": 20.18,
            "ASR_LM_wer_public": 13.53,
            "QbE_mtwv_public": 0.0326,
            "SF_f1_public": 71.19,
            "SF_cer_public": 49.91,
            "SV_eer_public": 12.86,
            "SD_der_public": 10.38,
        },
        {
            "name":"paper",
            "aoeTimeUpload":"Interspeech2021",
            "task":"CONSTRAINED",
            "submitName": "wav2vec",
            "modelURL":"-",
            "modelDesc": "F-C",
            "stride": 10,
            "inputFormat": "waveform",
            "corpus": "LS 960 hr",
            "paramDesc":"-",
            "paramShared": 32.54e6,
            "PR_per_public": 31.58,
            "KS_acc_public": 95.59,
            "IC_acc_public": 84.92,
            "SID_acc_public": 56.56,
            "ER_acc_public": 59.79,
            "ASR_wer_public": 15.86,
            "ASR_LM_wer_public": 11.00,
            "QbE_mtwv_public": 0.0485,
            "SF_f1_public": 76.37,
            "SF_cer_public": 43.71,
            "SV_eer_public": 7.99,
            "SD_der_public": 9.9,
        },
        {
            "name":"paper",
            "aoeTimeUpload":"Interspeech2021",
            "task":"CONSTRAINED",
            "submitName": "vq-wav2vec",
            "modelURL":"-",
            "modelDesc": "F-C + VQ",
            "stride": 10,
            "inputFormat": "waveform",
            "corpus": "LS 960 hr",
            "paramDesc":"-",
            "paramShared": 34.15e6,
            "PR_per_public": 33.48,
            "KS_acc_public": 93.38,
            "IC_acc_public": 85.68,
            "SID_acc_public": 38.80,
            "ER_acc_public": 58.24,
            "ASR_wer_public": 17.71,
            "ASR_LM_wer_public": 12.80,
            "QbE_mtwv_public": 0.0410,
            "SF_f1_public": 77.68,
            "SF_cer_public": 41.54,
            "SV_eer_public": 10.38,
            "SD_der_public": 9.93,
        },
        {
            "name":"paper",
            "aoeTimeUpload":"Interspeech2021",
            "task":"CONSTRAINED",
            "submitName": "wav2vec 2.0 Base",
            "modelURL":"-",
            "modelDesc": "M-C + VQ",
            "stride": 20,
            "inputFormat": "waveform",
            "corpus": "LS 960 hr",
            "paramDesc":"-",
            "paramShared": 95.04e6,
            "PR_per_public": 5.74,
            "KS_acc_public": 96.23,
            "IC_acc_public": 92.35,
            "SID_acc_public": 75.18,
            "ER_acc_public": 63.43,
            "ASR_wer_public": 6.43,
            "ASR_LM_wer_public": 4.79,
            "QbE_mtwv_public": 0.0233,
            "SF_f1_public": 88.30,
            "SF_cer_public": 24.77,
            "SV_eer_public": 6.02,
            "SD_der_public": 6.08,
        },
        {
            "name":"paper",
            "aoeTimeUpload":"Interspeech2021",
            "task":"CONSTRAINED",
            "submitName": "wav2vec 2.0 Large",
            "modelURL":"-",
            "modelDesc": "M-C + VQ",
            "stride": 20,
            "inputFormat": "waveform",
            "corpus": "LL 60k hr",
            "paramDesc":"-",
            "paramShared": 95.04e6,
            "PR_per_public": 4.75,
            "KS_acc_public": 96.66,
            "IC_acc_public": 95.28,
            "SID_acc_public": 86.14,
            "ER_acc_public": 65.64,
            "ASR_wer_public": 3.75,
            "ASR_LM_wer_public": 3.10,
            "QbE_mtwv_public": 0.0489,
            "SF_f1_public": 87.11,
            "SF_cer_public": 27.31,
            "SV_eer_public": 5.65,
            "SD_der_public": 5.62,
        },
        {
            "name":"paper",
            "aoeTimeUpload":"Interspeech2021",
            "task":"CONSTRAINED",
            "submitName": "HuBERT Base",
            "modelURL":"-",
            "modelDesc": "M-P + VQ",
            "stride": 20,
            "inputFormat": "waveform",
            "corpus": "LS 960 hr",
            "paramDesc":"-",
            "paramShared": 94.68e6,
            "PR_per_public": 5.41,
            "KS_acc_public": 96.30,
            "IC_acc_public": 98.34,
            "SID_acc_public": 81.42,
            "ER_acc_public": 64.92,
            "ASR_wer_public": 6.42,
            "ASR_LM_wer_public": 4.79,
            "QbE_mtwv_public": 0.0736,
            "SF_f1_public": 88.53,
            "SF_cer_public": 25.20,
            "SV_eer_public": 5.11,
            "SD_der_public": 5.88,
        },
        {
            "name":"paper",
            "aoeTimeUpload":"Interspeech2021",
            "task":"CONSTRAINED",
            "submitName": "HuBERT Large",
            "modelURL":"-",
            "modelDesc": "M-P + VQ",
            "stride": 20,
            "inputFormat": "waveform",
            "corpus": "LL 60k hr",
            "paramDesc":"-",
            "paramShared": 316.61e6,
            "PR_per_public": 3.53,
            "KS_acc_public": 95.29,
            "IC_acc_public": 98.76,
            "SID_acc_public": 90.33,
            "ER_acc_public": 67.62,
            "ASR_wer_public": 3.62,
            "ASR_LM_wer_public": 2.94,
            "QbE_mtwv_public": 0.0353,
            "SF_f1_public": 89.81,
            "SF_cer_public": 21.76,
            "SV_eer_public": 5.98,
            "SD_der_public": 5.75,
        },]
    return data
