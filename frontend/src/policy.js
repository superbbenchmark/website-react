const challenge_overview = String.raw`
# SLT2022 SUPERB Challenge

## Contents

- [Evaluation Framework](/challenge-slt2022/framework): The evaluation framework of SLT2022 SUPERB challenge.
- [Upstream Specification](/challenge-slt2022/upstream): The Upstream Specification about data, programming language, and interface.
- [Leaderboard Submission](/challenge-slt2022/submission): The definitions of two leaderboards and how to make a submission.
- [Overall Metrics](/challenge-slt2022/metrics): Metrics definitions.

## Abstract

#### This challenge

* benchmarks **generalizability** of **Self-Supervised Learning (SSL)** speech model.
    * The similar evaluation framework introduced in [SUPERB Benchmark](https://arxiv.org/abs/2105.01051)
    * **Frozen** SSL model (termed **Upstream**)
    * Extract **multiple frozen hidden states** from upstream and trains a **learnable weighted-sum** over them along with the downstream model task-by-task
* has several [downstream tasks](/challenge-slt2022/framework#Tasks)
    - **Content**: PR, ASR, QbE
    - **Speaker**: SID, ASV, SD
    - **Paralinguistics**: ER
    - **Semantics**: ST
    - **Generation**: SE, SS
* has two leaderboards to submit:
    * **Public-set**: Dataset is publicly available, submit **prediction file**
        * Fixed downstream model architectures
        * Frozen upstream model
        * Except above, no other limitations in downstream training procedure (e.g. hyperparameter, optimizer, etc.)
        * Can only evaluated towards a subset of tasks
    * **Hidden-set**: Dataset is totally inaccessible, submit **model** (model definition & pre-trained weights)
        * We will use several different learning rates for each downstream task training while fixing all the other hyperparameters and present the best result on leaderboard
* encourage innovative and aims to be less competitive:
    * Participants are free to choose whether present their submissions on leaderboard or not
    * In addition to model accuracy, we will have metrics such as number of parameters and operations to capture computation efficiency of proposed approach. We encourage algorithm improvement from diverse perspectives.

## Participant Requirements

The following describes the requirements for a team to join the challenge.

### Submit an upstream model to the hidden-set leaderboard

The public-set is for the upstream development purpose. You can pre-train your upstream and evaluate it with any method you like. You are required to submit at least one upstream model to the hidden-set leaderboard.

### System description paper (Optional)

To verify the submitted upstream follows the challenge policy, we suggest to submit a system description paper in **SLT submission format** without the page limit. The paper should describe the method **for your submissions**, containing at least the following materials:

- SSL objectives
- Model architecture
- Pre-training data
- Parameter size for each submission

The submission should follow the challenge policy and the paper is expected to be well-written. The deadline for the system description paper is **Nov 1, 2022**. Review of these papers will be the responsibility of our SUPERB challenge organisers. Accepted system description papers will not be indexed by the IEEE, but authors of these papers will **have the opportunity to present their work in a dedicated session at the Workshop**.

The system description paper is for the challenge review only and is not considered as SLT workshop paper by default, but **we encourage participants to submit their methods' papers to SLT workshop**. If the method turns out to be similar to that used for the final selected submissions, the same paper can be used as the system description paper.

## Invitee Announcement and Presentation

After reviewing the system description papers and comparing their performance with the hidden-set **private scores**, we will announce the final results on **Dec 25, 2022**. And the outstanding one may be invited to present their methods in SLT workshop.

## Timeline

- Mar 02, 2022: Challenge announcement
- Mar 02, 2022: Leaderboard is online and accepts submissions
- Jul 15, 2022: SLT paper submission (encouraged)
- Sep 30, 2022: SLT paper notification
- Nov 01, 2022: System description paper submission deadline
- Dec 20, 2022: Result and invitee announcement
- at least after the end of 2022: End of hidden-set submission
- Jan 9 - 12, 2023: [SLT workshop](https://slt2022.org/) presentation

## Organizers

Hung-yi Lee (NTU)

Tzu-Hsun Feng (NTU)

Tzu-Quan Lin (NTU)

Haibin Wu (NTU)

Shinji Watanabe (CMU)

Xuankai Chang (CMU)

Ching-Feng Yeh (Meta)

Annie Dong (Meta)

Zili Huang (JHU)

## Advisors

### General advisor

Abdelrahman Mohamed (Meta)

Shang-Wen Li (Meta)

### Technical advisor

Shu-wen Yang (NTU)

## Hidden-set Committee

Xuankai Chang

Hsuan-Jui Chen

Yung-Sung Chuang

Zili Huang

Shang-Wen Li

Guan-Ting Lin

Yassin Omar

Jiatong Shi

Hsiang-Sheng Tsai

Shu-wen Yang

# Contact

[superb.announcement@gmail.com](mailto:superb.announcement@gmail.com)
`

const framework = String.raw`
## Evaluation Framework

### Background

![](https://i.imgur.com/FDARwvz.png)
*Fig 1.*

SUPERB Challenge follows the similar evaluation framework introduced in [SUPERB Benchmark](https://arxiv.org/abs/2105.01051), which benchmarks the **generalizability** of Self-Supervised Learning (SSL) on speech. SSL models are termed **Upstream** and are evaluated with various **Downstream** tasks. The framework extract **multiple frozen hidden states** from a single upstream model and trains a learnable **weighted-sum** over the hidden states along with the downstream model task-by-task.

### Overview

![](https://i.imgur.com/X0A5Fnm.png)

*Fig 2.*

Fig 2. illustrates the evaluation framework of the challenge. The challenge evaluates SSL models' generalizability on 10 [tasks](/challenge-slt2022/framework#Tasks). Each of the tasks has a corresponding public dataset (**public-set**) that is publicly available, and a hidden dataset (**hidden-set**) that will not be released. Participants can practice on the public-set to understand the performance of their upstream models, and choose the best one for submission as they wish. Then, participants **submit the upstream model** (model definition & pre-trained weights) publicly or privately to the hidden-set leaderboard ([submit tutorial](https://huggingface.co/superb/superb-submission)). **We finetune the downstream models on the hidden-set** without releasing any audio/label. Both public-set and hidden-set have leaderboards and welcome submissions to share more results with the community. Finally, there will be **overall performance metrics** (not include efficiency metrics) for ranking all upstreams.

All the participants are **encouraged to submit papers to [The IEEE Workshop on Spoken Language Technology (SLT)](https://slt2022.org/)**. And optionally, participants may also choose to submit **system description papers** to a separate Challenge Proceedings. Review of these papers will be the responsibility of our SUPERB challenge organisers. Accepted system description papers will not be indexed by the IEEE, but authors of these papers will have the opportunity to present their work in a dedicated session at the Workshop. 

### Tasks

7 evaluation tasks from [SUPERB Benchmark](https://arxiv.org/abs/2105.01051) and 3 extended tasks from [SUPERB-SG Benchmark](https://arxiv.org/abs/2203.06849) (marked with $\star$) are included in this challenge:

- **Content**
    - Phoneme Recognition (PR)
    - Automatic Speech Recognition (ASR)
    - Query-by-example Spoken Term Detection (QbE)
- **Speaker**
    - Speaker Identification (SID)
    - Automatic Speaker Verification (ASV)
    - Speaker Diarization (SD)
- **Paralinguistics**
    - Emotion Recognition (ER)
- **Semantics**
    - Speech Translation (ST) $\star$
- **Generation**
    - Speech Enhancement (SE) $\star$
    - Speech Separation (SS) $\star$

More task descriptions for the public-set can be found in [TASKS](/Tasks), and we implement the evaluation scripts for public-set in [S3PRL](https://github.com/s3prl/s3prl/blob/master/s3prl/downstream/docs/superb.md) for reference. The task design and evaluation pipeline will be the same between public-set & hidden-set unless otherwise mentioned.

### What is new

Compared with [SUPERB Benchmark](https://arxiv.org/abs/2105.01051), SUPERB Challenge extends the framework with the following:

- **New Tasks**: 
    - Speech Translation (ST)
    - Speech Enhancement (SE)
    - Source Separation (SS)
- **New Data Domains**: A challenging and newly recorded hidden-set with unseen (to upstream) text/audio domain.
- **New Overall Performance Metrics**: The metrics to rank upstream performances.

Compared with [SUPERB Challenge](/challenge-aaai2022) in AAAI2022, this time we make some modifications as below:

- **New Metrics**: 
    - **Params**: The number of upstream model parameters.
    - **MACs**: The estimated number of Multiply ACcumulate operations while **forwarding**.
- **Remove** parameter-penalized score and rank
`

const upstream = String.raw`
## Upstream Specification

### Unlabeled data only: Focus on SSL

- Any labeled/parallel data made by human annotators are **not allowed** to used for both model training and data preprocessing, e.g.
    - **audio/text pairs:** transcriptions in English, foreign languages, or phonemes.
    - **audio/tagging pairs:** speaker labels or sound event labels.
    - **audio/audio pairs:** audios with the same properties made parallel by human, e.g. audios with same content from different speakers, or the opposite.
- Any system pre-trained by labeled/parallel data **cannot** be used to help with the SSL pre-training, like pre-trained ASR.
- Any unlabeled/unparallel data is allowed, including the downstream datasets in the public-set. The nature alignments (not made by human annotators) between audio and other modalities are also allowed, e.g. videos.
- If it is hard to define whether your data is labeled/parallel, please [contact us](/challenge-slt2022/challenge_overview#Contact)!

### Programming Language

- We currently support:
    - **Python >= 3.6**
    - **Pytorch >= 1.7**

- We expect the upstream submission can pass the following check:
    ~~~python=
    upstream = YourModel.cuda()
    assert isinstance(upstream, torch.nn.Module)
    ~~~


We accept upstream models in PyTorch by default. If you wish to submit upstreams in non-PyTorch frameworks, or are not feasible to submit the pre-trained model, please [contact us](/challenge-slt2022/challenge_overview#Contact) for us to see how to help!

### Interface functions

See [here](https://huggingface.co/superb/superb-submission#1-add-model-interfaces).
`

const submission = String.raw`
## Public-set

### As the task definition and demonstration

The public-set serves as the demonstration of the task design, including:
* the data preprocessing,
* tasks' input/output formats,
* task-specific metrics. 

The datasets used in the public-set are all chosen to be public available for everyone to participate. Please refer to [TASKS](/tasks) and the implementation in [S3PRL](https://github.com/s3prl/s3prl/blob/master/s3prl/downstream/docs/superb.md) for details.

### As the platform for developing upstreams for the hidden-set

The differences between the public-set and the hidden-set are controlled to be only the following:

1. Recording conditions
2. Spoken content / text scripts
3. Speakers
4. Fewer labeled data

In this way, the public-set is still a good indicator of the hidden-set performance to some degree. We follow the same (unless mentioned otherwise in [TASKS](/tasks)) implementation in the public-set for the hidden-set, and hence encourage participants to use [S3PRL](https://github.com/s3prl/s3prl/blob/master/s3prl/downstream/docs/superb.md) to benchmark their upstream models on the public-set during development phase. The public-set and [S3PRL](https://github.com/s3prl/s3prl/blob/master/s3prl/downstream/docs/superb.md) implementations can serve as the start-kit.

### Provide baselines for comparison

#### Baselines

We collected most of the well-known SSL baseline models in [S3PRL](https://github.com/s3prl/s3prl/blob/master/s3prl/downstream/docs/superb.md), including TERA, wav2vec 2.0, HuBERT, DeCoAR 2.0, WavLM, LightHuBERT, and more. You can easily benchmark different upstreams by specifying in the command line arguments.

#### Comparison

Since the full benchmarking on the public-set can take some time for the training to converge. We released the [training artifacts](https://github.com/s3prl/s3prl/blob/master/s3prl/downstream/docs/superb_artifacts.md) of the top baseline systems (e.g. wav2vec2, HuBERT, WavLM) for participants to quickly compare with them. The artifacts include:

- Tensorboard logs
- Trained downstream weights (the best on public dev set)

### Public-set leaderboard and submission

The [public-set leaderboard](/leaderboard?subset=Public+Set&track=constrained) is online and [accepts submissions](/submit?type=public) (need login). There is no deadline for it. Since all the train/dev/test splits are public available, **the leaderboard accepts submissions with the inferenced prediction files on each task's testing split** which will be auto-generated if you follow the benchmarking steps in [S3PRL](https://github.com/s3prl/s3prl/blob/master/s3prl/downstream/docs/superb.md). And in this challenge, we only consider submissions submited to the **Constrained track** (see [Rules](/rules) for further information about track).

## Hidden-set

### Fairness & prevent overfitting

Since all the train/dev/test splits are public in the public-set, it is possible to cheat by directly reporting the best results on the testing split, and the results are thus overfit on the testing split. Hence, the hidden-set is collected and prepared to follow the same task design as that in the public-set but with the newly created data. All the splits will **NOT be released in both audio and labels**. The members involved in the hidden-set preparation should **NOT** participate the challenge. These members are listed in the [**Hidden-set Committee**](/challenge-slt2022/challenge_overview#Hidden-set-Committee) below.

### Hidden-set leaderboard and submission

#### Submission type

The leaderboard accepts **submissions with the upstream model solely**, including **model definition** and **pre-trained weights**. The upstream model should follow the specification detailed at [Upstream Specification](/challenge-slt2022/upstream). The submission can be done publicly or privately. Only the [**Hidden-set Committee**](/challenge-slt2022/challenge_overview#Hidden-set-Committee) members can access the privately submitted upstreams and the models will be used solely for this challenge.

- We accept upstream models in PyTorch by default. If you wish to submit upstreams in non-PyTorch frameworks, please [contact us](/challenge-slt2022/challenge_overview#Contact)!
- If you are not feasible to submit the pre-trained model, please [contact us](/challenge-slt2022/challenge_overview#Contact) for us to see how to help!

#### Finetuning on submission

After the upstream model is submitted, we **benchmark the submitted upstream by finetuning each task's downstream model for participants**. **The quota for submissions per week is limited and starts from 2 times/week,** but will be dynamically adjusted based on the number of participants. The quota adjustment will be announced at [NEWS](https://superbbenchmark.org/news). Participants can [contact us](/challenge-slt2022/challenge_overview#Contact) to acquire the finetuning artifacts of their own submissions for sanity checks, including:

- Tensorboard logs
- Testing results
- Trained downstream weights

#### Private dev/test scores

After training the downstream model for all tasks with several different learning rates, we will show the best performance of each task on the hidden-set's development splits. And show the true performance from the same checkpoint on the testing splits.

#### How to submit

The [hidden-set leaderboard](/leaderboard?subset=Hidden+Dev+Set&track=constrained) is online and accepts submissions. Please follow the submission steps. We use HuggingFace's Hub to host the submitted upstreams and track the submitted model weights. On the other hand, we use our submission page to control the submission limit, where the participants tell us the locations of their models on HuggingFace's Hub.

After submitting via the submission page, you will see a new entry in the submission history under your Profile page, and the evaluation results on the hidden-set will be revealed at the entry within one week. Please stay tuned!

All the submitted results will remain anonymous during and after the challenge. You can select a few submissions to show on the leaderboard. If no submission is selected, we will show all your submissions on the leaderboard anonymously. Only you can see your personal/model information on the leaderboard, but you will not see others'. If you wish to reveal your personal/model information on the hidden-set leaderboard, please contact us!

## Profiling Tool

(Update 04/28/2022 AOE)

[The profiling tool](https://github.com/B06901052/DeepSpeed/tree/superb-challenge) we used are mainly based on [**DeepSpeed**](https://github.com/microsoft/DeepSpeed/tree/master/deepspeed/profiling/flops_profiler) developed by **Microsoft**. And for our demands, we fork it and add some additional features. You can use it to profile your model or upstreams in s3prl. All the details are in the repo's README.md.

To match reality, we choose 32 audios as model inputs from LibriSpeech test-clean split by:
1. sort all audios by sequence length
2. choose (82*i + 1)th from i=0~31 audios (2620 audios in total)
`

const metrics = String.raw`
## Overall Metrics

(Update 04/09/2022 AOE)

In this challenge, there are two types of metrics, performance and efficiency metrics.

For performance metrics, we announce two kinds of metrics to measure it: **superb-rank** ($superb_r$) and **superb-score** ($superb_s$) in parameter-agnostic manner. In this challenge, $superb_r$ is the primary metrics. When equal rank is found on two different upstreams, $superb_{s}$ is used to break the tie.

To encourage the development of speech SSL on small and green models, we add two metrics to measure model efficiency, **Params** for memory usage and **MACs** for computataional cost as another targets to make improvement. Also, to gauge the effectiveness and parameter-efficiency of new SSL algorithms, we encourage participants to submit multiple upstreams trained by the same algorithm with the only difference in parameter size. They are computed by [this profiling tool](/challenge-slt2022/submission#Profiling-Tool).

### Notation

Suppose each task $t$ in all tasks $T$ has a single metric $s_t$, and the score of an upstream $u$ on task $t$ is $s_t(u)$ which has already been transformed to make higher values represent better performance. Eg. We use WAcc here for ASR instead of the raw WER.

If there are two or more metrics in one task $T$, such as pesq and stoi in SE, then the $s_t$ will be the arithmetic mean of them.

### Performance Metrics

Performance metrics demonstrate the best performance SSL can achieve, and encourages participants to explore any possibility to push the limits.

#### $superb_s$

To aggregate all task-specific scores $s_t(u)$ into a single static score, we linearly transform each of them into points so that:

- $s_t(fbank) = 0$, The performance of FBANK maps to 0
- $s_t(sota) = 1000$, The performance of the existing SOTA upstream *for this task* maps to 1000.

$$
p_t(u) = \dfrac{1000}{s_t({sota}) - s_t({fbank})}\ (\ s_t(u) - s_t({fbank})\ )
$$

Hence, most of the points will sit between 0~1000. The upstream worse than FBANK on this task will get negative points. The upstream better than the task-specific SOTA upstream will get points higher than 1000. The $superb_s$ of the upstream $u$ is the average of $p_t$ over all tasks.

$$
superb_s = \dfrac{1}{|T|} \sum_{t \in T}\ p_t(u)
$$

Intuitively, two reference points: FBANK and SOTA decide the typical interested interval for a task-specific metric and scale the task scores to 0~1000 points accordingly. The similar range of points across tasks can then be averaged. Beyond scaling with the pre-defined metric range, this interval further determines *how hard for a task to improve*. For a harder task, its smaller interval at the denominator give the task more credit for any unit improvement.

#### $superb_r$

To encourage the development on **universal models** instead of models skewed toward a subset of tasks. We use ranking to saturate the improvement when an upstream already become the best for that task. The $superb_r$ for an upstream $u$ is the average number of upstreams which $u$ can win in each task. This metric dynamically depends on all the upsreams $U$ shown on the leaderboard. In the following, $L$ is the number of upstreams which $u$ can win using the metric $x_t$.

$$
L(x_t, u) = |\ \{\ \hat{u} \in U\ |\ x_t(u) > x_t(\hat{u}) \ \}\ |
$$

$$
superb_r = \dfrac{1}{|T|} \sum_{t \in T} L(s_t, u) = \dfrac{1}{|T|} \sum_{t \in T} L(p_t, u)
$$

### Efficiency Metrics

#### MACs (number of Multiply-ACcumulate operations)

For this metrics, we are focus on the algorithm-level, rather than software-level or hardware-level, so the cost yeild from the real implementation will not be taken into consideration. Take the torch.Tensor.__rdiv__ as an example, if its input is int or float, it will call reciprocal, __mul__, and __truediv__, respectively, but we still count it only once. Also, when a function is counted, those functions called in it will not be counted again.

##### Estimated Rule

The original defination of MACs should be a multiply operation followed by an add operation, as below:

$MACs=num(a\times b + c)$

But in the implementation of the profiling tool we used (most done by DeepSpeed, Microsoft), the value may be approximated by following formulas or something similar:

$\approx\max\{num(add)+num(sub), num(mul)+num(div)\}$

$\approx FLOPs/2$

##### Ignored Modules

For the modules below, it will not be taken into account and will raise a warning message when your model forwards a function in them.

- torch.special
- torch.fft
- torch.linalg
- torchaudio
- torchvision

In this challenge, we consider not including those modules since they are usually used as preprocessing (fft, torchaudio) or rarely used (special, linalg). For preprocessing, it maybe has been done by other modules or simply loads the preprocessed data, so we think it will be much fairer if we exclude those computation. And for those modules rarely used, we ignore them due to the time cost. If you think we should add some functions in them into account, feel free to [contact us](/challenge-slt2022/challenge_overview#Contact) or PR your formulas for those functions to [the profiling tool](https://github.com/B06901052/DeepSpeed/tree/superb-challenge). 

#### Params (number of Parameters)

- The total number of parameters in your upstream model using in any downstream task.

### Conclusion

The ranking metrics are the primary performance measures in this challenge and are designed to emphasize an upstream's universally usability. When two upstreams tie on the same rank, the scoring metrics take the tasks' variations and improvement difficulty into account to help the final decision. You can refer to the [public-set leaderboard](/leaderboard?subset=Public+Set&track=constrained) for the overall metrics calculation.

#### Reference points

If a task have multiple metrics, each metric is first tranformed into points or ranks as illustrated above. Then, points or ranks are first averaged in intra-task fashion before being averaged with other task.

Task|PR|SID|ER|ASR|QbE|ASV|SD|ST|SE|SE|SS
-|-|-|-|-|-|-|-|-|-|-|-
Metrics|PER|ACC|ACC|WER|MTWV|EER|DER|BLEU|PESQ|STOI|SS
FBANK|82.01|41.38|48.24|23.18|0.58|9.56|10.05|2.32|2.55|0.9364|9.234
SOTA|3.53|96.66|67.62|3.62|7.36|5.62|5.11|20.01|2.64|0.9418|10.45
`

export { challenge_overview, framework, upstream, submission, metrics }
// using String.raw to avoid escaping in latex expression
// to meet the parsing format, do things as below
// remove comment <!-- ...  -->
// replace ``` with ~~~ (code block)
// replace <strong> with ** 
// replace math block below $superb_{sp}$ as another ver. (origin ver. can't be render but the reason is unknown)