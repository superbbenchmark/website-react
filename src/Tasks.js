import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";

import { TitleSection, ContentSection } from "./components/Sections";
import PageTitle from "./components/PageTitle";
import AdaptiveLink from "./components/AdaptiveLink";
import { LiftedPaper } from "./components/LiftedOnHover";
import { capitalizeFirstLetter, Strong } from "./components/Utilies";
import { domains } from "./Data";

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
        <PageTitle
          title="Tasks"
          description={
            <span>
              General speech processing can be categorized into{" "}
              <Strong>discriminative</Strong> and <Strong>generative</Strong>{" "}
              tasks. The initial release of SUPERB focues on the former, where
              ten tasks are collected from <Strong>five domains</Strong>.
            </span>
          }
        />
        <Grid container direction="row" spacing={2} justify="center">
          {domains.map(({ name }) => (
            <Grid item>
              <AdaptiveLink link={`/tasks#${name}`}>
                <Button variant="outlined">
                  {capitalizeFirstLetter(name.toLowerCase())}
                </Button>
              </AdaptiveLink>
            </Grid>
          ))}
        </Grid>
      </TitleSection>
      {domains.map(({ name, description, tasks }) => {
        return (
          <ContentSection anchorKey={name}>
            <PageTitle
              title={capitalizeFirstLetter(name.toLowerCase())}
              description={description}
            />
            <Grid container spacing={5} justify="center">
              {tasks.map(({ name, description }) => {
                return (
                  <Grid item xs={12} sm={6} md={4}>
                    <LiftedPaper elevation={3}>
                      <Box padding={theme.spacing(3, 2)}>
                        <Typography
                          color="textPrimary"
                          variant="h6"
                          className={classes.taskName}
                        >
                          {`${name}`}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {description}
                        </Typography>
                      </Box>
                    </LiftedPaper>
                  </Grid>
                );
              })}
            </Grid>
          </ContentSection>
        );
      })}
    </React.Fragment>
  );
}

export default Tasks;
