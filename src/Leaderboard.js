import * as React from "react";
import ExampleTable from "./components/ExampleTable";

import { Section } from "./components/Sections";
import { submissions } from "./Data";
import { Typography } from "@material-ui/core";

export default function LeaderBoard(props) {
  return <ExampleTable {...props} />;
}
