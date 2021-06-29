import React from "react";

import { SubSubSection } from "./Sections";
import { SubTitle } from "./Titles";
import { capitalizeFirstLetter } from "./Utilies";
import { Typography, Button } from "@material-ui/core";

export default function SubmitForm(props) {
  const {
    name = 'constrained',
    submit = 'This is constrained track',
  } = props;

  return (
    <div>
      <SubSubSection>
        <SubTitle
          title={<span><strong>{capitalizeFirstLetter(name.toLowerCase())}</strong> Submission</span>}
          titleColor="primary"
        />
      </SubSubSection>
      <SubSubSection>
        <Typography variant="body1" color="textSecondary">
          {submit}
        </Typography>
      </SubSubSection>
    </div>
  );
}
