import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Box, Grid, Button, Divider } from '@material-ui/core';

import AdaptiveLink from './AdaptiveLink';


const useStyles = makeStyles((theme) => ({
  pseudoOutlinedPrimaryButton: {
    backgroundColor: 'transparent',
    border: `1px solid ${fade(theme.palette.primary.main, 0.5)}`,
    borderRadius: theme.shape.borderRadius,
    display: 'inline-block',
  },
  innerButton: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }
}));


export default function MultiLinkButton(props) {
  const { buttons } = props;
  const classes = useStyles();

  return (
    <div className={classes.pseudoOutlinedPrimaryButton}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        {
          buttons.map(({ name, link }, index) => (
            <React.Fragment>
              <Grid item>
                <AdaptiveLink link={link}>
                  <Button disabled={!link} color="primary" className={classes.innerButton}>
                    {name}
                  </Button>
                </AdaptiveLink>
              </Grid>
              {
                index < buttons.length - 1 &&
                <Grid item>
                  <Box height={28}>
                    <Divider orientation="vertical" />
                  </Box>
                </Grid>
              }
            </React.Fragment>
          ))
        }
      </Grid>
    </div>
  );
};

MultiLinkButton.defaultProps = {
  buttons: [
    {
      name: 'rules',
      link: '/submit#rules'
    },
    {
      name: 'submit',
      link: '/submit#submit'
    },

  ]
};
