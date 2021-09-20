import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { HashLink } from 'react-router-hash-link';

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
    hidden_states = results.get(task, "hidden_states")
    assert isinstance(hidden_states, list)

    for state in hidden_states:
        assert isinstance(state, torch.Tensor)
        assert state.dim() == 3, "(batch_size, max_sequence_length_of_batch, hidden_size)"
        assert state.shape == hidden_states[0].shape`

const code4 = `\
SAMPLE_RATE = 16000
MSEC_PER_SEC = 1000
downsample_rate = SAMPLE_RATE * 10 / MSEC_PER_SEC  # 160`

const code5 = `\
for task in tasks:
    assert isinstance(task, str)
    downsample_rate = upstream.get_downsample_rate(task)
    assert isinstance(downsample_rate, int)
    print("The upstream's representation for {task}"
        f" has the downsample rate of {downsample_rate}.")`

const policy = (
    <div id="doc" class="markdown-body container-fluid comment-enabled" data-hard-breaks="true" align='left'>
        <h1 id="SUPERB-Challenge" data-id="SUPERB-Challenge"><span>SUPERB Challenge</span></h1>
        <h2 id="Evaluation-Framework" data-id="Evaluation-Framework"><span>Evaluation Framework</span></h2>
        <h3 id="Background" data-id="Background"><span>Background</span></h3>
        <p><img src="https://i.imgur.com/LMN9902.png" alt="" loading="lazy" /><br />
            <em><span>Fig 1.</span></em>
        </p>
        <p><span>SUPERB Challenge follows the similar evaluation framework introduced in </span><a
            href="https://arxiv.org/abs/2105.01051" target="_blank" rel="noopener"><span>SUPERB
                Benchmark</span></a><span>, which benchmarks the
            </span><strong><span> generalizability</span></strong><span> of Self-Supervised Learning (SSL) on speech. SSL
                models are termed </span><strong><span> Upstream</span></strong><span> and are evaluated with various
            </span><strong><span> Downstream</span></strong><span> tasks. The framework extract </span><strong><span> multiple
                frozen hidden states</span></strong><span> from a single upstream model and trains a learnable
            </span><strong><span> weighted-sum</span></strong><span> over the hidden states along with the downstream model
                task-by-task.</span></p>
        <h3 id="Overview" data-id="Overview"><span>Overview</span></h3>
        <p><img src="https://i.imgur.com/n7Ib3Xe.png" alt="" loading="lazy" /><br />
            <em><span>Fig 2.</span></em>
        </p>
        <p><span>Fig 2. illustrates the evaluation framework of the challenge. The challenge evaluates SSL models’
            generalizability on 10 tasks. Each of the tasks has a corresponding public dataset
            (</span><strong><span>public-set</span></strong><span>) that is publicly available, and a hidden dataset
                (</span><strong><span>hidden-set</span></strong><span>) that will not be released. Participants can practice
                    on the public-set to understand the performance of their upstream models, and choose the best one for
                    submission as they wish. Then, participants </span><strong><span> submit the upstream
                        model</span></strong><span> (model definition &amp; pre-trained weights) publicly or privately to the
                            hidden-set leaderboard. </span><strong><span> We finetune the downstream models on the
                                hidden-set</span></strong><span> without releasing any audio/label. Both public-set and hidden-set have
                                    leaderboards and welcome submissions to share more results with the community. </span><strong><span> The
                                        winners of the challenge will be solely determined by the ranking on the hidden-set
                                        leaderboard.</span></strong><span> Finally, there will be </span><strong><span> overall
                                            metrics</span></strong><span> for ranking all upstreams.</span></p>
        <p><span>All the participants are encouraged to submit papers to </span><a href="https://aaai-sas-2022.github.io/"
            target="_blank" rel="noopener"><em><span>AAAI workshop: The 2nd Self-supervised Learning for Audio and
                Speech Processing</span></em></a><span>. The winners of the challenge will be invited to present
                    their methods in the workshop. We plan to collaborate with more conferences for participants to present
                    their works and papers.</span></p>
        <h3 id="Tasks" data-id="Tasks"><span>Tasks</span></h3>
        <p><span>10 evaluation tasks are included in this challenge:</span></p>
        <ul>
            <li><strong><span> Content</span></strong>
                <ul>
                    <li><span>Phoneme Recognition (PR)</span></li>
                    <li><span>Automatic Speech Recognition (ASR)</span></li>
                    <li><span>Query-by-example Spoken Term Detection (QbE)</span></li>
                </ul>
            </li>
            <li><strong><span> Speaker</span></strong>
                <ul>
                    <li><span>Speaker Identification (SID)</span></li>
                    <li><span>Automatic Speaker Verification (ASV)</span></li>
                    <li><span>Speaker Diarization (SD)</span></li>
                </ul>
            </li>
            <li><strong><span> Paralinguistics</span></strong>
                <ul>
                    <li><span>Emotion Recognition (ER)</span></li>
                </ul>
            </li>
            <li><strong><span> Semantics</span></strong>
                <ul>
                    <li><span>Speech Translation (ST)</span></li>
                </ul>
            </li>
            <li><strong><span> Generation</span></strong>
                <ul>
                    <li><span>Speech Enhancement (SE)</span></li>
                    <li><span>Speech Separation (SS)</span></li>
                </ul>
            </li>
        </ul>
        <p><span>More task descriptions for the public-set can be found in </span><HashLink to="/tasks#top">TASKS</HashLink><span>, and we
            implement the evaluation scripts for public-set in </span><a href="https://github.com/s3prl/s3prl"
                target="_blank" rel="noopener"><span>S3PRL</span></a><span> for reference. The task design and evaluation
                    pipeline will be the same between public-set &amp; hidden-set unless otherwise mentioned.</span></p>
        <h3 id="Secret-tasks" data-id="Secret-tasks"><span>Secret tasks</span></h3>
        <p><span>Secret tasks evaluate SSL models’ generalizability on completely unseen tasks. Secret tasks are only
            present in the hidden-set, and the task design will not be revealed until the final winner
            announcement.</span></p>
        <h3 id="What-is-new" data-id="What-is-new"><span>What is new</span></h3>
        <p><span>Compared with SUPERB Benchmark, SUPERB Challenge extends the framework with the following:</span></p>
        <ul>
            <li><strong><span> New Tasks</span></strong><span>: Speech Translation, Speech Enhancement, Source Separation and
                secret tasks.</span></li>
            <li><strong><span> New Data Domains</span></strong><span>: A challenging and newly recorded hidden-set with
                unseen (to upstream) text/audio domain.</span></li>
            <li><strong><span> New Overall Metrics</span></strong><span>: The metrics to rank upstreams.</span></li>
        </ul>
        <h2 id="Upstream-Specification" data-id="Upstream-Specification"><span>Upstream Specification</span></h2>
        <h3 id="Unlabeled-data-only-Focus-on-SSL" data-id="Unlabeled-data-only-Focus-on-SSL"><span>Unlabeled data only:
            Focus on SSL</span></h3>
        <ul>
            <li><span>Any labeled/parallel data made by human annotators are </span><strong><span> not
                allowed</span></strong><span> to used for both model training and data preprocessing, e.g.</span>
                <ul>
                    <li><strong><span> audio/text pairs:</span></strong><span> transcriptions in English, foreign languages,
                        or phonemes.</span></li>
                    <li><strong><span> audio/tagging pairs:</span></strong><span> speaker labels or sound event
                        labels.</span></li>
                    <li><strong><span> audio/audio pairs:</span></strong><span> audios with the same properties made parallel by human, e.g. audios with same content from different speakers, or the opposite.</span></li>
                </ul>
            </li>
            <li><span>Any system pre-trained by labeled/parallel data </span><strong><span> cannot</span></strong><span> be
                used to help with the SSL pre-training, like pre-trained ASR.</span></li>
            <li><span>Any unlabeled/unparallel data is allowed, including the downstream datasets in the public-set. The
                nature alignments (not made by human annotators) bettwen audio and other modalities are also allowed,
                e.g. videos.</span></li>
            <li><span>If it is hard to define whether your data is labeled/parallel, please </span><a
                href="#Contact"><span>contact us</span></a><span>!</span></li>
        </ul>
        <h3 id="Programming-Language" data-id="Programming-Language"><span>Programming Language</span></h3>
        <ul>
            <li>
                <p><span>We currently support:</span></p>
                <ul>
                    <li><strong><span> Python &gt;= 3.6</span></strong></li>
                    <li><strong><span> Pytorch &gt;= 1.7</span></strong></li>
                </ul>
            </li>
            <li>
                <p><span>We expect the upstream submission can pass the following check:</span></p>
                <pre>
                    <SyntaxHighlighter style={codeStyle} showLineNumbers={true}>
                        {code1}
                    </SyntaxHighlighter>
                </pre>
            </li>
        </ul>
        <p><span>Please </span><a href="#Contact"><span>contact us</span></a><span> if you wish to use other language or
            framework.</span></p>
        <h3 id="Interface-functions" data-id="Interface-functions"><span>Interface functions</span></h3>
        <h4 id="forward" data-id="forward"><span>forward</span></h4>
        <p><span>Extract features from waveforms.</span></p>
        <ul>
            <li>
                <p><strong><span> Input:</span></strong><span> A list of waveforms in 16000 Hz</span></p>
                <pre>
                    <SyntaxHighlighter style={codeStyle} showLineNumbers={true}>
                        {code2}
                    </SyntaxHighlighter>
                </pre>
            </li>
            <li>
                <p><strong><span> Output:</span></strong><span> A dictionary with a key for each task, and a single key for
                    all secret tasks. If any task-specific key is not presented, a “hidden_states” key should be
                    provided as the default key. The value for each key is </span><strong><span> a
                        list</span></strong><span> of padded sequences in the same shape of
                    </span><strong><span> (batch_size, max_sequence_length_of_batch, hidden_size)</span></strong><span> for
                        weighted-sum to work. It is welcomed to perform some preprocessing on the upstream’s raw
                        hidden-sets, including upsampling and downsampling. However, all the values must come from
                    </span><strong><span> a single upstream model</span></strong><span>:</span></p>
                <pre>
                    <SyntaxHighlighter style={codeStyle} showLineNumbers={true}>
                        {code3}
                    </SyntaxHighlighter>
                </pre>
            </li>
        </ul>
        <h4 id="get_downsample_rates" data-id="get_downsample_rates"><span>get_downsample_rates</span></h4>
        <p><span>Provide the downsample rate </span><strong><span> from 16000 Hz waveforms</span></strong><span> for each
            task’s representation in the dict. For the standard 10ms stride representation, the downsample rate is
            160.</span></p>
        <pre>
            <SyntaxHighlighter style={codeStyle} showLineNumbers={true}>
                {code4}
            </SyntaxHighlighter>
        </pre>
        <p><span>The downsample rate will be used to:</span></p>
        <ol>
            <li><span>Calculate the valid representation length of each utterance in the output padded
                representation.</span></li>
            <li><span>Prepare the training materials according to the representation’s downsample rate for frame-level
                tasks: SD, SE, SS.</span></li>
        </ol>
        <ul>
            <li><strong><span> Input:</span></strong><span> the task key (str)</span></li>
            <li><strong><span> Output:</span></strong><span> the downsample rate (int) of the representation for that
                task</span></li>
        </ul>
        <pre>
            <SyntaxHighlighter style={codeStyle} showLineNumbers={true}>
                {code5}
            </SyntaxHighlighter>
        </pre>
        <h4 data-id="" id=""></h4>
        <h2 id="Public-set-and-S3PRL-toolkit" data-id="Public-set-and-S3PRL-toolkit"><span>Public-set and S3PRL
            toolkit</span></h2>
        <h3 id="As-the-task-definition-and-demonstration" data-id="As-the-task-definition-and-demonstration"><span>As the
            task definition and demonstration</span></h3>
        <p><span>The public-set serves as the demonstration of the task design: including the data preprocessing, tasks’
            input/output formats and task-specific metrics. The datasets used in the public-set are all chosen to be
            public available for everyone to participate. Please refer to </span><HashLink to="/tasks#top">TASKS</HashLink><span> and the
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
        <p><span>In this way, the public-set is still a good indicator of the hidden-set performance to some degree. We
            follow the same (unless mentioned otherwise) implementation in the public-set for the hidden-set, and hence
            encourage participants to use </span><a href="https://github.com/s3prl/s3prl" target="_blank"
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
            the training artifacts of the top baseline systems (e.g. wav2vec2, HuBERT) for participants to quickly
            compare with them. The artifacts include:</span></p>
        <ul>
            <li><span>Tensorboard logs</span></li>
            <li><span>Trained downstream weights (the best on public dev set)</span></li>
        </ul>
        <h3 id="Public-set-leaderboard-and-submission" data-id="Public-set-leaderboard-and-submission"><span>Public-set
            leaderboard and submission</span></h3>
        <p><span>The public-set leaderboard will be online and accept submissions on <strong>Sep 30, 2021</strong> and there is no deadline. Since all the train/dev/test splits are
            public available, </span><strong><span> the leaderboard accepts submissions with the inferenced prediction
                files on each task’s testing split</span></strong><span> which will be auto-generated if you follow the
                    benchmarking steps in </span><a href="https://github.com/s3prl/s3prl" target="_blank"
                        rel="noopener"><span>S3PRL</span></a><span>.</span></p>
        <h2 id="Hidden-set" data-id="Hidden-set"><span>Hidden-set</span></h2>
        <h3 id="Fairness-amp-prevent-overfitting" data-id="Fairness-amp-prevent-overfitting"><span>Fairness &amp; prevent
            overfitting</span></h3>
        <p><span>Since all the train/dev/test splits are public in the public-set, it is possible to cheat by directly
            reporting the best results on the testing split, and the results are thus overfit on the testing split.
            Hence, the hidden-set is collected and prepared to follow the same task design as that in the public-set but
            with the newly created data. All the splits will </span><strong><span> NOT be released in both audio and
                labels</span></strong><span>. The members involved in the hidden-set preparation should
            </span><strong><span>  NOT</span></strong><span> participate the challenge. These members are listed in the
            </span><strong><span>  Hidden-set Committee</span></strong><span> below.</span></p>
        <h3 id="Hidden-set-leaderboard-and-submission" data-id="Hidden-set-leaderboard-and-submission"><span>Hidden-set
            leaderboard and submission</span></h3>
        <h4 id="How-to-submit" data-id="How-to-submit"><span>How to submit</span></h4>
        <p><span>The hidden-set leaderboard will be online and ready for submissions on </span><strong><span> Oct 15,
            2021</span></strong><span>. It will accept submissions until </span><strong><span> Jan 10,
                2022</span></strong><span>. The detailed submission steps will be announced on </span><strong><span> Oct
                    15, 2021</span></strong><span>. The following describes the conceptual pipeline.</span></p>
        <h4 id="Submission-type" data-id="Submission-type"><span>Submission type</span></h4>
        <p><span>The leaderboard accepts </span><strong><span> submissions with the upstream model
            only</span></strong><span>, including </span><strong><span>  model definition</span></strong><span> and
            </span><strong><span>  pre-trained weights</span></strong><span>. The upstream model should follow the
                specification detailed at </span><a href="#Upstream-Specification"><span>Upstream
                    Specification</span></a><span>. The submission can be done publicly or privately. Only the
            </span><strong><span>  Hidden-set Committee</span></strong><span> members can access the privately submitted
                upstreams and the models will be used solely for this challenge.</span></p>
        <h4 id="Finetuning-on-submission" data-id="Finetuning-on-submission"><span>Finetuning on submission</span></h4>
        <p><span>After the upstream model is submitted, we </span><strong><span> benchmark the submitted upstream by
            finetuning each task’s downstream model for participants</span></strong><span>. </span><strong><span> The
                quota for submissions per week is limited</span></strong><span> but will be dynamically adjusted based
                    on the number of participants. The weekly quota will be announced at </span><HashLink to="/news#top">NEWS</HashLink><span>.
                        Participants can </span><a href="#Contact"><span>contact us</span></a><span> to acquire the finetuning
                            artifacts of their own submissions for sanity checks, including:</span></p>
        <ul>
            <li><span>Tensorboard logs</span></li>
            <li><span>Testing results</span></li>
            <li><span>Trained downstream weights</span></li>
        </ul>
        <h4 id="Practice-dev--Private-test-scores" data-id="Practice-dev--Private-test-scores"><span>Practice (dev) /
            Private (test) scores</span></h4>
        <p><span>After training the downstream model for all tasks, we show the best performance on the hidden-set’s
            development splits as the </span><strong><span> practice scores</span></strong><span> (one score per task).
                The true performance on the testing splits, termed </span><strong><span> private
                    scores</span></strong><span>, will be revealed along with the final winner announcement. The final team
                        ranking will depend only on the hidden-set’s </span><strong><span> private
                            scores</span></strong><span>.</span></p>
        <h2 id="Overall-Metrics" data-id="Overall-Metrics"><span>Overall Metrics</span></h2>
        <p><span>The overall metrics will be announced on </span><strong><span> Sep 30, 2021</span></strong><span>. There
            will be parameter-agnostic metrics and parameter-panelized metrics. </span><strong><span> Parameter-agnostic
                metrics</span></strong><span> demonstrate the best performance SSL can achieve, and encourages
                    participants to explore any possibility to push the limits. </span><strong><span> Parameter-panelized
                        metrics</span></strong><span> encourage the development of SSL algorithms on small models, where
                            participants can focus more on the learning algorithm solely including SSL objectives, model architectures
                            and pre-training data. </span><strong><span> Both types of metrics will be used to rank all submissions and
                                produce multiple lists of winners</span></strong><span>.</span></p>
        <h4 id="Note-1" data-id="Note-1"><span>Note 1.</span></h4>
        <p><span>We do not divide submissions into different tracks. All submissions need to provide their pre-training
            parameter size and we compute all metrics for the submission. Hence, the winners for different metrics might
            overlap.</span></p>
        <h2 id="Winner-Minimum-Requirements" data-id="Winner-Minimum-Requirements"><span>Winner Minimum Requirements</span>
        </h2>
        <p><span>The following describes the minimum requirements for a team to win the challenge.</span></p>
        <h3 id="Submit-an-upstream-model-to-the-hidden-set-leaderboard"
            data-id="Submit-an-upstream-model-to-the-hidden-set-leaderboard"><span>Submit an upstream model to the
                hidden-set leaderboard</span></h3>
        <p><span>The public-set is for the upstream development purpose. You can pre-train your upstream and evaluate it
            with any method you like. You are required to submit at least one upstream model to the hidden-set
            leaderboard. The hidden-set leaderboard submission deadline is </span><strong><span> Jan 10,
                2022</span></strong><span>.</span></p>
        <h3 id="Submission-selection" data-id="Submission-selection"><span>Submission selection</span></h3>
        <p><span>A team can </span><strong><span> select at most 2 submissions</span></strong><span> among its previous
            submissions for the final team ranking: one for the parameter-agnostic metrics and another for the
            parameter-panelized metrics. However, these 2 submissions </span><strong><span> must come from the same
                method</span></strong><span> and only differ in parameter size. The deadline for the submission
                    selection is </span><strong><span> Jan 13, 2022</span></strong><span>.</span></p>
        <h3 id="System-description-paper" data-id="System-description-paper"><span>System description paper</span></h3>
        <p><span>To verify the submitted upstream follows the challenge policy, we require each team to submit a system
            description paper in </span><strong><span> AAAI submission format</span></strong><span> without the page
                limit. The paper should describe the method </span><strong><span> for the selected
                    submissions</span></strong><span>, containing at least the following materials:</span></p>
        <ul>
            <li><span>SSL objectives</span></li>
            <li><span>Model architecture</span></li>
            <li><span>Pre-training data</span></li>
            <li><span>Parameter size for each submission</span></li>
        </ul>
        <p><span>Since all the selected submissions come from the same method, the above materials should be almost
            identical between submissions except for the parameter size.</span></p>
        <p><span>The submission should follow the challenge policy and the paper is expected to be well-written. The
            deadline for the system description paper is </span><strong><span> Jan 13, 2022</span></strong><span>.</span>
        </p>
        <h4 id="Note-11" data-id="Note-1"><span>Note 1.</span></h4>
        <p><span>The system description paper is for the challenge review only and is not considered as our AAAI workshop
            paper by default, since the </span><a href="https://aaai.org/Conferences/AAAI-22/ws22call/" target="_blank"
                rel="noopener"><span>AAAI workshop has the early hard deadlines</span></a><span> for both paper submission
                    (</span><strong><span>Nov 12, 2021</span></strong><span>) and acceptance/rejection announcement
                        (</span><strong><span>Dec 3, 2021</span></strong><span>). Hence, </span><strong><span> we encourage
                            participants to submit their methods’ papers early to our AAAI workshop</span></strong><span> before Nov
                                12, 2021. If the method turns out to be similar to that used for the final selected submissions, the same
                                paper can be used as the system description paper.</span></p>
        <h4 id="Note-2" data-id="Note-2"><span>Note 2.</span></h4>
        <p><span>We plan to work with other conferences and offer presentation &amp; paper submission opportunities.</span>
        </p>
        <h2 id="Winner-Announcement-and-Presentation" data-id="Winner-Announcement-and-Presentation"><span>Winner
            Announcement and Presentation</span></h2>
        <p><span>After review the system description papers and compare their performance with the hidden-set
        </span><strong><span> private scores</span></strong><span>. We will reveal all the private scores and announce
            the final winners on </span><strong><span> January 20, 2022</span></strong><span>. The winners will be
                invited to present their methods in our AAAI workshop.</span></p>
        <h2 id="Timeline" data-id="Timeline"><span>Timeline</span></h2>
        <ul>
            <li><span>Sep 18, 2021: Challenge announcement &amp; </span><a
                    href="https://github.com/s3prl/s3prl" target="_blank" rel="noopener"><span>S3PRL</span></a><span> released</span></li>
            <li><span>Sep 30, 2021: Overall metrics announcement &amp; </span>
                <a href="https://superbbenchmark.org/leaderboard"
                    target="_blank" rel="noopener"><span>public-set leaderboard</span>
                </a>
                <span> is online and accepts submissions</span></li>
            <li><span>Oct 15, 2021: Hidden-set leaderboard is online and accepts submissions</span></li>
            <li><span>Nov 12, 2021: </span><a href="https://aaai-sas-2022.github.io/" target="_blank"
                rel="noopener"><span>AAAI workshop</span></a><span> paper submission deadline (encouraged)</span></li>
            <li><span>Dec 3, 2021: </span><a href="https://aaai-sas-2022.github.io/" target="_blank"
                rel="noopener"><span>AAAI workshop</span></a><span> paper acceptance / rejection announcement</span>
            </li>
            <li><span>Jan 10, 2022: Hidden-set leaderboard submission deadline</span></li>
            <li><span>Jan 13, 2022: Submission selection &amp; system description paper deadline</span></li>
            <li><span>Jan 20, 2022: Winner announcement &amp; reveal hidden-set private scores</span></li>
            <li><span>Jan 22, 2022: AAAI late </span><a href="https://aaai.org/Conferences/AAAI-21/registration/"
                target="_blank" rel="noopener"><span>registration</span></a><span> deadline</span></li>
            <li><span>Feb 28 - Mar 1, 2022: </span><a href="https://aaai-sas-2022.github.io/" target="_blank"
                rel="noopener"><span>AAAI workshop</span></a><span> presentation</span></li>
        </ul>
        <h2 id="Organizers" data-id="Organizers"><span>Organizers</span></h2>
        <p><span>Hung-yi Lee</span><br />
            <span>Shinji Watanabe</span><br />
            <span>Abdelrahman Mohamed</span><br />
            <span>Shang-Wen Li</span><br />
            <span>Shuyan Dong</span><br />
            <span>Heng-Jui Chang</span><br />
            <span>Hsuan-Jui Chen</span><br />
            <span>Po-Han Chi</span><br />
            <span>Xuankai Chang</span><br />
            <span>Yung-Sung Chuang</span><br />
            <span>Tzu-Hsun Feng</span><br />
            <span>Tzu-Hsien Huang</span><br />
            <span>Wen-Chin Huang</span><br />
            <span>Zili Huang</span><br />
            <span>Andy T. Liu</span><br />
            <span>Cheng-I Jeff Lai</span><br />
            <span>Guan-Ting Lin</span><br />
            <span>Kushal Lakhotia</span><br />
            <span>Yist Y. Lin</span><br />
            <span>Yassin Omar</span><br />
            <span>Jiatong Shi</span><br />
            <span>Hsiang-Sheng Tsai</span><br />
            <span>Lewis Tunstall</span><br />
            <span>Wei-Cheng Tseng</span><br />
            <span>Shu-wen Yang</span>
        </p>
        <h2 id="Hidden-set-Committee" data-id="Hidden-set-Committee"><span>Hidden-set Committee</span></h2>
        <p><span>Xuankai Chang</span><br />
            <span>Hsuan-Jui Chen</span><br />
            <span>Yung-Sung Chuang</span><br />
            <span>Zili Huang</span><br />
            <span>Shang-Wen Li</span><br />
            <span>Guan-Ting Lin</span><br />
            <span>Yassin Omar</span><br />
            <span>Jiatong Shi</span><br />
            <span>Hsiang-Sheng Tsai</span><br />
            <span>Shu-wen Yang</span>
        </p>
        <h1 id="Contact" data-id="Contact"><span>Contact</span></h1>
        <p><a href="mailto:superb.announcement@gmail.com" target="_blank"
            rel="noopener"><span>superb.announcement@gmail.com</span></a></p>
    </div>
)

export default policy
