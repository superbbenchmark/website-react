import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { Box, Typography, Grid, Paper, Divider, Button } from '@material-ui/core';

import TimedGrow from './TimedGrow';
import AdaptiveLink from './AdaptiveLink';
import { capitalizeFirstLetter } from './Utilies';


const tasks = {
  recognition: [
    [
      "PR",
      "\
      Phoneme Recognition, PR transcribes an utterance into the smallest content units.\
      We include alignment modeling in the PR task to avoid the potential inaccurate forced alignment.\
      LibriSpeech train-clean-100/dev-clean/test-clean subsets are adopted in SUPERB for training/validation/testing.\
      Phoneme transcriptions are obtained from the LibriSpeech official g2p-model-5 and the conversion script in Kaldi librispeech s5 recipe.\
      The evaluation metric is phone error rate (PER).\
    "
    ],
    [
      "ASR",
      "\
      Automatic Speech Recognition, ASR transcribes utterances into words.\
      While PR analyzes the improvement in modeling phonetics, ASR reflects the significance of the improvement in a real-world scenario.\
      LibriSpeech train-clean-100/devclean/test-clean subsets are used for training/validation/testing.\
      The evaluation metric is word error rate (WER).\
    "
    ],
  ],
  detection: [
    [
      "KS",
      "\
          Keyword Spotting, KS detects preregistered keywords by classifying utterances into a predefined set of words.\
          The task is usually performed on-device for the fast response time.\
          Thus, accuracy, model size, and inference time are all crucial.\
          We choose the widely used Speech Commands dataset v1.0 for the task.\
          The dataset consists of ten classes of keywords, a class for silence, and an unknown class to include the false positive.\
          The evaluation metric is accuracy (ACC)\
        "
    ],
    [
      "QbE",
      "\
          Query by Example Spoken Term Detection, QbE detects a spoken term (query) in an audio database (documents) by \
          binary discriminating a given pair of query and document into a match or not.\
          The English subset in QUESST 2014 challenge is adopted since we focus on investigating English as the first step.\
          The evaluation metric is maximum term weighted value (MTWV) which balances misses and false alarms.\
        "
    ],
  ],
  semantic: [
    [
      "IC",
      "\
          Intent Classification, IC classifies utterances into predefined classes to determine the intent of speakers.\
          We use the Fluent Speech Commands dataset, where each utterance is tagged with three intent labels: action, object, and location.\
          The evaluation metric is accuracy (ACC).\
        "
    ],
    [
      "SF",
      "\
          Slot Filling, SF predicts a sequence of semantic slot-types from an utterance, \
          like a slot-type FromLocation for a spoken word Taipei, which is known as a slot-value.\
          Both slot-types and slot-values are essential for an SLU system to function.\
          The evaluation metrics thus include slot-type F1 score and slotvalue CER.\
          Audio SNIPS is adopted, which synthesized multi-speaker utterances for SNIPS.\
          Following the standard split in SNIPS, US-accent speakers are further selected for training, and others are for validation/testing.\
        "
    ],
  ],
  speaker: [
    [
      "SID",
      "\
          Speaker Identification, SID classifies each utterance for its speaker identity as a multi-class classification, \
          where speakers are in the same predefined set for both training and testing.\
          The widely used VoxCeleb1 [26] is adopted, and the evaluation metric is accuracy (ACC).\
        "
    ],
    [
      "SV",
      "\
          Automatic Speaker Verification, ASV verifies whether the speakers of a pair of utterances match as a binary classification, \
          and speakers in the testing set may not appear in the training set.\
          Thus, ASV is more challenging than SID. VoxCeleb1 is used without VoxCeleb2 training data and noise augmentation. \
          The evaluation metric is equal error rate (EER).\
        "
    ],
    [
      "SD",
      "\
          Speaker Diarization, SD predicts who is speaking when for each timestamp, and multiple speakers can speak simultaneously.\
          The model has to encode rich speaker characteristics for each frame and should be able to represent mixtures of signals.\
          LibriMix is adopted where LibriSpeech train-clean-100/dev-clean/test-clean are used to generate mixtures for training/validation/testing.\
          We focus on the two-speaker scenario as the first step.\
          The time-coded speaker labels were generated using alignments from Kaldi LibriSpeech ASR model.\
          The evaluation metric is diarization error rate (DER).\
        "
    ],
  ],
  paralinguistics: [
    [
      "ER",
      "\
          Emotion Recognition, ER predicts an emotion class for each utterance.\
          The most widely used ER dataset IEMOCAP is adopted, and we follow the conventional evaluation protocol:\
          we drop the unbalance emotion classes to leave the final four classes with a similar amount of data points and \
          cross-validates on five folds of the standard splits.\
          The evaluation metric is accuracy (ACC).\
        "
    ],
  ]
}


const useStyles = makeStyles((theme) => ({
  taskName: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
}));




function Tasks(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box margin={theme.spacing(6, "auto")}>
      <TimedGrow interval={0}>
        <Box margin={theme.spacing(4, "auto")}>
          <Box margin={theme.spacing(2, "auto")}>
            <Typography color="textPrimary" variant="h4">{capitalizeFirstLetter("domains")}</Typography>
          </Box>
          <Divider />
        </Box>
      </TimedGrow>
      <Grid
        container
        direction="row"
        spacing={2}
        justify="center"
      >
        {
          Object.keys(tasks).map((domain, index) => (
            <TimedGrow interval={100 * index}>
              <Grid item>
                <AdaptiveLink link={`/tasks#${domain}`}>
                  <Button variant="outlined">
                    {capitalizeFirstLetter(domain)}
                  </Button>
                </AdaptiveLink>
              </Grid>
            </TimedGrow>
          ))
        }
      </Grid>
      {
        Object.keys(tasks).map((domain, domainIndex) => {
          var startTime = (domainIndex + 1) * 400;
          return (
            <Box margin={theme.spacing(6, "auto", 8)}>
              <Box id={domain} position="relative" top={theme.spacing(-4)} visibility="hidden"></Box>
              <TimedGrow interval={startTime}>
                <Box margin={theme.spacing(4, "auto")}>
                  <Box margin={theme.spacing(2, "auto")}>
                    <Typography color="textPrimary" variant="h4">{capitalizeFirstLetter(domain)}</Typography>
                  </Box>
                  <Divider />
                </Box>
              </TimedGrow>
              <Grid
                container
                spacing={5}
                justify="center"
              >
                {
                  tasks[domain].map(([name, description], inDomainIndex) => {
                    return (
                      <React.Fragment>
                        <TimedGrow interval={startTime + 100 * (inDomainIndex + 1)}>
                          <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3}>
                              <Box padding={theme.spacing(3, 2)}>
                                <Typography color="textPrimary" variant="h6" className={classes.taskName}>
                                  {`${name}`}
                                </Typography>
                                <Typography color="textSecondary" variant="body2">
                                  {description}
                                </Typography>
                              </Box>
                            </Paper>
                          </Grid>
                        </TimedGrow>
                      </React.Fragment>
                    )
                  })
                }
              </Grid>
            </Box>
          )
        })
      }
    </Box>
  )
}

export default Tasks;
