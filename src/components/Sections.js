import React from 'react';
import { useTheme } from '@material-ui/styles'
import { Box } from '@material-ui/core';


function Section(props) {
  const theme = useTheme();
  const { anchorKey, ...remainedProps } = props;

  return (
    <React.Fragment>
      <Box id={anchorKey} position="relative" top={theme.spacing(-4)} visibility="hidden"></Box>
      <Box {...remainedProps} />
    </React.Fragment>
  );
};


function TitleSection(props) {
  const theme = useTheme();
  
  return (
    <Section margin={theme.spacing(4, "auto", 8)}>
      {props.children}
    </Section>
  );
};


function ContentSection(props) {
  const theme = useTheme();
  
  return (
    <Section margin={theme.spacing(4, "auto", 8)}>
      {props.children}
    </Section>
  );
};


export { TitleSection, ContentSection };
