import React from "react";
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


export default function Landing(props) {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Box margin={theme.spacing(8, 'auto', 1)}>
        <Typography variant="h2" color="textPrimary">
          <strong>SUPERB</strong>
        </Typography>
      </Box>
      <Box margin={theme.spacing(1, 'auto', 4)}>
        <Typography variant={useMediaQuery(theme.breakpoints.up('sm')) ? "h4" : "h5"} color="textPrimary">
          <strong>S</strong>peech processing <strong>U</strong>niversal <strong>PER</strong>formance <strong>B</strong>enchmark
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" color="textSecondary">
          This is the official website for the challenge SUPERB.
          We are working on the challenge rules, scripts for getting started and submitting results, and leaderboard.
          We will provide more information in mid April.
          Stay tuned!
        </Typography>
      </Box>
    </React.Fragment>
  )
}
