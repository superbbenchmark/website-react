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
import TrackCard from './components/TrackCard';


const useStyles = makeStyles((theme) => ({
}));


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

  const tracks = [
    {
      name: "constrained",
      intro:
        <span>
          A fair comparison between <Strong>frozen representations</Strong> by enforcing the same downstream model in each task.
          Only a few hyper-paramters for training are allowed to tuned.
        </span>,
      Icon: LockIcon,
      color: green[400],
      rules: "Universal Representation, some rule...",
    },
    {
      name: "less-constrained",
      intro:
        <span>
          A comparison between <Strong>frozen representations</Strong> with customized but limited-resource downstream models.
          The details of downstream models are reported along with submission.
        </span>,
      Icon: LockOpenIcon,
      color: yellow[700],
      rules: null,
    },
    {
      name: "unconstrained",
      intro: "Not yet open",
      Icon: AllInclusive,
      color: red[500],
      rules: null,
    },
  ]

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
            tracks.map((trackInfo, index) => {
              const { name, intro, Icon, color, rules } = trackInfo;
              return (
                <React.Fragment>
                  <TimedGrow interval={100 * (index + 1)}>
                    <Grid item xs={12} sm={6} md={4}>
                      <TrackCard
                        Icon={Icon}
                        title={name}
                        description={intro}
                        color={color}
                        disabled={!rules}
                      />
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