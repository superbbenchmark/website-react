import React from 'react';
import { Box } from '@material-ui/core';


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


export { capitalizeFirstLetter, Strong };
