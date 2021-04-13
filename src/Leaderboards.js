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
          PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3
        },
        {
          Method: "PASE+", Description: "multi-task", Parameters: 7.83e+6, Stride: 10, Input: "waveform", Corpus: "LS 50 hr",
          PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3
        },
        {
          Method: "APC", Description: "F-G", Parameters: 4.11e+6, Stride: 10, Input: "FBANK", Corpus: "LS 360 hr",
          PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3
        },
        {
          Method: "VQ-APC", Description: "F-G + VQ", Parameters: 4.63e+6, Stride: 10, Input: "FBANK", Corpus: "LS 360 hr",
          PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3
        },
        {
          Method: "NPC", Description: "M-G + VQ", Parameters: 19.38e+6, Stride: 10, Input: "FBANK", Corpus: "LS 360 hr",
          PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3
        },
        {
          Method: "Mockingjay", Description: "time M-G", Parameters: 85.12e+6, Stride: 10, Input: "FBANK", Corpus: "LS 360 hr",
          PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3
        },
        {
          Method: "TERA", Description: "time/freq M-G", Parameters: 21.33e+6, Stride: 10, Input: "FBANK", Corpus: "LS 960 hr",
          PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3
        },
        {
          Method: "modified CPC", Description: "F-C", Parameters: 1.84e+6, Stride: 10, Input: "waveform", Corpus: "LL 60k hr",
          PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3
        },
        {
          Method: "wav2vec", Description: "F-C", Parameters: 32.54e+6, Stride: 10, Input: "waveform", Corpus: "LS 960 hr",
          PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3
        },
        {
          Method: "vq-wav2vec", Description: "F-C + VQ", Parameters: 34.15e+6, Stride: 10, Input: "waveform", Corpus: "LS 960 hr",
          PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3
        },
        {
          Method: "wav2vec 2.0", Description: "M-C + VQ", Parameters: 95.04e+6, Stride: 20, Input: "waveform", Corpus: "LS 960 hr",
          PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3
        },
        {
          Method: "HuBERT Base", Description: "M-P + VQ", Parameters: 94.68e+6, Stride: 20, Input: "waveform", Corpus: "LS 960 hr",
          PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3
        },
        {
          Method: "HuBERT Large", Description: "M-P + VQ", Parameters: 316.61e+6, Stride: 20, Input: "waveform", Corpus: "LL 60k hr",
          PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3
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