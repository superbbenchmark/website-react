import React from "react";
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { Box, Grid, Button, Divider, Typography } from '@material-ui/core';

import { TitleSection, ContentSection } from './components/Sections';
import PageTitle from './components/PageTitle';
import TrackButton from './components/TrackButton';
import TimedGrow from './components/TimedGrow';
import SubmitForm from './components/SubmitForm';
import AdaptiveLink from './components/AdaptiveLink';
import { Strong, capitalizeFirstLetter } from './components/Utilies';
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
        <TitleSection>
          <TimedGrow interval={0}>
            <div>
              <PageTitle
                title="Submit"
                description={
                  <span>
                    Submissions are categorized into <Strong>three tracks</Strong> for different usages of the shared pretrained model.
                  </span>
                }
              />
            </div>
          </TimedGrow>
          <Grid
            container
            direction="row"
            spacing={4}
            justify="center"
            alignItems="center"
          >
            {
              tracks.map((track, index) => {
                let trackTheme = createMuiTheme({ ...theme });
                trackTheme.palette.primary.main = track.color;

                return (
                  <Grid item>
                    <TimedGrow interval={100 * index}>
                      <ThemeProvider theme={trackTheme}>
                        <TrackButton {...track} />
                      </ThemeProvider>
                    </TimedGrow>
                  </Grid>
                )
              })
            }
          </Grid>
        </TitleSection>
        {
          tracks.map(({ color, name, intro, description }, index) => {
            let trackTheme = createMuiTheme({ ...theme });
            trackTheme.palette.primary.main = color;
            trackTheme.palette.text.primary = color;
            let startTime = 100 * tracks.length;

            return (
              <ContentSection anchorKey={name}>
                <TimedGrow interval={startTime + 100 * index}>
                  <PageTitle
                    title={
                      <span style={{ color: color }}>
                        <strong>{capitalizeFirstLetter(name.toLowerCase())}</strong> Track
                      </span>
                    }
                    titleVariant="h5"
                  />
                </TimedGrow>
              </ContentSection>
            )
          })
        }
      </Route>
      <Route path={`${match.path}/:urlTrack`}>
        <SubmitForm />
      </Route>
    </Switch>
  )
}