import datetime 
import uuid
import enum
import datetime

def get_uuid():
    return str(uuid.uuid4())
    
def get_AOETime():
    return (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=12)).strftime("%Y-%m-%d %H:%M:%S")

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
        },]
    return data