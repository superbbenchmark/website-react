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