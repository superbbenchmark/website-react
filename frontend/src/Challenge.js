import React from "react";
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core/styles";
// import { MarkDownElement } from "@material-ui/docs/MarkDownElement";
import { Box, Typography, Grid, Button } from "@material-ui/core";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown';


import { Section } from "./components/Sections";
import { Title } from "./components/Titles";
import AdaptiveLink from "./components/AdaptiveLink";
import { LiftedPaper } from "./components/LiftedOnHover";
import { capitalizeFirstLetter, Strong } from "./components/Utilies";
import policy from "./policy";

const markdown = `
# test
## test2
### test3
* gag
* ada
`

const useStyles = makeStyles((theme) => ({
    image: {
        width: "400",
        height: "500",
        marginBottom: theme.spacing(2),
    },
}));

function Challenge(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <React.Fragment>
            <Section margin={theme.spacing(8, "auto", 1)}>
                {policy}
            </Section>
        </React.Fragment >
    );
}

export default Challenge;