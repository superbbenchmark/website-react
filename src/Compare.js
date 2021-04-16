import { Typography } from "@material-ui/core";
import React from "react";

import { Section } from "./components/Sections";
import { Title } from "./components/Titles";

export default function Compare(props) {
  return (
    <div>
      <Section>
        <Title
          title="Compare"
          description="Compare between two submissions including pretraining details and performance."
        />
        <Typography color="textSecondary" variant="body1">
          In progress
        </Typography>
      </Section>
    </div>
  );
}
