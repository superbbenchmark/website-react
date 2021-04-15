import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Drawer from "./Drawer";
import AdaptiveLink from "./AdaptiveLink";


function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();

  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ block: 'center' });
      history.push(location.pathname);
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  toolbar: {
    width: "100%",
    maxWidth: 900,
    margin: "auto",
    paddingLeft: 20,
    paddingRight: 20,
  },
  tool: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  button: {
    paddingLeft: 12,
    paddingRight: 12,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 10,
    border: "solid 1px transparent",
    '&:hover': {
      background: "rgba(255, 255, 255, 1)",
      boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)"
    },
    cursor: "pointer",
  },
  navlink: {
    fontWeight: "inherit",
  }
}));


function LiftingBarButton(props) {
  const classes = useStyles();
  return (
    <div className={`${classes.tool} ${classes.button}`}>
      {props.children}
    </div>
  )
}


function NavigationBar(props) {
  const { width } = props;
  const classes = useStyles();
  const theme = useTheme();

  let items = [
    ["Paper", "https://arxiv.org/"],
    ["Code", "https://github.com/s3prl/s3prl"],
    ["Tasks", "/tasks"],
    ["Submit", "/submit"],
    ["Compare", "/compare"],
    ["Leaderboard", "/leaderboard"],
  ].map(([text, link]) => [
    <Typography color="textSecondary" variant="overline" className={classes.navlink}>{text}</Typography>,
    link
  ])

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar color="primary">
          <Toolbar className={classes.toolbar}>
            <Grid container alignItems="center">
              <Grid item xs={8} md={4}>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <AdaptiveLink link="/">
                    <LiftingBarButton>
                      <Typography color="textPrimary" variant="h6" className={`${classes.navlink}`}>
                        {useMediaQuery(theme.breakpoints.up('sm')) ? "SUPERB Benchmark" : "SUPERB"}
                      </Typography>
                    </LiftingBarButton>
                  </AdaptiveLink>
                </Grid>
              </Grid>
              <Grid item xs={4} md={8}>
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Hidden smDown>
                    {items.map(([content, link]) => (
                      <AdaptiveLink link={link}>
                        <LiftingBarButton>
                          {content}
                        </LiftingBarButton>
                      </AdaptiveLink>
                    ))}
                  </Hidden>
                  <Hidden mdUp>
                    <Drawer items={items}>
                      <LiftingBarButton>
                        <Typography color="textSecondary" variant="overline">MENU</Typography>
                      </LiftingBarButton>
                    </Drawer>
                  </Hidden>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

export default withWidth()(NavigationBar);