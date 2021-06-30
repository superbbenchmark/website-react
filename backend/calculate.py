"""SUPERB Metrics calculator"""
import os
import yaml
import argparse

def main_process(args):
    with open("configs.yaml") as f:
        configs = yaml.safe_load(f)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--input_zip", "-i", type = str, required = True, help = "The request zip file")
    parser.add_argument("--user_id", "-u", type = str, required = True, help = "The corresponding user id")
    args = parser.parse_args()
    main_process(args)