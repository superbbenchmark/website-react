import React from "react";
import {
  useRouteMatch,
  useParams
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { Box, Typography, Divider } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { capitalizeFirstLetter } from './Utilies';
import Leaderboard from './Leaderboard';


export default function Track(props) {
  const theme = useTheme();
  const match = useRouteMatch();
  const { urlTrack } = useParams();
  const { Icon, color, rules, submissions } = props.infos[urlTrack];

  const trackTheme = createMuiTheme({
    ...theme,
  })
  trackTheme.palette.primary.main = color;

  return (
    <ThemeProvider theme={trackTheme}>
      <Box margin={trackTheme.spacing(4, "auto")}>
        <Box margin={trackTheme.spacing(2, "auto")}>
          <Typography variant="h4" color="primary"><strong>{capitalizeFirstLetter(urlTrack)}</strong> Track</Typography>
        </Box>
        <Divider />
      </Box>
      <Leaderboard submissions={submissions} />
    </ThemeProvider>
  )
}
