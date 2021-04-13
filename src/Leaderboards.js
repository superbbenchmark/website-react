import React from "react";
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { Typography, Box, Divider, Grid, Paper, Button } from '@material-ui/core';
import { green, red, yellow } from '@material-ui/core/colors';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AllInclusive from '@material-ui/icons/AllInclusive';

import Track from './Track';
import TimedGrow from './TimedGrow';
import AdaptiveLink from './AdaptiveLink';
import { capitalizeFirstLetter } from './Utilies';


const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 64,
  },
  trackTitle: {
    fontWeight: "bold",
    margin: theme.spacing(0, "auto", 2),
  }
}));


function TrackButton(props) {
  const classes = useStyles();
  const theme = useTheme();
  const match = useRouteMatch()
  const { name, Icon, color, rules, submissions } = props;
  const [hover, setHover] = React.useState(false);
  const TrackButtonCls = (!rules) && (!submissions) ? Box : AdaptiveLink;

  return (
    <TrackButtonCls link={`${match.url}/${name}`}>
      <Paper
        elevation={hover ? 6 : 2}
        onMouseOver={() => { setHover((prev) => (!prev)); }}
        onMouseOut={() => { setHover((prev) => (!prev)); }}
      >
        <Box padding={theme.spacing(3, 2)}>
          <Grid
            container
            direction="column"
            spacing={2}
            justify="center"
          >
            {
              [
                <Icon style={{ fontSize: 64, color: color }} />,
                <Typography color="textPrimary" variant="h5" className={classes.trackTitle}>
                  {capitalizeFirstLetter(name)}
                </Typography>,
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  justify="center"
                >
                  {
                    [["rules", !rules], ["compare", !submissions], ["leaderboard", !submissions]].map(([buttonName, disabled]) => (
                      <Grid item>
                        <AdaptiveLink link={`${match.url}/${name}#${buttonName}`} disabled={disabled}>
                          <Button
                            size="small"
                            variant="outlined"
                            disabled={disabled}
                            style={{ color: disabled ? theme.palette.primary : color }}
                          >
                            {buttonName}
                          </Button>
                        </AdaptiveLink>
                      </Grid>
                    ))
                  }
                </Grid>,
              ].map((item) => <Grid item>{item}</Grid>)
            }
          </Grid>
        </Box>
      </Paper>
    </TrackButtonCls>
  )
}


export default function Leaderboards(props) {
  const classes = useStyles();
  const theme = useTheme();
  const match = useRouteMatch();

  const tracks = {
    fixed: {
      Icon: LockIcon,
      color: green[400],
      rules: "Universal Representation, some rule...",
      submissions: [
        {
          Method: "FBANK", Description: "classic feature", Parameters: 0, Stride: 10, Input: "waveform", Corpus: "-",
          PR: 82.01, KS: 8.63, IC: 9.10, SID: 8.5e-4, ER: 35.39, "ASR": 23.18, "ASR-LM": 15.21, QbE: 0.0058, "SF-F1": 69.64, "SF-CER": 52.94, SV: 9.56, SD: 10.05,
        },
        {
          Method: "PASE+", Description: "multi-task", Parameters: 7.83e+6, Stride: 10, Input: "waveform", Corpus: "LS 50 hr",
          PR: 58.88, KS: 82.37, IC: 30.29, SID: 35.84, ER: 57.64, "ASR": 24.92, "ASR-LM": 16.61, QbE: 7.0e-4, "SF-F1": 60.41, "SF-CER": 62.77, SV: 10.91, SD: 8.52,
        },
        {
          Method: "APC", Description: "F-G", Parameters: 4.11e+6, Stride: 10, Input: "FBANK", Corpus: "LS 360 hr",
          PR: 41.85, KS: 91.04, IC: 74.64, SID: 59.79, ER: 58.84, "ASR": 21.61, "ASR-LM": 15.09, QbE: 0.0268, "SF-F1": 71.26, "SF-CER": 50.76, SV: 8.81, SD: 10.72,
        },
        {
          Method: "VQ-APC", Description: "F-G + VQ", Parameters: 4.63e+6, Stride: 10, Input: "FBANK", Corpus: "LS 360 hr",
          PR: 42.86, KS: 90.52, IC: 70.52, SID: 49.57, ER: 58.31, "ASR": 21.72, "ASR-LM": 15.37, QbE: 0.0205, "SF-F1": 69.62, "SF-CER": 52.21, SV: 9.29, SD: 10.49,
        },
        {
          Method: "NPC", Description: "M-G + VQ", Parameters: 19.38e+6, Stride: 10, Input: "FBANK", Corpus: "LS 360 hr",
          PR: 52.67, KS: 88.54, IC: 64.04, SID: 50.77, ER: 59.55, "ASR": 20.94, "ASR-LM": 14.69, QbE: 0.0220, "SF-F1": 67.43, "SF-CER": 54.63, SV: 10.28, SD: 9.59,
        },
        {
          Method: "Mockingjay", Description: "time M-G", Parameters: 85.12e+6, Stride: 10, Input: "FBANK", Corpus: "LS 360 hr",
          PR: 80.01, KS: 82.67, IC: 28.87, SID: 34.50, ER: 45.72, "ASR": 23.72, "ASR-LM": 15.94, QbE: 3.1e-10, "SF-F1": 60.83, "SF-CER": 61.16, SV: 23.22, SD: 11.24,
        },
        {
          Method: "TERA", Description: "time/freq M-G", Parameters: 21.33e+6, Stride: 10, Input: "FBANK", Corpus: "LS 960 hr",
          PR: 47.53, KS: 88.09, IC: 48.8, SID: 58.67, ER: 54.76, "ASR": 18.45, "ASR-LM": 12.44, QbE: 8.7e-5, "SF-F1": 63.28, "SF-CER": 57.91, SV: 16.49, SD: 9.54,
        },
        {
          Method: "modified CPC", Description: "F-C", Parameters: 1.84e+6, Stride: 10, Input: "waveform", Corpus: "LL 60k hr",
          PR: 41.66, KS: 92.02, IC: 65.01, SID: 42.29, ER: 59.28, "ASR": 20.02, "ASR-LM": 13.57, QbE: 0.0061, "SF-F1": 74.18, "SF-CER": 46.66, SV: 9.67, SD: 11.00,
        },
        {
          Method: "wav2vec", Description: "F-C", Parameters: 32.54e+6, Stride: 10, Input: "waveform", Corpus: "LS 960 hr",
          PR: 32.39, KS: 94.09, IC: 78.91, SID: 44.88, ER: 58.17, "ASR": 16.40, "ASR-LM": 11.30, QbE: 0.0307, "SF-F1": 77.52, "SF-CER": 41.75, SV: 9.83, SD: 10.79,
        },
        {
          Method: "vq-wav2vec", Description: "F-C + VQ", Parameters: 34.15e+6, Stride: 10, Input: "waveform", Corpus: "LS 960 hr",
          PR: 53.49, KS: 92.28, IC: 59.4, SID: 39.04, ER: 55.89, "ASR": 18.70, "ASR-LM": 12.69, QbE: 0.0302, "SF-F1": 70.57, "SF-CER": 50.16, SV: 9.50, SD: 9.93,
        },
        {
          Method: "wav2vec 2.0", Description: "M-C + VQ", Parameters: 95.04e+6, Stride: 20, Input: "waveform", Corpus: "LS 960 hr",
          PR: 28.37, KS: 92.31, IC: 58.34, SID: 45.62, ER: 56.93, "ASR": 9.57, "ASR-LM": 6.32, QbE: 8.8e-4, "SF-F1": 79.94, "SF-CER": 37.81, SV: 9.69, SD: 7.48,
        },
        {
          Method: "HuBERT Base", Description: "M-P + VQ", Parameters: 94.68e+6, Stride: 20, Input: "waveform", Corpus: "LS 960 hr",
          PR: 6.85, KS: 95.98, IC: 95.94, SID: 64.84, ER: 62.94, "ASR": 6.74, "ASR-LM": 4.93, QbE: 0.0759, "SF-F1": 86.24, "SF-CER": 28.52, SV: 7.22, SD: 6.76,
        },
        {
          Method: "HuBERT Large", Description: "M-P + VQ", Parameters: 316.61e+6, Stride: 20, Input: "waveform", Corpus: "LL 60k hr",
          PR: 3.72, KS: 93.15, IC: 98.37, SID: 66.40, ER: 64.93, "ASR": 3.67, "ASR-LM": 2.91, QbE: 0.0360, "SF-F1": 88.68, "SF-CER": 23.05, SV: 7.70, SD: 6.23,
        },
      ]
    },
    constrained: {
      Icon: LockOpenIcon,
      color: yellow[700],
      rules: null,
      submissions: null,
    },
    unconstrained: {
      Icon: AllInclusive,
      color: red[500],
      rules: null,
      submissions: null,
    },
  }

  return (
    <Switch>
      <Route path={`${match.path}`} exact>
        <TimedGrow interval={0}>
          <Box margin={theme.spacing(4, "auto")}>
            <Box margin={theme.spacing(2, "auto")}>
              <Typography color="textPrimary" variant="h4">Leaderboards</Typography>
            </Box>
            <Divider />
          </Box>
        </TimedGrow>
        <Grid
          container
          direction="row"
          spacing={5}
          justify="center"
        >
          {
            Object.keys(tracks).map((track, index) => {
              return (
                <React.Fragment>
                  <TimedGrow interval={100 * (index + 1)}>
                    <Grid item xs={12} sm={6} md={4}>
                      <TrackButton name={track} {...tracks[track]} />
                    </Grid>
                  </TimedGrow>
                </React.Fragment>
              )
            })
          }
        </Grid>
      </Route>
      <Route path={`${match.path}/:urlTrack`}>
        <Track infos={tracks} />
      </Route>
    </Switch>
  )
}