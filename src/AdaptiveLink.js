import React from 'react';
import { HashLink } from 'react-router-hash-link';
import {
  useLocation,
} from "react-router-dom";
import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  navlink: {
  }
}));


export default function AdaptiveLink(props) {
  const { link, children, disabled } = props;
  const Link = disabled ? Box : HashLink;
  const location = useLocation();
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Box fontWeight={location.pathname.includes(link) ? "bold" : "inherit"} className={classes.navlink}>
      {
        link.includes("http") ?
          <a className="unlink" href={disabled ? null : link} target="_blank">
            {children}
          </a>
          :
          <Link className="unlink" to={link}>
            {children}
          </Link>
      }
    </Box>
  )
}