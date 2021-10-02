import { createMuiTheme } from "@material-ui/core/styles";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AllInclusive from "@material-ui/icons/AllInclusive";

import {
    constrainedTheme,
    lessConstrainedTheme,
    unconstrainedTheme,
    submitFormTheme,
} from "./components/Theme";
import { Strong } from "./components/Utilies";

const subscribe_link = "https://forms.gle/sVMWx9FHjL4DvK3K8"

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
            {
                name: "ST",
                description: `Speech Translation (ST) translates utterance into foreign words. To achieve this goal, the model has to perform ASR and MT simultaneously, which increases the difficulty. CoVoST2 En-De dataset is adopted while all the examples containing "REMOVE" are removed. The evaluation metric is case-sensitive detokenized BLEU.
                `
            }
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
    {
        name: "generation",
        description: "generation description",
        tasks: [
            {
                name: "SE",
                description: `Speech enhancement (SE) is the task of removing background noise from a degraded speech signal and improving the perceived quality and intelligibility of the signal. In SUPERB, we evaluate the speech enhancement problem on the VoiceBank-DEMAND corpus. A three layer BLSTM model is trained to predict the spectral mask for the clean signal. The prediction is transformed back to the time domain using inverse short-time Fourier transform (iSTFT). Our evaluation metrics cover various aspects of the speech enhancement quality. including Perceptual Evaluation of Speech Quality (PESQ),  ShortTime Objective Intelligibility (STOI), MOS predictor of overall signal quality (COVL) and scale-invariant signal-to-distortion ratio improvement (SI-SDRi)
                `
            },
            {
                name: "SS",
                description: `Speech Separation (SS) is the task of separating target speech from background interference. It is an important step for speech processing, especially for noisy and multi-talker scenarios. In SUPERB, we investigate speech separation on the Libri2Mix dataset. We use the same 3-layer BLSTM model as the enhancement task, and permutation invariant training (PIT) is performed to optimize the objectives. The evaluation metric for speech separation is scale-invariant signal-to-distortion ratio improvement (SI-SDRi).
                `
            },
        ],
    }
];

const tracks = [
    {
        name: "constrained",
        rules: (
            <span>
                A fair comparison between{" "}
                <Strong>frozen representations</Strong> by enforcing the same
                downstream model in each task. Only a few hyper-paramters for
                training are allowed to tuned.
            </span>
        ),
        submit: "Make sure to read the rules before submitting.",
        Icon: LockIcon,
        theme: createMuiTheme(constrainedTheme),
    },
    {
        name: "less-constrained",
        rules: (
            <span>
                A comparison between <Strong>frozen representations</Strong>{" "}
                with customized but limited-resource downstream models. The
                details of downstream models are reported along with
                submissions.
            </span>
        ),
        submit: false,
        Icon: LockOpenIcon,
        theme: createMuiTheme(lessConstrainedTheme),
    },
    {
        name: "unconstrained",
        rules: (
            <span>
                The track does not limit any approach for solving SUPERB tasks
                as long as it in principle utilizes only{" "}
                <Strong>a single shared model</Strong> with limited
                task-specific parameters.
            </span>
        ),
        submit: false,
        Icon: AllInclusive,
        theme: createMuiTheme(unconstrainedTheme),
    },
];


const leaderboard_selections = [
    {
        name: "all",
        theme: createMuiTheme(submitFormTheme),
    },
    {
        name: "constrained",
        theme: createMuiTheme(constrainedTheme),
    },
    {
        name: "less-constrained",
        theme: createMuiTheme(lessConstrainedTheme),
    },
    {
        name: "unconstrained",
        theme: createMuiTheme(unconstrainedTheme),
    },
];

const public_hidden_selections = [
    {
        name: "public",
        theme: createMuiTheme(submitFormTheme),
    },
    {
        name: "hidden",
        theme: createMuiTheme(submitFormTheme),
    },
];

const individual_submission_columnInfo = {
    aoeTimeUpload: {
        header: "Upolad Time",
        width: 160,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    task: {
        header: "Task",
        width: 130,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    showOnLeaderboard: {
        header: "Show",
        width: 70,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    submitName: {
        header: "Method",
        width: 150,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    download: {
        header: "Download",
        width: 100,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    modelURL: {
        header: "Model URL",
        width: 100,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    modelDesc: {
        header: "Description",
        width: 100,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    stride: {
        header: "Stride",
        width: 100,
        higherBetter: undefined,
        type: "number",
    },
    inputFormat: {
        header: "Input Format",
        width: 100,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    corpus: {
        header: "Corpus",
        width: 100,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    paramDesc: {
        header: "Parameter Description",
        width: 100,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    paramShared: {
        header: "Shared parameters",
        width: 100,
        higherBetter: undefined,
        type: "number",
    },
    fineTunedParam: {
        header: "Fine-tuned parameters",
        width: 100,
        higherBetter: undefined,
        type: "number",
    },
    taskSpecParam: {
        header: "Task-specific parameters",
        width: 100,
        higherBetter: undefined,
        type: "number",
    },
    state: {
        header: "State",
        width: 70,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    stateInfo: {
        header: "State Info",
        width: 100,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    submitUUID: {
        header: "Submission ID",
        width: 100,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    PR_per_public: {
        header: "PR public",
        width: 110,
        higherBetter: false,
        isScore: true,
        type: "number",
    },
    KS_acc_public: {
        header: "KS public",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    IC_acc_public: {
        header: "IC public",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    SID_acc_public: {
        header: "SID public",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    ER_acc_public: {
        header: "ER public",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    ERfold1_acc_public: {
        header: "ER fold1",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    ERfold2_acc_public: {
        header: "ER fold2",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    ERfold3_acc_public: {
        header: "ER fold3",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    ERfold4_acc_public: {
        header: "ER fold4",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    ERfold5_acc_public: {
        header: "ER fold5",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    ASR_wer_public: {
        header: "ASR public",
        width: 120,
        higherBetter: false,
        isScore: true,
        type: "number",
    },
    ASR_LM_wer_public: {
        header: "ASR-LM public",
        width: 140,
        higherBetter: false,
        isScore: true,
        type: "number",
    },
    QbE_mtwv_public: {
        header: "QbE public",
        width: 120,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    SF_f1_public: {
        header: "SF-F1 public",
        width: 130,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    SF_cer_public: {
        header: "SF-CER public",
        width: 140,
        higherBetter: false,
        isScore: true,
        type: "number",
    },
    SV_eer_public: {
        header: "SV public",
        width: 110,
        higherBetter: false,
        isScore: true,
        type: "number",
    },
    SD_der_public: {
        header: "SD public",
        width: 110,
        higherBetter: false,
        isScore: true,
        type: "number",
    },
};


const leaderboard_columnInfo = {
    aoeTimeUpload: {
        header: "Upolad Time",
        width: 160,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    task: {
        header: "Task",
        width: 130,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    name: {
        header: "Name",
        width: 100,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    submitName: {
        header: "Method",
        width: 150,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    modelURL: {
        header: "URL",
        width: 60,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    modelDesc: {
        header: "Description",
        width: 100,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    stride: {
        header: "Stride",
        width: 100,
        higherBetter: undefined,
        type: "number",
    },
    inputFormat: {
        header: "Input Format",
        width: 100,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    corpus: {
        header: "Corpus",
        width: 100,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    paramDesc: {
        header: "Parameter Description",
        width: 100,
        higherBetter: undefined,
        type: "alphanumeric",
    },
    paramShared: {
        header: "Shared parameters",
        width: 100,
        higherBetter: undefined,
        type: "number",
    },
    fineTunedParam: {
        header: "Fine-tuned parameters",
        width: 100,
        higherBetter: undefined,
        type: "number",
    },
    taskSpecParam: {
        header: "Task-specific parameters",
        width: 100,
        higherBetter: undefined,
        type: "number",
    },
    PR_per_public: {
        header: "PR public",
        width: 110,
        higherBetter: false,
        isScore: true,
        type: "number",
    },
    KS_acc_public: {
        header: "KS public",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    IC_acc_public: {
        header: "IC public",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    SID_acc_public: {
        header: "SID public",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    ER_acc_public: {
        header: "ER public",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    ERfold1_acc_public: {
        header: "ER fold1",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    ERfold2_acc_public: {
        header: "ER fold2",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    ERfold3_acc_public: {
        header: "ER fold3",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    ERfold4_acc_public: {
        header: "ER fold4",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    ERfold5_acc_public: {
        header: "ER fold5",
        width: 110,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    ASR_wer_public: {
        header: "ASR public",
        width: 120,
        higherBetter: false,
        isScore: true,
        type: "number",
    },
    ASR_LM_wer_public: {
        header: "ASR-LM public",
        width: 140,
        higherBetter: false,
        isScore: true,
        type: "number",
    },
    QbE_mtwv_public: {
        header: "QbE public",
        width: 120,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    SF_f1_public: {
        header: "SF-F1 public",
        width: 130,
        higherBetter: true,
        isScore: true,
        type: "number",
    },
    SF_cer_public: {
        header: "SF-CER public",
        width: 140,
        higherBetter: false,
        isScore: true,
        type: "number",
    },
    SV_eer_public: {
        header: "SV public",
        width: 110,
        higherBetter: false,
        isScore: true,
        type: "number",
    },
    SD_der_public: {
        header: "SD public",
        width: 110,
        higherBetter: false,
        isScore: true,
        type: "number",
    },
};

const submission_types = {
    Method: "string",
    Description: "string",
    Parameters: 0,
    Stride: 0,
    Input: "string",
    Corpus: "string",
    PR: 0,
    KS: 0,
    IC: 0,
    SID: 0,
    ER: 0,
    ASR: 0,
    "ASR-LM": 0,
    QbE: 0,
    "SF-F1": 0,
    "SF-CER": 0,
    SV: 0,
    SD: 0,
};


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
        PR: 58.87,
        KS: 82.54,
        IC: 29.82,
        SID: 37.99,
        ER: 57.86,
        ASR: 25.11,
        "ASR-LM": 16.62,
        QbE: 0.0072,
        "SF-F1": 62.14,
        "SF-CER": 60.17,
        SV: 11.61,
        SD: 8.68,
    },
    {
        Method: "APC",
        Description: "F-G",
        Parameters: 4.11e6,
        Stride: 10,
        Input: "FBANK",
        Corpus: "LS 360 hr",
        PR: 41.98,
        KS: 91.01,
        IC: 74.69,
        SID: 60.42,
        ER: 59.33,
        ASR: 21.28,
        "ASR-LM": 14.74,
        QbE: 0.031,
        "SF-F1": 70.46,
        "SF-CER": 50.89,
        SV: 8.56,
        SD: 10.53,
    },
    {
        Method: "VQ-APC",
        Description: "F-G + VQ",
        Parameters: 4.63e6,
        Stride: 10,
        Input: "FBANK",
        Corpus: "LS 360 hr",
        PR: 41.08,
        KS: 91.11,
        IC: 74.48,
        SID: 60.15,
        ER: 59.66,
        ASR: 21.20,
        "ASR-LM": 15.21,
        QbE: 0.0251,
        "SF-F1": 68.53,
        "SF-CER": 52.91,
        SV: 8.72,
        SD: 10.45,
    },
    {
        Method: "NPC",
        Description: "M-G + VQ",
        Parameters: 19.38e6,
        Stride: 10,
        Input: "FBANK",
        Corpus: "LS 360 hr",
        PR: 43.81,
        KS: 88.96,
        IC: 69.44,
        SID: 55.92,
        ER: 59.08,
        ASR: 20.20,
        "ASR-LM": 13.91,
        QbE: 0.0246,
        "SF-F1": 72.79,
        "SF-CER": 48.44,
        SV: 9.4,
        SD: 9.34,
    },
    {
        Method: "Mockingjay",
        Description: "time M-G",
        Parameters: 85.12e6,
        Stride: 10,
        Input: "FBANK",
        Corpus: "LS 360 hr",
        PR: 70.19,
        KS: 83.67,
        IC: 34.33,
        SID: 32.29,
        ER: 50.28,
        ASR: 22.82,
        "ASR-LM": 15.48,
        QbE: 6.6E-04,
        "SF-F1": 61.59,
        "SF-CER": 58.89,
        SV: 11.66,
        SD: 10.54,
    },
    {
        Method: "TERA",
        Description: "time/freq M-G",
        Parameters: 21.33e6,
        Stride: 10,
        Input: "FBANK",
        Corpus: "LS 960 hr",
        PR: 49.17,
        KS: 89.48,
        IC: 58.42,
        SID: 57.57,
        ER: 56.27,
        ASR: 18.17,
        "ASR-LM": 12.16,
        QbE: 0.0013,
        "SF-F1": 67.50,
        "SF-CER": 54.17,
        SV: 15.89,
        SD: 9.96,
    },
    {
        Method: "modified CPC",
        Description: "F-C",
        Parameters: 1.84e6,
        Stride: 10,
        Input: "waveform",
        Corpus: "LL 60k hr",
        PR: 42.54,
        KS: 91.88,
        IC: 64.09,
        SID: 39.63,
        ER: 60.96,
        ASR: 20.18,
        "ASR-LM": 13.53,
        QbE: 0.0326,
        "SF-F1": 71.19,
        "SF-CER": 49.91,
        SV: 12.86,
        SD: 10.38,
    },
    {
        Method: "wav2vec",
        Description: "F-C",
        Parameters: 32.54e6,
        Stride: 10,
        Input: "waveform",
        Corpus: "LS 960 hr",
        PR: 31.58,
        KS: 95.59,
        IC: 84.92,
        SID: 56.56,
        ER: 59.79,
        ASR: 15.86,
        "ASR-LM": 11.00,
        QbE: 0.0485,
        "SF-F1": 76.37,
        "SF-CER": 43.71,
        SV: 7.99,
        SD: 9.9,
    },
    {
        Method: "vq-wav2vec",
        Description: "F-C + VQ",
        Parameters: 34.15e6,
        Stride: 10,
        Input: "waveform",
        Corpus: "LS 960 hr",
        PR: 33.48,
        KS: 93.38,
        IC: 85.68,
        SID: 38.80,
        ER: 58.24,
        ASR: 17.71,
        "ASR-LM": 12.80,
        QbE: 0.0410,
        "SF-F1": 77.68,
        "SF-CER": 41.54,
        SV: 10.38,
        SD: 9.93,
    },
    {
        Method: "wav2vec 2.0 Base",
        Description: "M-C + VQ",
        Parameters: 95.04e6,
        Stride: 20,
        Input: "waveform",
        Corpus: "LS 960 hr",
        PR: 5.74,
        KS: 96.23,
        IC: 92.35,
        SID: 75.18,
        ER: 63.43,
        ASR: 6.43,
        "ASR-LM": 4.79,
        QbE: 0.0233,
        "SF-F1": 88.30,
        "SF-CER": 24.77,
        SV: 6.02,
        SD: 6.08,
    },
    {
        Method: "wav2vec 2.0 Large",
        Description: "M-C + VQ",
        Parameters: 316.61e6,
        Stride: 20,
        Input: "waveform",
        Corpus: "LL 60k hr",
        PR: 4.75,
        KS: 96.66,
        IC: 95.28,
        SID: 86.14,
        ER: 65.64,
        ASR: 3.75,
        "ASR-LM": 3.10,
        QbE: 0.0489,
        "SF-F1": 87.11,
        "SF-CER": 27.31,
        SV: 5.65,
        SD: 5.62,
    },
    {
        Method: "HuBERT Base",
        Description: "M-P + VQ",
        Parameters: 94.68e6,
        Stride: 20,
        Input: "waveform",
        Corpus: "LS 960 hr",
        PR: 5.41,
        KS: 96.30,
        IC: 98.34,
        SID: 81.42,
        ER: 64.92,
        ASR: 6.42,
        "ASR-LM": 4.79,
        QbE: 0.0736,
        "SF-F1": 88.53,
        "SF-CER": 25.20,
        SV: 5.11,
        SD: 5.88,
    },
    {
        Method: "HuBERT Large",
        Description: "M-P + VQ",
        Parameters: 316.61e6,
        Stride: 20,
        Input: "waveform",
        Corpus: "LL 60k hr",
        PR: 3.53,
        KS: 95.29,
        IC: 98.76,
        SID: 90.33,
        ER: 67.62,
        ASR: 3.62,
        "ASR-LM": 2.94,
        QbE: 0.0353,
        "SF-F1": 89.81,
        "SF-CER": 21.76,
        SV: 5.98,
        SD: 5.75,
    },
];

export { subscribe_link, domains, tracks, submissions, submission_types, individual_submission_columnInfo, leaderboard_columnInfo, leaderboard_selections, public_hidden_selections };
