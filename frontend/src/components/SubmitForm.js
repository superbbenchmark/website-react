import React, { useRef, useState } from "react";

import { SubSubSection } from "./Sections";
import { SubTitle } from "./Titles";
import { capitalizeFirstLetter } from "./Utilies";
import { Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    textField: {
        marginBottom: theme.spacing(1),
        width: "80%",
    },
    Button: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: theme.spacing(2),
        marginBottom: "3%",
    },
}));

export default function SubmitForm(props) {
    const { name = "constrained", submit = "This is constrained track" } =
        props;
    const classes = useStyles();
    const filePickerRef = useRef();
    const [submitName, setSubmitName] = useState("");
    const [modelURL, setModelURL] = useState("");
    const [modelDesc, setModelDesc] = useState("");
    const [stride, setStride] = useState("");
    const [inputFormat, setInputFormat] = useState("");
    const [corpus, setCorpus] = useState("");
    const [paramDesc, setParamDesc] = useState("");
    const [paramShared, setParamShared] = useState("");
    const [fineTunedParam, setFineTunedParam] = useState("");
    const [taskSpecParam, setTaskSpecParam] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

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
                    onInput={(e) => setSubmitName(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label={"Model URL/Github"}
                    fullWidth
                    onInput={(e) => setModelURL(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label={"Model Description"}
                    required
                    fullWidth
                    onInput={(e) => setModelDesc(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label={"Stride"}
                    required
                    fullWidth
                    onInput={(e) => setStride(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label={"Input Format"}
                    required
                    fullWidth
                    onInput={(e) => setInputFormat(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label={"Corpus"}
                    required
                    fullWidth
                    onInput={(e) => setInputFormat(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label={"Parameter Description"}
                    required
                    fullWidth
                    onInput={(e) => setParamDesc(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label={"Parameter shared without fine-tuning"}
                    required
                    fullWidth
                    onInput={(e) => setParamShared(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label={"Fine-tuned parameters"}
                    fullWidth
                    onInput={(e) => setFineTunedParam(e.target.value)}
                />
                <TextField
                    className={classes.textField}
                    label={"Task-Specific parameters"}
                    fullWidth
                    onInput={(e) => setTaskSpecParam(e.target.value)}
                />
                <input
                    type="file"
                    accept=".zip"
                    style={{ display: "none" }}
                    ref={filePickerRef}
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <FormControl component="fieldset" style={{ marginTop: "2%" }}>
                    <FormLabel component="legend">Task</FormLabel>
                    <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="constrained"
                    >
                        <FormControlLabel
                            value="constrained"
                            control={<Radio color="primary" />}
                            label="Constrained"
                        />
                        <FormControlLabel
                            value="lessContstrained"
                            control={<Radio color="primary" />}
                            label="Less-constrained"
                        />
                        <FormControlLabel
                            value="unconstrained"
                            control={<Radio color="primary" />}
                            label="Unconstrained"
                        />
                    </RadioGroup>
                </FormControl>
                <Button
                    className={classes.Button}
                    variant="contained"
                    color="primary"
                    onClick={() => filePickerRef.current.click()}
                >
                    {selectedFile ? selectedFile.name : "Select zip"}
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
