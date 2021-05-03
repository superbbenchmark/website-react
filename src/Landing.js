import React from "react";
import Box from "@material-ui/core/Box";
import { Typography, Link, Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Section, SubSection, SubSubSection } from "./components/Sections";
import { DescriptionButton } from "./components/Buttons";

export default function Landing(props) {
  const theme = useTheme();
  return (
    <Box margin={theme.spacing(0, 0, 8)}>
      <Box margin={theme.spacing(8, "auto", 1)}>
        <Typography variant="h2" color="textPrimary">
          <strong>SUPERB</strong>
        </Typography>
      </Box>
      <Box margin={theme.spacing(1, "auto", 6)}>
        <Typography
          variant={useMediaQuery(theme.breakpoints.up("sm")) ? "h4" : "h5"}
          color="textPrimary"
        >
          <strong>S</strong>peech processing <strong>U</strong>niversal{" "}
          <strong>PER</strong>formance <strong>B</strong>enchmark
        </Typography>
      </Box>
      <SubSection>
      <Grid container justify="space-evenly" spacing={0}>
        {[
          "ntu-1000.png",
          "fair-1000.png",
          "mit-1000.png",
          "cmu-1000.png",
          "jhu-1000.png",
        ].map((filename) => {
          return (
            <Grid item xs={12} sm={6} md={6}>
              <img src={filename} width="100%" />
            </Grid>
          );
        })}
      </Grid>
      </SubSection>
      <Box maxWidth={800} margin="auto" textAlign="left">
        <SubSubSection>
          <Typography variant="body1" color="textSecondary">
            SUPERB is a collection of benchmarking resources to evaluate the
            capability of a universal shared representation for speech
            processing. SUPERB consists of the following:
            <div
              style={{
                width: "fit-content",
                margin: "auto",
                textAlign: "left",
              }}
            >
              <ol>
                <li>
                  A benchmark of ten speech processing tasks [1] built on
                  established public datasets,
                </li>
                <li>
                  A
                  <DescriptionButton
                    name="benchmark toolkit"
                    link={"https://github.com/s3prl/s3prl/tree/master/downstream"}
                  />
                  designed to evaluate and analyze pretrained model performance
                  on various downstream tasks following the conventional
                  evaluation protocols from speech communities,
                </li>
                <li>
                  A public
                  <DescriptionButton name="leaderboard" link="/leaderboard" />
                  for <DescriptionButton name="submissions" link="/submit" />
                  and performance tracking on the benchmark.
                </li>
              </ol>
            </div>
          </Typography>
        </SubSubSection>
        <SubSubSection>
          <Typography variant="body1" color="textSecondary">
            SUPERB aims to offer the community a standard and comprehensive
            framework to train, evaluate, and compare the generalizability of
            universal speech representations on speech processing tasks. A
            universal speech representation can be leveraged to quickly adapt to
            diverse downstream tasks with minimum architectural change and
            downstream fine-tuning, so as to reduce the model development cycle
            time for new tasks. To emphasize on evaluating the quality of the
            learned universal representation, SUPERB puts an explicit constraint
            on the downstream model and limits its parameter size.
          </Typography>
        </SubSubSection>
        <SubSubSection>
          <Typography variant="body1" color="textSecondary">
            The ultimate goal of SUPERB is to democratize the advancement in
            speech processing with powerful, generalizable, and reusable speech
            representations. SUPERB is a long-term maintained and continuously
            developing project. As we are gradually releasing new tasks and
            opening new tracks, we invite researchers to participate in the
            challenge and advance the research frontier together.
          </Typography>
        </SubSubSection>
        <Box margin={theme.spacing(8, 0)}>
          Note.
          <ol>
            <li>
              The initial release covers 10 discriminative tasks ranging from
              content, speaker, semantics, to paralinguistics. The SUPERB team
              is working on a follow-up release with generative tasks to come.
              Stay tuned!
            </li>
          </ol>
        </Box>
      </Box>
    </Box>
  );
}
