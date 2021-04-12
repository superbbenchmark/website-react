import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
}));


export default function Leaderboard(props) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <React.Fragment>
      <Typography variant="h5" color="textPrimary">Leaderboard</Typography>
    </React.Fragment>
  )
}