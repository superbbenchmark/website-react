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
    return True if (f.from_file(file_path) == 'text/csv') else False

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
            "name":"official",
            "aoeTimeUpload":"official",
            "task":"CONSTRAINED",
            "submitName": "FBANK",
            "modelURL":"https://github.com/superbbenchmark/website-react/tree/master",
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
            "name":"official",
            "aoeTimeUpload":"official",
            "task":"CONSTRAINED",
            "submitName": "PASE+",
            "modelURL":"-",
            "modelDesc": "multi-task",
            "stride":10,
            "inputFormat": "waveform",
            "corpus": "LS 50 hr",
            "paramDesc":"-",
            "paramShared": 7.83e6,
            "PR_per_public": 58.88,
            "KS_acc_public": 82.37,
            "IC_acc_public": 30.29,
            "SID_acc_public": 35.84,
            "ER_acc_public": 57.64,
            "ASR_wer_public": 24.92,
            "ASR_LM_wer_public": 16.61,
            "QbE_mtwv_public": 7.0e-4,
            "SF_f1_public": 60.41,
            "SF_cer_public": 62.77,
            "SV_eer_public": 10.91,
            "SD_der_public": 8.52,
        },
        {
            "name":"official",
            "aoeTimeUpload":"official",
            "task":"CONSTRAINED",
            "submitName": "APC",
            "modelURL":"-",
            "modelDesc": "F-G",
            "stride": 10,
            "inputFormat": "FBANK",
            "corpus": "LS 360 hr",
            "paramDesc":"-",
            "paramShared": 4.11e6,
            "PR_per_public": 41.85,
            "KS_acc_public": 91.04,
            "IC_acc_public": 74.64,
            "SID_acc_public": 59.79,
            "ER_acc_public": 58.84,
            "ASR_wer_public": 21.61,
            "ASR_LM_wer_public": 15.09,
            "QbE_mtwv_public": 0.0268,
            "SF_f1_public": 71.26,
            "SF_cer_public": 50.76,
            "SV_eer_public": 8.81,
            "SD_der_public": 10.72,
        },
        {
            "name":"official",
            "aoeTimeUpload":"official",
            "task":"CONSTRAINED",
            "submitName": "VQ-APC",
            "modelURL":"-",
            "modelDesc": "F-G + VQ",
            "stride": 10,
            "inputFormat": "FBANK",
            "corpus": "LS 360 hr",
            "paramDesc":"-",
            "paramShared": 4.63e6,
            "PR_per_public": 42.86,
            "KS_acc_public": 90.52,
            "IC_acc_public": 70.52,
            "SID_acc_public": 49.57,
            "ER_acc_public": 58.31,
            "ASR_wer_public": 21.72,
            "ASR_LM_wer_public": 15.37,
            "QbE_mtwv_public": 0.0205,
            "SF_f1_public": 69.62,
            "SF_cer_public": 52.21,
            "SV_eer_public": 9.29,
            "SD_der_public": 10.49,
        },
        {
            "name":"official",
            "aoeTimeUpload":"official",
            "task":"CONSTRAINED",
            "submitName": "NPC",
            "modelURL":"-",
            "modelDesc": "M-G + VQ",
            "stride": 10,
            "inputFormat": "FBANK",
            "corpus": "LS 360 hr",
            "paramDesc":"-",
            "paramShared": 19.38e6,
            "PR_per_public": 52.67,
            "KS_acc_public": 88.54,
            "IC_acc_public": 64.04,
            "SID_acc_public": 50.77,
            "ER_acc_public": 59.55,
            "ASR_wer_public": 20.94,
            "ASR_LM_wer_public": 14.69,
            "QbE_mtwv_public": 0.022,
            "SF_f1_public": 67.43,
            "SF_cer_public": 54.63,
            "SV_eer_public": 10.28,
            "SD_der_public": 9.59,
        },
        {
            "name":"official",
            "aoeTimeUpload":"official",
            "task":"CONSTRAINED",
            "submitName": "Mockingjay",
            "modelURL":"-",
            "modelDesc": "time M-G",
            "stride": 10,
            "inputFormat": "FBANK",
            "corpus": "LS 360 hr",
            "paramDesc":"-",
            "paramShared": 85.12e6,
            "PR_per_public": 80.01,
            "KS_acc_public": 82.67,
            "IC_acc_public": 28.87,
            "SID_acc_public": 34.5,
            "ER_acc_public": 45.72,
            "ASR_wer_public": 23.72,
            "ASR_LM_wer_public": 15.94,
            "QbE_mtwv_public": 3.1e-10,
            "SF_f1_public": 60.83,
            "SF_cer_public": 61.16,
            "SV_eer_public": 23.22,
            "SD_der_public": 11.24,
        },
        {
            "name":"official",
            "aoeTimeUpload":"official",
            "task":"CONSTRAINED",
            "submitName": "TERA",
            "modelURL":"-",
            "modelDesc": "time/freq M-G",
            "stride": 10,
            "inputFormat": "FBANK",
            "corpus": "LS 960 hr",
            "paramDesc":"-",
            "paramShared": 21.33e6,
            "PR_per_public": 47.53,
            "KS_acc_public": 88.09,
            "IC_acc_public": 48.8,
            "SID_acc_public": 58.67,
            "ER_acc_public": 54.76,
            "ASR_wer_public": 18.45,
            "ASR_LM_wer_public": 12.44,
            "QbE_mtwv_public": 8.7e-5,
            "SF_f1_public": 63.28,
            "SF_cer_public": 57.91,
            "SV_eer_public": 16.49,
            "SD_der_public": 9.54,
        },
        {
            "name":"official",
            "aoeTimeUpload":"official",
            "task":"CONSTRAINED",
            "submitName": "modified CPC",
            "modelURL":"-",
            "modelDesc": "F-C",
            "stride": 10,
            "inputFormat": "waveform",
            "corpus": "LL 60k hr",
            "paramDesc":"-",
            "paramShared": 1.84e6,
            "PR_per_public": 41.66,
            "KS_acc_public": 92.02,
            "IC_acc_public": 65.01,
            "SID_acc_public": 42.29,
            "ER_acc_public": 59.28,
            "ASR_wer_public": 20.02,
            "ASR_LM_wer_public": 13.57,
            "QbE_mtwv_public": 0.0061,
            "SF_f1_public": 74.18,
            "SF_cer_public": 46.66,
            "SV_eer_public": 9.67,
            "SD_der_public": 11.0,
        },
        {
            "name":"official",
            "aoeTimeUpload":"official",
            "task":"CONSTRAINED",
            "submitName": "wav2vec",
            "modelURL":"-",
            "modelDesc": "F-C",
            "stride": 10,
            "inputFormat": "waveform",
            "corpus": "LS 960 hr",
            "paramDesc":"-",
            "paramShared": 32.54e6,
            "PR_per_public": 32.39,
            "KS_acc_public": 94.09,
            "IC_acc_public": 78.91,
            "SID_acc_public": 44.88,
            "ER_acc_public": 58.17,
            "ASR_wer_public": 16.4,
            "ASR_LM_wer_public": 11.3,
            "QbE_mtwv_public": 0.0307,
            "SF_f1_public": 77.52,
            "SF_cer_public": 41.75,
            "SV_eer_public": 9.83,
            "SD_der_public": 10.79,
        },
        {
            "name":"official",
            "aoeTimeUpload":"official",
            "task":"CONSTRAINED",
            "submitName": "vq-wav2vec",
            "modelURL":"-",
            "modelDesc": "F-C + VQ",
            "stride": 10,
            "inputFormat": "waveform",
            "corpus": "LS 960 hr",
            "paramDesc":"-",
            "paramShared": 34.15e6,
            "PR_per_public": 53.49,
            "KS_acc_public": 92.28,
            "IC_acc_public": 59.4,
            "SID_acc_public": 39.04,
            "ER_acc_public": 55.89,
            "ASR_wer_public": 18.7,
            "ASR_LM_wer_public": 12.69,
            "QbE_mtwv_public": 0.0302,
            "SF_f1_public": 70.57,
            "SF_cer_public": 50.16,
            "SV_eer_public": 9.5,
            "SD_der_public": 9.93,
        },
        {
            "name":"official",
            "aoeTimeUpload":"official",
            "task":"CONSTRAINED",
            "submitName": "wav2vec 2.0",
            "modelURL":"-",
            "modelDesc": "M-C + VQ",
            "stride": 20,
            "inputFormat": "waveform",
            "corpus": "LS 960 hr",
            "paramDesc":"-",
            "paramShared": 95.04e6,
            "PR_per_public": 28.37,
            "KS_acc_public": 92.31,
            "IC_acc_public": 58.34,
            "SID_acc_public": 45.62,
            "ER_acc_public": 56.93,
            "ASR_wer_public": 9.57,
            "ASR_LM_wer_public": 6.32,
            "QbE_mtwv_public": 8.8e-4,
            "SF_f1_public": 79.94,
            "SF_cer_public": 37.81,
            "SV_eer_public": 9.69,
            "SD_der_public": 7.48,
        },
        {
            "name":"official",
            "aoeTimeUpload":"official",
            "task":"CONSTRAINED",
            "submitName": "HuBERT Base",
            "modelURL":"-",
            "modelDesc": "M-P + VQ",
            "stride": 20,
            "inputFormat": "waveform",
            "corpus": "LS 960 hr",
            "paramDesc":"-",
            "paramShared": 94.68e6,
            "PR_per_public": 6.85,
            "KS_acc_public": 95.98,
            "IC_acc_public": 95.94,
            "SID_acc_public": 64.84,
            "ER_acc_public": 62.94,
            "ASR_wer_public": 6.74,
            "ASR_LM_wer_public": 4.93,
            "QbE_mtwv_public": 0.0759,
            "SF_f1_public": 86.24,
            "SF_cer_public": 28.52,
            "SV_eer_public": 7.22,
            "SD_der_public": 6.76,
        },
        {
            "name":"official",
            "aoeTimeUpload":"official",
            "task":"CONSTRAINED",
            "submitName": "HuBERT Large",
            "modelURL":"-",
            "modelDesc": "M-P + VQ",
            "stride": 20,
            "inputFormat": "waveform",
            "corpus": "LL 60k hr",
            "paramDesc":"-",
            "paramShared": 316.61e6,
            "PR_per_public": 3.72,
            "KS_acc_public": 93.15,
            "IC_acc_public": 98.37,
            "SID_acc_public": 66.4,
            "ER_acc_public": 64.93,
            "ASR_wer_public": 3.67,
            "ASR_LM_wer_public": 2.91,
            "QbE_mtwv_public": 0.036,
            "SF_f1_public": 88.68,
            "SF_cer_public": 23.05,
            "SV_eer_public": 7.7,
            "SD_der_public": 6.23,
        },]
    return data