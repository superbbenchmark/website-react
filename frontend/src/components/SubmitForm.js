import React from "react";

import { SubSubSection } from "./Sections";
import { SubTitle } from "./Titles";
import { capitalizeFirstLetter } from "./Utilies";
import { Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "40%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
    Button: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: theme.spacing(3),
    },
}));

export default function SubmitForm(props) {
    const { name = "constrained", submit = "This is constrained track" } =
        props;
    const classes = useStyles();

    return (
        <div>
            <SubSubSection>
                <SubTitle
                    title={
                        <span>
                            <strong>
                                {capitalizeFirstLetter(name.toLowerCase())}
                            </strong>{" "}
                            Submission
                        </span>
                    }
                    titleColor="primary"
                />
            </SubSubSection>
            <SubSubSection>
                <Typography variant="body1" color="textSecondary">
                    {submit}
                </Typography>
            </SubSubSection>
            <form className={classes.root} autoComplete="off">
                <TextField
                    className={classes.textField}
                    label="Submission Name"
                    required
                    fullWidth
                    color="secondary"
                />
                <TextField
                    className={classes.textField}
                    label={"Model URL/Github"}
                    fullWidth
                />
                <TextField
                    className={classes.textField}
                    label={"Model Description"}
                    required
                    fullWidth
                />
                <Button
                    className={classes.Button}
                    variant="contained"
                    color="secondary"
                >
                    Select zip file
                </Button>
                <Button
                    className={classes.Button}
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}
