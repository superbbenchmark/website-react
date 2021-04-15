import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { Box, Typography, Grid, Paper, Divider, Button } from '@material-ui/core';

import { TitleSection, ContentSection } from './components/Sections';
import PageTitle from './components/PageTitle';
import TimedGrow from './components/TimedGrow';
import AdaptiveLink from './components/AdaptiveLink';
import { capitalizeFirstLetter, Strong } from './components/Utilies';
import { domains } from './Data';


const useStyles = makeStyles((theme) => ({
  taskName: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
}));


function Tasks(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <React.Fragment>
      <TitleSection>
        <TimedGrow interval={0}>
          <div>
            <PageTitle
              title="Tasks"
              description={
                <span>
                  General speech processing can be categorized into <Strong>discriminative</Strong> and <Strong>generative</Strong> tasks.
                  The initial release of SUPERB focues on the former, where ten tasks are collected from <Strong>five domains</Strong>.
            </span>
              }
            />
          </div>
        </TimedGrow>
        <Grid
          container
          direction="row"
          spacing={2}
          justify="center"
        >
          {
            domains.map(({ name }, index) => (
              <TimedGrow interval={100 * index}>
                <Grid item>
                  <AdaptiveLink link={`/tasks#${name}`}>
                    <Button variant="outlined">
                      {capitalizeFirstLetter(name.toLowerCase())}
                    </Button>
                  </AdaptiveLink>
                </Grid>
              </TimedGrow>
            ))
          }
        </Grid>
      </TitleSection>
      {
        domains.map(({ name, description, tasks }, domainIndex) => {
          var startTime = (domainIndex + 1) * 400;
          return (
            <ContentSection>
              <Box id={name} position="relative" top={theme.spacing(-4)} visibility="hidden"></Box>
              <TimedGrow interval={startTime}>
                <div>
                  <PageTitle
                    title={capitalizeFirstLetter(name.toLowerCase())}
                    description={description}
                  />
                </div>
              </TimedGrow>
              <Grid
                container
                spacing={5}
                justify="center"
              >
                {
                  tasks.map(({ name, description }, inDomainIndex) => {
                    return (
                      <React.Fragment>
                        <TimedGrow interval={startTime + 100 * (inDomainIndex + 1)}>
                          <Grid item xs={12} sm={6} md={4}>
                            <Paper elevation={3}>
                              <Box padding={theme.spacing(3, 2)}>
                                <Typography color="textPrimary" variant="h6" className={classes.taskName}>
                                  {`${name}`}
                                </Typography>
                                <Typography color="textSecondary" variant="body2">
                                  {description}
                                </Typography>
                              </Box>
                            </Paper>
                          </Grid>
                        </TimedGrow>
                      </React.Fragment>
                    )
                  })
                }
              </Grid>
            </ContentSection>
          )
        })
      }
    </React.Fragment>
  )
}

export default Tasks;
