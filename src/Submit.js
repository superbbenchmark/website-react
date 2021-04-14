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

import Track from './components/Track';
import TimedGrow from './components/TimedGrow';
import AdaptiveLink from './components/AdaptiveLink';
import { capitalizeFirstLetter } from './components/Utilies';


const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 64,
  },
  trackTitle: {
    fontWeight: "bold",
  }
}));


function TrackButton(props) {
  const classes = useStyles();
  const theme = useTheme();
  const match = useRouteMatch()
  const { name, intro, Icon, color, rules, submissions } = props;
  const [hover, setHover] = React.useState(false);
  const trackOpen = (!rules) && (!submissions);

  return (
    <React.Fragment>
      <Paper
        elevation={hover ? 7 : 2}
        onMouseOver={() => { setHover((prev) => (!prev)); }}
        onMouseOut={() => { setHover((prev) => (!prev)); }}
      >
        <Box padding={theme.spacing(4, 3)}>
          <Grid
            container
            direction="column"
            spacing={3}
            justify="center"
          >
            {
              [
                <Icon style={{ fontSize: 64, color: color }} />,
                <Typography color="textPrimary" variant="h5" className={classes.trackTitle}>
                  {capitalizeFirstLetter(name)}
                </Typography>,
                <Typography color="textSecondary" variant="body1">
                  {intro}
                </Typography>,
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  justify="center"
                >
                  {
                    [["enter", "", trackOpen]].map(([buttonName, urlPostfix, disabled]) => (
                      <Grid item>
                        <AdaptiveLink link={`${match.url}/${name}${urlPostfix}`} disabled={disabled}>
                          <Button
                            size="medium"
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
    </React.Fragment>
  )
}


function Strong(props) {
  const theme = useTheme();
  return (
    <Box component="span" fontWeight="bold" fontStyle="italic">
      {props.children}
    </Box>
  );
}


export default function Submit(props) {
  const classes = useStyles();
  const theme = useTheme();
  const match = useRouteMatch();

  const tracks = {
    "constrained": {
      intro:
        <span>
          A fair comparison between <Strong>frozen representations</Strong> by enforcing the same downstream model in each task.
          Only a few hyper-paramters for training are allowed to tuned.
        </span>,
      Icon: LockIcon,
      color: green[400],
      rules: "Universal Representation, some rule...",
    },
    "less-constrained": {
      intro:
        <span>
          A comparison between <Strong>frozen representations</Strong> with customized but limited-resource downstream models.
          The details of downstream models are reported along with submission.
        </span>,
      Icon: LockOpenIcon,
      color: yellow[700],
      rules: null,
    },
    "unconstrained": {
      intro: "Not yet open",
      Icon: AllInclusive,
      color: red[500],
      rules: null,
    },
  }

  return (
    <Switch>
      <Route path={`${match.path}`} exact>
        <TimedGrow interval={0}>
          <Box margin={theme.spacing(4, "auto")}>
            <Box margin={theme.spacing(2, "auto")}>
              <Typography color="textPrimary" variant="h4">Submit</Typography>
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