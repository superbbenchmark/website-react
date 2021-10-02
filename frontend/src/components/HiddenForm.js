import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import swal from "sweetalert";
import axios from "axios";

import { Typography, Button } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { AuthContext } from "../context/auth-context";
import { formVal } from "../utils/form-validator";
import { tracks } from "../Data";
import FormTextField from "./FormTextfield";
import { SubSubSection } from "./Sections";
import { capitalizeFirstLetter } from "./Utilies";

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

export default function HiddenForm(){
    const classes = useStyles();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            submitName: "",
            huggingfaceOrganizationName: "",
            huggingfaceRepoName: "",
            huggingfaceCommonHash: "",
            paramShared: "",
            task: "1",
        },
    });

    const auth = useContext(AuthContext);
    const submitHandler = async (data) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("submitName", data.submitName);
            formData.append("huggingfaceOrganizationName", data.huggingfaceOrganizationName);
            formData.append("huggingfaceRepoName", data.huggingfaceRepoName);
            formData.append("huggingfaceCommonHash", data.huggingfaceCommonHash);
            formData.append("paramShared", data.paramShared);
            formData.append("task", data.task);

            const res = await axios({
                method: "post",
                url: "/api/submission",
                data: formData,
                headers: {
                    Authorization: "Bearer " + auth.token,
                },
            })
                .then((res) => {
                    console.log(res.data.msg);
                    setIsLoading(false);
                    swal({
                        title: "Susscess",
                        text: res.data.message,
                        icon: "success",
                    }).then(() => history.push("/profile"));
                })
                .catch((err) => {
                    setIsLoading(false);
                    swal({
                        title: "Preparing...",
                        text: err.response.data.message,
                        icon: "error",
                    });
                });
        } catch (err) { }
    };

    function HiddenPart() {
        return (
            <React.Fragment>
                <SubSubSection>
                    <Typography variant="body1" color="textSecondary">
                        Make sure to read the rules before submitting.
                    </Typography>
                </SubSubSection>
                <form
                    className={classes.root}
                    autoComplete="off"
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <FormTextField
                        control={control}
                        className={classes.textField}
                        name="submitName"
                        label="Submission Name*"
                        description="A short name for your system, which will be displayed on
                        the leaderboard. (Required)"
                        rules={formVal.submitName}
                        error={errors.submitName}
                        helperText={
                            errors.submitName && errors.submitName.message
                        }
                    />

                    <FormTextField
                        control={control}
                        className={classes.textField}
                        name="huggingfaceOrganizationName"
                        label="Huggingface Organization Name*"
                        description="Organization Name of your huggingface model hub. (Required)"
                        rules={formVal.huggingfaceOrganizationName}
                        error={errors.huggingfaceOrganizationName}
                        helperText={
                            errors.huggingfaceOrganizationName && errors.huggingfaceOrganizationName.message
                        }
                    />

                    <FormTextField
                        control={control}
                        className={classes.textField}
                        name="huggingfaceRepoName"
                        label="Huggingface Repository Name*"
                        description="Repository Name for your model. (Required)"
                        rules={formVal.huggingfaceRepoName}
                        error={errors.huggingfaceRepoName}
                        helperText={
                            errors.huggingfaceRepoName && errors.huggingfaceRepoName.message
                        }
                    />

                    <FormTextField
                        control={control}
                        className={classes.textField}
                        name="huggingfaceCommonHash"
                        label="Huggingface Common Hash*"
                        description="Common hash of your model. (Required)"
                        rules={formVal.huggingfaceCommonHash}
                        error={errors.huggingfaceCommonHash}
                        helperText={
                            errors.huggingfaceCommonHash && errors.huggingfaceCommonHash.message
                        }
                    />

                    <FormTextField
                        control={control}
                        className={classes.textField}
                        name="paramShared"
                        label="Parameter shared without fine-tuning*"
                        description="The total number of parameters in your model which don't require task spesific fine-tuning (only numeric numbers allowed). (Required)"
                        rules={formVal.paramShared}
                        error={errors.paramShared}
                        helperText={
                            errors.paramShared && errors.paramShared.message
                        }
                    />

                    <FormControl
                        component="fieldset"
                        style={{ marginTop: "2%" }}
                    >
                        <FormLabel component="legend">Task</FormLabel>
                        <Controller
                            control={control}
                            name="task"
                            render={({ field }) => (
                                <RadioGroup
                                    row
                                    aria-label="position"
                                    {...field}
                                >
                                    {[tracks[0]].map((track, index) => {
                                        return (
                                            <ThemeProvider theme={track.theme}>
                                                <FormControlLabel
                                                    value={(
                                                        index + 1
                                                    ).toString()}
                                                    control={
                                                        <Radio color="primary" />
                                                    }
                                                    label={
                                                        <Typography color="primary">
                                                            {capitalizeFirstLetter(
                                                                track.name.toLowerCase()
                                                            )}
                                                        </Typography>
                                                    }
                                                    color="primary"
                                                />
                                            </ThemeProvider>
                                        );
                                    })}
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                    <Button
                        className={classes.Button}
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </React.Fragment >
        )
    }

    return <HiddenPart />;
} 