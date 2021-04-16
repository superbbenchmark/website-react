import React from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AdaptiveLink from "./AdaptiveLink";

const useStyles = makeStyles((theme) => ({
  descriptionButton: {
    display: "inline-block",
    margin: theme.spacing(1),
  },
}));

function DescriptionButton(props) {
  const { name, link } = props;
  const classes = useStyles();
  return (
    <AdaptiveLink link={link}>
      <Button
        size="small"
        variant="outlined"
        className={classes.descriptionButton}
      >
        {name}
      </Button>
    </AdaptiveLink>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Strong(props) {
  return (
    <Box component="span" fontWeight="bold" fontStyle="italic">
      {props.children}
    </Box>
  );
}

export { DescriptionButton, capitalizeFirstLetter, Strong };
