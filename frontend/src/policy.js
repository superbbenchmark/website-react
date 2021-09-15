import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const code1 = `\
upstream = YourModel.cuda()
assert isinstance(upstream, torch.nn.Module)`

const code2 = `\
SAMPLE_RATE = 16000
BATCH_SIZE = 8
EXAMPLE_SEC = 10
wavs = [torch.randn(SAMPLE_RATE * EXAMPLE_SEC).cuda() for _ in range(BATCH_SIZE)]
results = upstream(wavs)`

const code3 = `\
assert isinstance(results, dict)
tasks = ["PR", "SID", "ER", "ASR", "ASV", "SD", "QbE", "ST", "SS", "SE", "secret"]
for task in tasks:
    assert task in results
    hidden_states = results[task]
    assert isinstance(hidden_states, list)

    for state in hidden_states:
        assert isinstance(state, torch.Tensor)
        assert state.shape == hidden_states[0].shape`

const policy = (
    <div id="doc" class="markdown-body container-fluid comment-inner comment-enabled" data-hard-breaks="true" align="left">
        <h1 id="SUPERB-Challenge" data-id="SUPERB-Challenge"><span>SUPERB Challenge</span></h1>
        <h2 id="Evaluation-Framework" data-id="Evaluation-Framework"><span>Evaluation Framework</span></h2>
        <h3 id="Background" data-id="Background"><span>Background</span></h3>
        <p><img src="https://i.imgur.com/LMN9902.png" alt="" loading="lazy" /><br />
            <em><span>Fig 1.</span></em>
        </p>
        <p><span>SUPERB Challenge follow the similar evaluation framework introduced in </span><a
            href="https://arxiv.org/abs/2105.01051" target="_blank" rel="noopener"><span>SUPERB
                Benchmark</span></a><span>, which benchmarks the
            </span><strong><span>generalizibility</span></strong><span> of Self-Supervised Learning (SSL) on speech. SSL
                models are termed </span><strong><span>Upstream</span></strong><span> and are evaluated with lots of
            </span><strong><span>Downstream</span></strong><span> tasks. The framework extract </span><strong><span>multiple
                frozen hidden states</span></strong><span> from a single upstream model and trains the
            </span><strong><span>weighted-sum</span></strong><span> along with the downstream model task-by-task.</span></p>
        <h3 id="Overview" data-id="Overview"><span>Overview</span></h3>
        <p><img src="https://i.imgur.com/lbwSBAt.png" alt="" loading="lazy" /><br />
            <em><span>Fig 2.</span></em>
        </p>
        <p><span>Fig 2. illustrates the entire challenge. The challenge evaluates SSL models’ generalizibility under
        </span><strong><span>10 tasks</span></strong><span>, where all of them have the public available datasets
            (</span><strong><span>public-set</span></strong><span>) and the hidden datasets which will not be released
                (</span><strong><span>hidden-set</span></strong><span>). The participants can know their upstreams’
                    performance by practicing on the public-set, and choose the best upstream model for submission as they wish.
                    Then, the participants </span><strong><span>submit the upstream model</span></strong><span> (model
                        definition &amp; pre-trained weights) either </span><strong><span>publicly</span></strong><span> or
            </span><strong><span>privately</span></strong><span> to the hidden-set leaderboard, where
            </span><strong><span>we finetune the downstream model</span></strong><span> for participants without releasing
                any audio/label. Both public-set and hidden-set have leaderboards and welcome submissions to share more
                results with the community. </span><strong><span>The winners of the challenge will be solely determined by
                    the ranking on the hidden-set leaderbard.</span></strong><span> Last but not least, there will be
            </span><strong><span>overall metrics</span></strong><span> for ranking all upstreams.</span></p>
        <h3 id="Tasks" data-id="Tasks"><span>Tasks</span></h3>
        <p><span>10 evaluation tasks are included in this challenge:</span></p>
        <ul>
            <li><strong><span>Content</span></strong>
                <ul>
                    <li><span>Phoneme Recognition (PR)</span></li>
                    <li><span>Automatic Speech Recogntion (ASR)</span></li>
                    <li><span>Query-by-example Spoken Term Detection (QbE)</span></li>
                </ul>
            </li>
            <li><strong><span>Speaker</span></strong>
                <ul>
                    <li><span>Speaker Identification (SID)</span></li>
                    <li><span>Automatic Speaker Verification (ASV)</span></li>
                    <li><span>Speaker Diarization (SD)</span></li>
                </ul>
            </li>
            <li><strong><span>Paralinguistics</span></strong>
                <ul>
                    <li><span>Emotion Recognition (ER)</span></li>
                </ul>
            </li>
            <li><strong><span>Semantics</span></strong>
                <ul>
                    <li><span>Speech Translation (ST)</span></li>
                </ul>
            </li>
            <li><strong><span>Generation</span></strong>
                <ul>
                    <li><span>Speech Enhancement (SE)</span></li>
                    <li><span>Speech Separation (SS)</span></li>
                </ul>
            </li>
        </ul>
        <p><span>More task descriptions for the public-set can be found in </span><a
            href="https://superbbenchmark.org/tasks" target="_blank" rel="noopener"><span>TASKS</span></a><span>, and we
                implement the evaluation scripts for public-set in </span><a href="https://github.com/s3prl/s3prl"
                    target="_blank" rel="noopener"><span>S3PRL</span></a><span> for reference. The task design and evaluation
                        pipeline will be the same between public-set &amp; hidden-set unless mentioned otherwise.</span></p>
        <h3 id="Secret-tasks" data-id="Secret-tasks"><span>Secret tasks</span></h3>
        <p><span>There will be secret tasks only presented in the hidden-set, and the task design will not be revealed until
            the final winner announcement. The secret tasks evaluate SSL models’ generalizability on completely unseen
            tasks.</span></p>
        <h3 id="What-is-new" data-id="What-is-new"><span>What is new</span></h3>
        <p><span>Compared with SUPERB Benchmark, SUPERB Challenge extends the framework with the following:</span></p>
        <ul>
            <li><strong><span>New Tasks</span></strong><span>: Speech Translation, Speech Enhancement, Source Separation and
                secret tasks.</span></li>
            <li><strong><span>New Data Domains</span></strong><span>: A challenging and newly recorded hidden-set with
                unseen (to upstream) text/audio domain.</span></li>
            <li><strong><span>New Overall Metrics</span></strong><span>: The metrics to rank upstreams.</span></li>
        </ul>
        <h2 id="Upstream-Specification" data-id="Upstream-Specification"><span>Upstream Specification</span></h2>
        <h3 id="Unlabeled-data-only-Focus-on-SSL" data-id="Unlabeled-data-only-Focus-on-SSL"><span>Unlabeled data only:
            Focus on SSL</span></h3>
        <ul>
            <li><span>Any labeled/parallel data made by human annotators are not allowed, e.g. audio/text pairs, audio/tag
                pairs, audio/audio pairs… etc.</span></li>
            <li><span>Any system pre-trained by labeled/parallel data can not be used to help with the SSL pre-training,
                like pre-trained ASR.</span></li>
            <li><span>Any unlabeled/parallel data is allowed, including the downstream datasets in the public-set.</span>
            </li>
            <li><span>If it is hard to define whether your data is labeled/parallel, please </span><a href=""
                target="_blank" rel="noopener"><span>contact us</span></a><span>!</span></li>
        </ul>
        <h3 id="Programming-Language" data-id="Programming-Language"><span>Programming Language</span></h3>
        <ul>
            <li>
                <p><span>We currently support:</span></p>
                <ul>
                    <li><strong><span>Python &gt;= 3.6</span></strong></li>
                    <li><strong><span>Pytorch &gt;= 1.7</span></strong></li>
                </ul>
            </li>
            <li>
                <p><span>We expect the upstream submission can pass the following check:</span></p>
                <pre>
                    <SyntaxHighlighter language="python" style={atomOneDarkReasonable} showLineNumbers="ture">
                        {code1}
                    </SyntaxHighlighter>
                </pre>
            </li>
        </ul>
        <p><span>Please </span><a href="" target="_blank" rel="noopener"><span>contact us</span></a><span> if you wish to
            use other language or framework.</span></p>
        <h3 id="Input--Output-Format" data-id="Input--Output-Format"><span>Input / Output Format</span></h3>
        <h4 id="Input" data-id="Input"><span>Input</span></h4>
        <ul>
            <li>
                <p><span>A list of waveforms in 16000 Hz</span></p>
                <pre>
                    <SyntaxHighlighter language="python" style={atomOneDarkReasonable} showLineNumbers="ture">
                        {code2}
                    </SyntaxHighlighter>
                </pre>
            </li>
        </ul>
        <h5 id="Output" data-id="Output"><span>Output</span></h5>
        <ul>
            <li>
                <p><span>A dictionary with a key for a task, including a single key for all secret tasks. The value for each
                    key is </span><strong><span>a list</span></strong><span> of padded sequences in the same shape of
                    </span><strong><span>(batch_size, max_sequence_length_of_batch, hidden_size)</span></strong><span> for
                        weighted-sum to work. It is welcomed to perform some preprocessing on the upstream’s raw
                        hidden-sets, including upsampling and downsampling. However, all the values must come from
                    </span><strong><span>a single upstream model</span></strong><span>:</span></p>
                <pre>
                    <SyntaxHighlighter language="python" style={atomOneDarkReasonable} showLineNumbers="ture">
                        {code3}
                    </SyntaxHighlighter>
                </pre>
            </li>
            <li>
                <p><span>We assume the representation sequences are
                </span><strong><span>fixed-strided</span></strong><span>. That is, all the timestamps of a sequence
                    distribute evenly across the entire utterance. </span><strong><span>Also, please make your
                        upstream’s stride:</span></strong></p>
                <ul>
                    <li><span>Your stride is divisible by 10ms, eg. 20ms, 30ms</span></li>
                    <li><span>10ms is divisible by your stride, eg. 5ms</span></li>
                </ul>
            </li>
        </ul>
        <p><img src="https://i.imgur.com/UyMvDqc.png" alt="" loading="lazy" /></p>
        <h2 id="Public-set-and-S3PRL-toolkit" data-id="Public-set-and-S3PRL-toolkit"><span>Public-set and S3PRL
            toolkit</span></h2>
        <h3 id="As-the-task-definition-and-demontration" data-id="As-the-task-definition-and-demontration"><span>As the task
            definition and demontration</span></h3>
        <p><span>The public-set serves as the demontration of the task design: including the data preprocessing, tasks’
            input/output formats and task-specific metrics. The datasets used in the public-set are all chosen to be
            public available for everyone to participate. Please refer to </span><a
                href="https://superbbenchmark.org/tasks" target="_blank" rel="noopener"><span>TASKS</span></a><span> and the
                    implementation in </span><a href="https://github.com/s3prl/s3prl" target="_blank"
                        rel="noopener"><span>S3PRL</span></a><span> for details.</span></p>
        <h3 id="As-the-platform-for-developing-upstreams-for-the-hidden-set"
            data-id="As-the-platform-for-developing-upstreams-for-the-hidden-set"><span>As the platform for developing
                upstreams for the hidden-set</span></h3>
        <p><span>The differences between the public-set and the hidden-set are controlled to be only the following:</span>
        </p>
        <ol>
            <li><span>Recording conditions</span></li>
            <li><span>Spoken content / text scripts</span></li>
            <li><span>Speakers</span></li>
            <li><span>Fewer labeled data</span></li>
        </ol>
        <p><span>In this way, the public-set can still be a good indicator on the performance of the hidden-set to some
            degree. We follow the same (unless mentioned otherwise) implementation in the public-set for the hidden-set,
            and hence encourage participants to use </span><a href="https://github.com/s3prl/s3prl" target="_blank"
                rel="noopener"><span>S3PRL</span></a><span> to benchmark their upstream models (optional) on the public-set.
                    The winners of the challenge will be decided solely on the hidden-set, and the public-set and </span><a
                        href="https://github.com/s3prl/s3prl" target="_blank" rel="noopener"><span>S3PRL</span></a><span>
                implementations can serve as the start-kit.</span></p>
        <h3 id="Provide-baselines-for-comparison" data-id="Provide-baselines-for-comparison"><span>Provide baselines for
            comparison</span></h3>
        <h4 id="Baselines" data-id="Baselines"><span>Baselines</span></h4>
        <p><span>We collected most of the well-known SSL baseline models in </span><a href="https://github.com/s3prl/s3prl"
            target="_blank" rel="noopener"><span>S3PRL</span></a><span>, including TERA, wav2vec2, Hubert, DeCoAR 2.0,
                and more. You can easily benchmark different upstreams by specifying in the command line arguments.</span>
        </p>
        <h4 id="Comparison" data-id="Comparison"><span>Comparison</span></h4>
        <p><span>Since the full benchmarking on the public-set can take some time for the training to converge. We released
            the training artifacts of the top baseline systems (eg. wav2vec2, HuBERT) for participants to quickly
            compare with them. The artifacts include:</span></p>
        <ul>
            <li><span>Tensorboard logs</span></li>
            <li><span>Trained downstream weights</span></li>
        </ul>
        <h3 id="Public-set-leaderboard-and-submission" data-id="Public-set-leaderboard-and-submission"><span>Public-set
            leaderboard and submission</span></h3>
        <ul>
            <li><span>Leaderboard: </span><a href="https://superbbenchmark.org/leaderboard" target="_blank"
                rel="noopener"><span>https://superbbenchmark.org/leaderboard</span></a></li>
            <li><span>Submission steps: </span><a
                href="https://github.com/s3prl/s3prl/tree/master/s3prl/downstream#submission" target="_blank"
                rel="noopener"><span>https://github.com/s3prl/s3prl/tree/master/s3prl/downstream#submission</span></a>
            </li>
        </ul>
        <p><span>The public-set leaderboard is ready for submission. Since all the train/dev/test splits are public
            available, </span><strong><span>the leaderboard accepts submissions with the inferenced prediction files on
                each task’s testing split</span></strong><span> which will be auto-generated as long as you follow the
                    benchmarking steps in S3PRL.</span></p>
        <h2 id="Hidden-set" data-id="Hidden-set"><span>Hidden-set</span></h2>
        <h3 id="Fairness-amp-prevent-overfitting" data-id="Fairness-amp-prevent-overfitting"><span>Fairness &amp; prevent
            overfitting</span></h3>
        <p><span>Since all the train/dev/test splits are public in the public-set, it is possible to cheat by directly
            reporting the best results on the testing split, and results are thus overfit on the testing split. Hence,
            the hidden-set is collected and prepared to follow the same task design as that in the public-set but with
            the newly created data. All the splits will </span><strong><span>NOT be released in both audio and
                labels</span></strong><span>. The members involved in the hidden-set preparation should
            </span><strong><span>NOT</span></strong><span> participate the challenge. These members are listed in the
            </span><strong><span>Hidden-set Committee</span></strong><span> below.</span></p>
        <h3 id="Hidden-set-leaderboard-and-submission" data-id="Hidden-set-leaderboard-and-submission"><span>Hidden-set
            leaderboard and submission</span></h3>
        <h4 id="Submission-type" data-id="Submission-type"><span>Submission type</span></h4>
        <p><span>The leaderboard accept </span><strong><span>submissions with the upstream model only</span></strong><span>,
            including </span><strong><span>model definition</span></strong><span> and </span><strong><span>pre-trained
                weights</span></strong><span>. The submission can be done publicly or privately. Only the
            </span><strong><span>Hidden-set Committee</span></strong><span> members can access the privately submitted
                upstreams and the models will be used solely for this challenge.</span></p>
        <h4 id="Finetuning-on-submission" data-id="Finetuning-on-submission"><span>Finetuning on submission</span></h4>
        <p><span>After the upstream model is submitted, we </span><strong><span>benchmark the submitted upstream by
            finetuning each task’s downstream model for participants</span></strong><span>. </span><strong><span>The
                quota for submissions per week is limited</span></strong><span> but will be dynamically adjusted based
                    on the number of participants. The weekly quota will be announced at </span><a
                        href="https://superbbenchmark.org/news" target="_blank" rel="noopener"><span>NEWS</span></a><span>.
                            Participants can </span><a href="" target="_blank" rel="noopener"><span>contact us</span></a><span> to
                                acquire the finetuning artifacts of their own submissions for sanity checks, including:</span></p>
        <ul>
            <li><span>Tensorboard logs</span></li>
            <li><span>Testing results</span></li>
            <li><span>Trained downstream weights</span></li>
        </ul>
        <h4 id="Practice-dev--Private-test-scores" data-id="Practice-dev--Private-test-scores"><span>Practice (dev) /
            Private (test) scores</span></h4>
        <p><span>After training the downstream model for all tasks, we show the best performance on the hidden-set’s
            development splits as the </span><strong><span>practice scores</span></strong><span> (one score per task).
                The true performance on the testing splits, termed </span><strong><span>private
                    scores</span></strong><span>, will be revealed along with the final winner announcement. The final team
                        ranking will depend only on the hidden-set’s </span><strong><span>private
                            scores</span></strong><span>.</span></p>
        <h4 id="Hidden-set-submission-pipeline" data-id="Hidden-set-submission-pipeline"><span>Hidden-set submission
            pipeline</span></h4>
        <p><span>This section describes the pipeline of the hidden-set submission. We will release the detailed steps along
            with an online hidden-set leaderboard at </span><strong><span>Oct 15, 2021</span></strong><span>.</span></p>
        <h2 id="Overal-Metrics-and-Ranking" data-id="Overal-Metrics-and-Ranking"><span>Overal Metrics and Ranking</span>
        </h2>
        <p><span>The overall metrics will be announced at Sep 30, 2021. There will be parameter-agnostic metrics and
            parameter-panelized metrics. </span><strong><span>Parameter-agnostic metrics</span></strong><span>
                demonstate the best performance SSL can achieve, and encourages participants to explore any possibility to
                push the limits. </span><strong><span>Parameter-panelized metrics</span></strong><span> focus on the SSL
                    learning strategies, including objectives, model architectures and pre-training data by factoring out the
                    effects from the parameter size. Hence, it encourages participants to use small models to achieve good
                    performance. </span><strong><span>Two kinds of metrics will both be used to rank all submissions and produce
                        multiple lists of winners</span></strong><span>.</span></p>
        <h4 id="Note1" data-id="Note1"><span>Note1</span></h4>
        <p><span>We do not divide submissions into different tracks. All submissions need to provide their pre-training
            parameters and we compute all metrics for the submission. Hence, the winners for different metrics might
            overlap.</span></p>
        <h2 id="Winner-Announcement-and-Presentation" data-id="Winner-Announcement-and-Presentation"><span>Winner
            Announcement and Presentation</span></h2>
        <p><span>The winners will be announced at January 15, 2022 and are welcomed to present in AAAI workshop on February
            28 – March 1, 2022.</span></p>
        <h2 id="Timeline" data-id="Timeline"><span>Timeline</span></h2>
        <ul>
            <li><span>Sep 17, 2021: Challenge announcement / public-set server online</span></li>
            <li><span>Sep 30, 2021: Overall metrics announcement</span></li>
            <li><span>Oct 15, 2021: Hidden-set server is online and accepts submissions</span></li>
            <li><span>Jan 15, 2022: Winner announcement</span></li>
            <li><span>Feb 28 - Mar 1, 2022: AAAI workshop presentation</span></li>
        </ul>
        <h2 id="Committee-Members" data-id="Committee-Members"><span>Committee Members</span></h2>
        <h3 id="Organizers" data-id="Organizers"><span>Organizers</span></h3>
        <p><span>Hung-yi Lee, Shang-Wen Li, Shinji Watanabe, Abdelrahman Mohamed, Shuyan Dong</span></p>
        <h3 id="Hidden-set-Committee" data-id="Hidden-set-Committee"><span>Hidden-set Committee</span></h3>
        <p><span>Shang-Wen Li, Shu-wen Yang, Xiang-Sheng Cai, Xuan-Rui Chen, Jiatong Shi, Xuankai Chang, Zili Huang,
            Yung-Sung Chuang, Guan-Ting Lin</span></p>
        <h3 id="Members" data-id="Members"><span>Members</span></h3>
        <p><span>Po-Han Chi, Cheng-I Jeff Lai, Kushal Lakhotia, Yist Y. Lin, Andy T. Liu, Tzu-Hsien Huang, Wei-Cheng Tseng,
            Wen-Chin Huang, Heng-Jui Chang</span></p>
        <h1 id="Contact" data-id="Contact"><span>Contact</span></h1>
        <p><a href="mailto:superb.announcement@gmail.com" target="_blank"
            rel="noopener"><span>superb.announcement@gmail.com</span></a></p>
    </div>
)

export default policy
