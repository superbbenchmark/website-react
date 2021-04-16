import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  fade,
} from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Button,
  Divider,
  Typography,
  Link,
} from "@material-ui/core";

import { TitleSection, ContentSection } from "./components/Sections";
import PageTitle from "./components/PageTitle";
import MultiLinkButton from "./components/MultiLinkButton";
import SubmitForm from "./components/SubmitForm";
import AdaptiveLink from "./components/AdaptiveLink";
import { Strong, capitalizeFirstLetter } from "./components/Utilies";
import { tracks } from "./Data";

const useStyles = makeStyles((theme) => ({
  rules: {
    display: "inline-block",
    padding: "1px 6px",
    marginTop: 1,
    marginBottom: 1,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${fade(theme.palette.text.secondary, 0.5)}`,
  },
}));

function DescriptionButton(props) {
  const { name, link } = props;
  return (
    <AdaptiveLink link={link}>
      <Button size="small" variant="outlined" component="span">
        {name}
      </Button>
    </AdaptiveLink>
  );
}

export default function Submit(props) {
  const classes = useStyles();
  const theme = useTheme();
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}`} exact>
        <TitleSection>
          <PageTitle
            title="Submit"
            description={
              <span>
                Submissions are categorized into <Strong>three tracks</Strong>{" "}
                for different usages of the shared pretrained model, and should
                follow the{" "}
                <DescriptionButton
                  name="general rules"
                  link={`${match.url}#general-rules`}
                />{" "}
                and the track-specific rules.
              </span>
            }
          />
          <Grid
            container
            direction="row"
            spacing={4}
            justify="center"
            alignItems="center"
          >
            {tracks.map(({ name, rules, submit, color }, index) => {
              let trackTheme = createMuiTheme({ ...theme });
              trackTheme.palette.primary.main = color;

              return (
                <Grid item>
                  <ThemeProvider theme={trackTheme}>
                    <div>
                      <Typography
                        component="span"
                        variant="body1"
                        color="primary"
                      >
                        <strong>
                          {capitalizeFirstLetter(name.toLowerCase())}
                        </strong>{" "}
                        track
                      </Typography>
                      <Box marginTop="6px">
                        <MultiLinkButton
                          buttons={[
                            {
                              name: "rules",
                              link: rules ? `${match.url}#${name}` : null,
                            },
                            {
                              name: "submit",
                              link: submit ? `${match.url}/${name}` : null,
                            },
                          ]}
                        />
                      </Box>
                    </div>
                  </ThemeProvider>
                </Grid>
              );
            })}
          </Grid>
        </TitleSection>
        <ContentSection anchorKey="general-rules">
          <PageTitle
            title="General Rules"
            description="The general rules applied to all tracks."
          />
          <Typography variant="body1" color="textSecondary">
            Some general rules.
          </Typography>
        </ContentSection>
        <ContentSection anchorKey="track-rules">
          <PageTitle
            title="Track Rules"
            description="The track-specific rules for each of the tracks."
          />
          {tracks.map(({ color, name, rules }, index) => {
            let trackTheme = createMuiTheme({ ...theme });
            trackTheme.palette.primary.main = color;
            trackTheme.palette.text.primary = color;

            return (
              <Box maxWidth={600} margin="auto">
                <ContentSection anchorKey={name}>
                  <PageTitle
                    title={
                      <span style={{ color: color }}>
                        {capitalizeFirstLetter(name.toLowerCase())}
                      </span>
                    }
                    titleVariant="h5"
                    divider={false}
                  />
                  <Typography variant="body1" color="textSecondary">
                    {rules}
                  </Typography>
                </ContentSection>
              </Box>
            );
          })}
        </ContentSection>
      </Route>
      <Route path={`${match.path}/:urlTrack`}>
        <SubmitForm />
      </Route>
    </Switch>
  );
}
