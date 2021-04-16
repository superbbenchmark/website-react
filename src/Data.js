import { green, red, yellow } from "@material-ui/core/colors";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AllInclusive from "@material-ui/icons/AllInclusive";

import { Strong } from "./components/Utilies";

const domains = [
  {
    name: "recognition",
    description: "recognition description",
    tasks: [
      {
        name: "PR",
        description:
          "\
            Phoneme Recognition, PR transcribes an utterance into the smallest content units.\
            We include alignment modeling in the PR task to avoid the potential inaccurate forced alignment.\
            LibriSpeech train-clean-100/dev-clean/test-clean subsets are adopted in SUPERB for training/validation/testing.\
            Phoneme transcriptions are obtained from the LibriSpeech official g2p-model-5 and the conversion script in Kaldi librispeech s5 recipe.\
            The evaluation metric is phone error rate (PER).\
          ",
      },
      {
        name: "ASR",
        description:
          "\
            Automatic Speech Recognition, ASR transcribes utterances into words.\
            While PR analyzes the improvement in modeling phonetics, ASR reflects the significance of the improvement in a real-world scenario.\
            LibriSpeech train-clean-100/devclean/test-clean subsets are used for training/validation/testing.\
            The evaluation metric is word error rate (WER).\
          ",
      },
    ],
  },
  {
    name: "detection",
    description: "detection description",
    tasks: [
      {
        name: "KS",
        description:
          "\
            Keyword Spotting, KS detects preregistered keywords by classifying utterances into a predefined set of words.\
            The task is usually performed on-device for the fast response time.\
            Thus, accuracy, model size, and inference time are all crucial.\
            We choose the widely used Speech Commands dataset v1.0 for the task.\
            The dataset consists of ten classes of keywords, a class for silence, and an unknown class to include the false positive.\
            The evaluation metric is accuracy (ACC)\
          ",
      },
      {
        name: "QbE",
        description:
          "\
            Query by Example Spoken Term Detection, QbE detects a spoken term (query) in an audio database (documents) by \
            binary discriminating a given pair of query and document into a match or not.\
            The English subset in QUESST 2014 challenge is adopted since we focus on investigating English as the first step.\
            The evaluation metric is maximum term weighted value (MTWV) which balances misses and false alarms.\
          ",
      },
    ],
  },
  {
    name: "semantics",
    description: "semantics description",
    tasks: [
      {
        name: "IC",
        description:
          "\
            Intent Classification, IC classifies utterances into predefined classes to determine the intent of speakers.\
            We use the Fluent Speech Commands dataset, where each utterance is tagged with three intent labels: action, object, and location.\
            The evaluation metric is accuracy (ACC).\
          ",
      },
      {
        name: "SF",
        description:
          "\
            Slot Filling, SF predicts a sequence of semantic slot-types from an utterance, \
            like a slot-type FromLocation for a spoken word Taipei, which is known as a slot-value.\
            Both slot-types and slot-values are essential for an SLU system to function.\
            The evaluation metrics thus include slot-type F1 score and slotvalue CER.\
            Audio SNIPS is adopted, which synthesized multi-speaker utterances for SNIPS.\
            Following the standard split in SNIPS, US-accent speakers are further selected for training, and others are for validation/testing.\
          ",
      },
    ],
  },
  {
    name: "speaker",
    description: "speaker description",
    tasks: [
      {
        name: "SID",
        description:
          "\
            Speaker Identification, SID classifies each utterance for its speaker identity as a multi-class classification, \
            where speakers are in the same predefined set for both training and testing.\
            The widely used VoxCeleb1 [26] is adopted, and the evaluation metric is accuracy (ACC).\
          ",
      },
      {
        name: "SV",
        description:
          "\
            Automatic Speaker Verification, ASV verifies whether the speakers of a pair of utterances match as a binary classification, \
            and speakers in the testing set may not appear in the training set.\
            Thus, ASV is more challenging than SID. VoxCeleb1 is used without VoxCeleb2 training data and noise augmentation. \
            The evaluation metric is equal error rate (EER).\
          ",
      },
      {
        name: "SD",
        description:
          "\
            Speaker Diarization, SD predicts who is speaking when for each timestamp, and multiple speakers can speak simultaneously.\
            The model has to encode rich speaker characteristics for each frame and should be able to represent mixtures of signals.\
            LibriMix is adopted where LibriSpeech train-clean-100/dev-clean/test-clean are used to generate mixtures for training/validation/testing.\
            We focus on the two-speaker scenario as the first step.\
            The time-coded speaker labels were generated using alignments from Kaldi LibriSpeech ASR model.\
            The evaluation metric is diarization error rate (DER).\
          ",
      },
    ],
  },
  {
    name: "paralinguistics",
    description: "paralinguistics description",
    tasks: [
      {
        name: "ER",
        description:
          "\
            Emotion Recognition, ER predicts an emotion class for each utterance.\
            The most widely used ER dataset IEMOCAP is adopted, and we follow the conventional evaluation protocol:\
            we drop the unbalance emotion classes to leave the final four classes with a similar amount of data points and \
            cross-validates on five folds of the standard splits.\
            The evaluation metric is accuracy (ACC).\
          ",
      },
    ],
  },
];

const tracks = [
  {
    name: "constrained",
    rules: (
      <span>
        A fair comparison between <Strong>frozen representations</Strong> by
        enforcing the same downstream model in each task. Only a few
        hyper-paramters for training are allowed to tuned.
      </span>
    ),
    submit: true,
    Icon: LockIcon,
    color: red[300],
  },
  {
    name: "less-constrained",
    rules: (
      <span>
        A comparison between <Strong>frozen representations</Strong> with
        customized but limited-resource downstream models. The details of
        downstream models are reported along with submissions.
      </span>
    ),
    submit: false,
    Icon: LockOpenIcon,
    color: yellow[700],
  },
  {
    name: "unconstrained",
    rules: (
      <span>
        A comparison between <Strong>frozen representations</Strong> with
        customized but limited-resource downstream models. The details of
        downstream models are reported along with submissions.
      </span>
    ),
    submit: false,
    Icon: AllInclusive,
    color: green[300],
  },
];

const submissions = [
  {
    Method: "FBANK",
    Description: "classic feature",
    Parameters: 0,
    Stride: 10,
    Input: "waveform",
    Corpus: "-",
    PR: 82.01,
    KS: 8.63,
    IC: 9.1,
    SID: 8.5e-4,
    ER: 35.39,
    ASR: 23.18,
    "ASR-LM": 15.21,
    QbE: 0.0058,
    "SF-F1": 69.64,
    "SF-CER": 52.94,
    SV: 9.56,
    SD: 10.05,
  },
  {
    Method: "PASE+",
    Description: "multi-task",
    Parameters: 7.83e6,
    Stride: 10,
    Input: "waveform",
    Corpus: "LS 50 hr",
    PR: 58.88,
    KS: 82.37,
    IC: 30.29,
    SID: 35.84,
    ER: 57.64,
    ASR: 24.92,
    "ASR-LM": 16.61,
    QbE: 7.0e-4,
    "SF-F1": 60.41,
    "SF-CER": 62.77,
    SV: 10.91,
    SD: 8.52,
  },
  {
    Method: "APC",
    Description: "F-G",
    Parameters: 4.11e6,
    Stride: 10,
    Input: "FBANK",
    Corpus: "LS 360 hr",
    PR: 41.85,
    KS: 91.04,
    IC: 74.64,
    SID: 59.79,
    ER: 58.84,
    ASR: 21.61,
    "ASR-LM": 15.09,
    QbE: 0.0268,
    "SF-F1": 71.26,
    "SF-CER": 50.76,
    SV: 8.81,
    SD: 10.72,
  },
  {
    Method: "VQ-APC",
    Description: "F-G + VQ",
    Parameters: 4.63e6,
    Stride: 10,
    Input: "FBANK",
    Corpus: "LS 360 hr",
    PR: 42.86,
    KS: 90.52,
    IC: 70.52,
    SID: 49.57,
    ER: 58.31,
    ASR: 21.72,
    "ASR-LM": 15.37,
    QbE: 0.0205,
    "SF-F1": 69.62,
    "SF-CER": 52.21,
    SV: 9.29,
    SD: 10.49,
  },
  {
    Method: "NPC",
    Description: "M-G + VQ",
    Parameters: 19.38e6,
    Stride: 10,
    Input: "FBANK",
    Corpus: "LS 360 hr",
    PR: 52.67,
    KS: 88.54,
    IC: 64.04,
    SID: 50.77,
    ER: 59.55,
    ASR: 20.94,
    "ASR-LM": 14.69,
    QbE: 0.022,
    "SF-F1": 67.43,
    "SF-CER": 54.63,
    SV: 10.28,
    SD: 9.59,
  },
  {
    Method: "Mockingjay",
    Description: "time M-G",
    Parameters: 85.12e6,
    Stride: 10,
    Input: "FBANK",
    Corpus: "LS 360 hr",
    PR: 80.01,
    KS: 82.67,
    IC: 28.87,
    SID: 34.5,
    ER: 45.72,
    ASR: 23.72,
    "ASR-LM": 15.94,
    QbE: 3.1e-10,
    "SF-F1": 60.83,
    "SF-CER": 61.16,
    SV: 23.22,
    SD: 11.24,
  },
  {
    Method: "TERA",
    Description: "time/freq M-G",
    Parameters: 21.33e6,
    Stride: 10,
    Input: "FBANK",
    Corpus: "LS 960 hr",
    PR: 47.53,
    KS: 88.09,
    IC: 48.8,
    SID: 58.67,
    ER: 54.76,
    ASR: 18.45,
    "ASR-LM": 12.44,
    QbE: 8.7e-5,
    "SF-F1": 63.28,
    "SF-CER": 57.91,
    SV: 16.49,
    SD: 9.54,
  },
  {
    Method: "modified CPC",
    Description: "F-C",
    Parameters: 1.84e6,
    Stride: 10,
    Input: "waveform",
    Corpus: "LL 60k hr",
    PR: 41.66,
    KS: 92.02,
    IC: 65.01,
    SID: 42.29,
    ER: 59.28,
    ASR: 20.02,
    "ASR-LM": 13.57,
    QbE: 0.0061,
    "SF-F1": 74.18,
    "SF-CER": 46.66,
    SV: 9.67,
    SD: 11.0,
  },
  {
    Method: "wav2vec",
    Description: "F-C",
    Parameters: 32.54e6,
    Stride: 10,
    Input: "waveform",
    Corpus: "LS 960 hr",
    PR: 32.39,
    KS: 94.09,
    IC: 78.91,
    SID: 44.88,
    ER: 58.17,
    ASR: 16.4,
    "ASR-LM": 11.3,
    QbE: 0.0307,
    "SF-F1": 77.52,
    "SF-CER": 41.75,
    SV: 9.83,
    SD: 10.79,
  },
  {
    Method: "vq-wav2vec",
    Description: "F-C + VQ",
    Parameters: 34.15e6,
    Stride: 10,
    Input: "waveform",
    Corpus: "LS 960 hr",
    PR: 53.49,
    KS: 92.28,
    IC: 59.4,
    SID: 39.04,
    ER: 55.89,
    ASR: 18.7,
    "ASR-LM": 12.69,
    QbE: 0.0302,
    "SF-F1": 70.57,
    "SF-CER": 50.16,
    SV: 9.5,
    SD: 9.93,
  },
  {
    Method: "wav2vec 2.0",
    Description: "M-C + VQ",
    Parameters: 95.04e6,
    Stride: 20,
    Input: "waveform",
    Corpus: "LS 960 hr",
    PR: 28.37,
    KS: 92.31,
    IC: 58.34,
    SID: 45.62,
    ER: 56.93,
    ASR: 9.57,
    "ASR-LM": 6.32,
    QbE: 8.8e-4,
    "SF-F1": 79.94,
    "SF-CER": 37.81,
    SV: 9.69,
    SD: 7.48,
  },
  {
    Method: "HuBERT Base",
    Description: "M-P + VQ",
    Parameters: 94.68e6,
    Stride: 20,
    Input: "waveform",
    Corpus: "LS 960 hr",
    PR: 6.85,
    KS: 95.98,
    IC: 95.94,
    SID: 64.84,
    ER: 62.94,
    ASR: 6.74,
    "ASR-LM": 4.93,
    QbE: 0.0759,
    "SF-F1": 86.24,
    "SF-CER": 28.52,
    SV: 7.22,
    SD: 6.76,
  },
  {
    Method: "HuBERT Large",
    Description: "M-P + VQ",
    Parameters: 316.61e6,
    Stride: 20,
    Input: "waveform",
    Corpus: "LL 60k hr",
    PR: 3.72,
    KS: 93.15,
    IC: 98.37,
    SID: 66.4,
    ER: 64.93,
    ASR: 3.67,
    "ASR-LM": 2.91,
    QbE: 0.036,
    "SF-F1": 88.68,
    "SF-CER": 23.05,
    SV: 7.7,
    SD: 6.23,
  },
];

export { domains, tracks, submissions };
