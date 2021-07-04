import datetime 
import uuid
import enum
import datetime

def get_uuid():
    return str(uuid.uuid4())
    
def get_AOETime():
    return (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=12)).strftime("%Y-%m-%d %H:%M:%S")

def submission_records_parser(submission_records, configs):

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

    file_info_list = configs["INDIVIDUAL_SUBMISSION_INFO"]["FILE"]
    score_info_list = configs["INDIVIDUAL_SUBMISSION_INFO"]["SCORE"]

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

def get_leaderboard():
    data = [{
            "Method": "FBANK",
            "Description": "classic feature",
            "Parameters": 0,
            "Stride": 10,
            "Input": "waveform",
            "Corpus": "-",
            "PR": 82.01,
            "KS": 8.63,
            "IC": 9.1,
            "SID": 8.5e-4,
            "ER": 35.39,
            "ASR": 23.18,
            "ASR-LM": 15.21,
            "QbE": 0.0058,
            "SF-F1": 69.64,
            "SF-CER": 52.94,
            "SV": 9.56,
            "SD": 10.05,
        },
        {
            "Method": "PASE+",
            "Description": "multi-task",
            "Parameters": 7.83e6,
            "Stride": 10,
            "Input": "waveform",
            "Corpus": "LS 50 hr",
            "PR": 58.88,
            "KS": 82.37,
            "IC": 30.29,
            "SID": 35.84,
            "ER": 57.64,
            "ASR": 24.92,
            "ASR-LM": 16.61,
            "QbE": 7.0e-4,
            "SF-F1": 60.41,
            "SF-CER": 62.77,
            "SV": 10.91,
            "SD": 8.52,
        },]
    return data