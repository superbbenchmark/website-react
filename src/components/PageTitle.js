import React from 'react';
import { useTheme } from '@material-ui/styles';
import { Box, Typography, Divider } from '@material-ui/core';

import { capitalizeFirstLetter } from './Utilies';


export default function PageTitle(props) {
  const theme = useTheme();
  let { title, titleVariant, description, divider } = props;

  return (
    <React.Fragment>
      <Box margin={theme.spacing(3, "auto")}>
        <Box margin={theme.spacing(2, "auto")} maxWidth={750}>
          <Typography color="textPrimary" variant={titleVariant}>{title}</Typography>
          {
            description && (
              <Box margin={theme.spacing(1, "auto")}>
                <Typography color="textSecondary" variant="body1">{description}</Typography>
              </Box>
            )
          }
        </Box>
        {divider && <Divider />}
      </Box>
    </React.Fragment>
  )
}

PageTitle.defaultProps = {
  title: 'No title',
  titleVariant: "h4",
  divider: true,
}
