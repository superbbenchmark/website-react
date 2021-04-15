import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import { Box, Grid, Button, Divider, Typography } from '@material-ui/core';

import AdaptiveLink from './AdaptiveLink';
import { capitalizeFirstLetter } from './Utilies';


const useStyles = makeStyles((theme) => ({
  pseudoOutlinedPrimaryButton: {
    backgroundColor: 'transparent',
    border: `1px solid ${fade(theme.palette.primary.main, 0.5)}`,
    borderRadius: theme.shape.borderRadius,
  },
}));


export default function TrackButton(props) {
  const { name, rules } = props;
  const match = useRouteMatch();
  const theme = useTheme();
  const classes = useStyles();

  const leftRightPadding = theme.spacing(2);
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <Typography variant="h6" color="primary">
          {capitalizeFirstLetter(name.toLowerCase())}
        </Typography>
      </Grid>
      <Grid item>
        <div className={classes.pseudoOutlinedPrimaryButton}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={0}
          >
            <Grid item>
              <AdaptiveLink disabled={!rules} link={`${match.url}#${name}`}>
                <Button disabled={!rules} color="primary" style={{ paddingLeft: leftRightPadding, paddingRight: leftRightPadding }}>
                  Rules
                  </Button>
              </AdaptiveLink>
            </Grid>
            <Grid item>
              <Box height={28}>
                <Divider orientation="vertical" />
              </Box>
            </Grid>
            <Grid item>
              <AdaptiveLink disabled={!rules} link={`${match.url}/${name}`}>
                <Button disabled={!rules} color="primary" style={{ paddingLeft: leftRightPadding, paddingRight: leftRightPadding }}>
                  Submit
                  </Button>
              </AdaptiveLink>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};
