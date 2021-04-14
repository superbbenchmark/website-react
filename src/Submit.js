import React from "react";
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';

import PageTitle from './components/PageTitle';
import Track from './components/Track';
import TimedGrow from './components/TimedGrow';
import TrackCard from './components/TrackCard';
import { tracks } from './Data';


const useStyles = makeStyles((theme) => ({
}));


export default function Submit(props) {
  const classes = useStyles();
  const theme = useTheme();
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}`} exact>
        <TimedGrow interval={0}>
          <div>
            <PageTitle
              title="Submit"
              description={
                <span>
                  task
              </span>
              }
            />
          </div>
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