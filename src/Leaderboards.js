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
  const { name, Icon, color, rules, scores } = props;
  const [ hover, setHover ] = React.useState(false);
  const TrackButtonCls = (!rules) && (!scores) ? Box : AdaptiveLink;

  return (
    <TrackButtonCls link={`${match.url}/${name}`}>
      <Paper
        elevation={hover ? 6 : 2}
        onMouseOver={() => {setHover((prev) => (!prev));}}
        onMouseOut={() => {setHover((prev) => (!prev));}}
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
                    [["rules", !rules], ["compare", !scores], ["leaderboard", !scores]].map(([buttonName, disabled]) => (
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
      scores: {
        "FBANK": { PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3 },
        "PASE+": { PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3 },
        "APC": { PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3 },
        "VQ-APC": { PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3 },
        "NPC": { PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3 },
        "Mockingjay": { PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3 },
        "TERA": { PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3 },
        "modified CPC": { PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3 },
        "wav2vec": { PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3 },
        "vq-wav2vec": { PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3 },
        "wav2vec 2.0": { PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3 },
        "HuBERT Base": { PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3 },
        "HuBERT Large": { PR: 3, KS: 3, IC: 3, SID: 3, ER: 3, ASR: 3, QbE: 3, SF: 3, SV: 3, SD: 3 },
      }
    },
    constrained: {
      Icon: LockOpenIcon,
      color: yellow[700],
      rules: null,
      scores: null,
    },
    unconstrained: {
      Icon: AllInclusive,
      color: red[500],
      rules: null,
      scores: null,
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