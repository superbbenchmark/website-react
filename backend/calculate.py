"""SUPERB Metrics calculator"""
import os
import yaml
import argparse

def metric_calculate_pipeline(file_path="./upload/aaa@gmail.com/1/predict.zip", submitUUID = ""):
    with open("configs.yaml") as f:
        configs = yaml.safe_load(f)
    print(configs["UNZIP_TIMEOUT"])
    stat = os.system(f"timeout {configs["UNZIP_TIMEOUT"]} unzip {file_path} -d {os.path.dirname(file_path)}")
    
    # timeout!
    if (stat != 0):
        
        return
metric_calculate_pipeline()