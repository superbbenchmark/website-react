import React from "react";
import {
  useRouteMatch,
  useParams
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { Box, Typography, Divider } from '@material-ui/core';
import { capitalizeFirstLetter } from './Utilies';
import Leaderboard from './Leaderboard';


const useStyles = makeStyles((theme) => ({
}));


export default function Track(props) {
  const classes = useStyles();
  const theme = useTheme();
  const match = useRouteMatch();
  const { urlTrack } = useParams();
  const { Icon, color, rules, scores } = props.infos[urlTrack];
  return (
    <React.Fragment>
      <Box margin={theme.spacing(4, "auto")}>
        <Box margin={theme.spacing(2, "auto")}>
          <Typography variant="h4" style={{color: color}}><strong>{capitalizeFirstLetter(urlTrack)}</strong> Track</Typography>
        </Box>
        <Divider />
      </Box>
      <Leaderboard />
    </React.Fragment>
  )
}
