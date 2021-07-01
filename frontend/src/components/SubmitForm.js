import React, { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { SubSubSection } from "./Sections";
import { SubTitle } from "./Titles";
import { capitalizeFirstLetter } from "./Utilies";
import { AuthContext } from "../context/auth-context";
import { Typography, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";

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
    const history = useHistory();

    const auth = useContext(AuthContext);
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
    const [task, setTask] = useState("constrained");

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("submitName", submitName);
            formData.append("modelURL", modelURL);
            formData.append("modelDesc", modelDesc);
            formData.append("stride", stride);
            formData.append("inputFormat", inputFormat);
            formData.append("corpus", corpus);
            formData.append("paramDesc", paramDesc);
            formData.append("paramShared", paramShared);
            formData.append("fineTunedParam", fineTunedParam);
            formData.append("taskSpecParam", taskSpecParam);
            formData.append("task", task);
            formData.append("file", selectedFile);
            const res = await axios({
                method: "post",
                url: "http://127.0.0.1:5000/api/result/upload",
                data: formData,
                headers: {
                    Authorization: "Bearer " + auth.token,
                },
            })
                .then((res) => {
                    console.log(res.data.msg);
                })
                .catch((err) => {
                    console.log(err.response.data.msg);
                });
            history.push("/submit");
        } catch (err) {}
    };

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
            <form
                className={classes.root}
                autoComplete="off"
                onSubmit={submitHandler}
            >
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
                    onInput={(e) => setCorpus(e.target.value)}
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
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
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
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}
