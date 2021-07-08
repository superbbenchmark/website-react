import React, { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { SubSubSection } from "./Sections";
import { SubTitle } from "./Titles";
import { capitalizeFirstLetter } from "./Utilies";
import { submitFormTheme } from "./Theme";
import { tracks } from "../Data";
import { AuthContext } from "../context/auth-context";
import { Typography, Button, TextField } from "@material-ui/core";
import swal from "sweetalert";
import {
    makeStyles,
    createMuiTheme,
    ThemeProvider,
} from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import axios from "axios";
import { formVal } from "../utils/form-validator";

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
    const classes = useStyles();
    const filePickerRef = useRef();
    const history = useHistory();
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        watch,
    } = useForm({ defaultValues: { task: "1" } });

    const { ref, ...rest } = register("file", formVal.file);

    const auth = useContext(AuthContext);
    const watchFile = watch("file");

    const submitHandler = async (data) => {
        try {
            const formData = new FormData();
            formData.append("submitName", data.submitName);
            formData.append("modelURL", data.modelURL);
            formData.append("modelDesc", data.modelDesc);
            formData.append("stride", data.stride);
            formData.append("inputFormat", data.inputFormat);
            formData.append("corpus", data.corpus);
            formData.append("paramDesc", data.paramDesc);
            formData.append("paramShared", data.paramShared);
            formData.append("fineTunedParam", data.fineTunedParam);
            formData.append("taskSpecParam", data.taskSpecParam);
            formData.append("task", data.task);
            formData.append("file", data?.file[0]);
            const res = await axios({
                method: "post",
                url: "/api/result/upload",
                data: formData,
                headers: {
                    Authorization: "Bearer " + auth.token,
                },
            })
                .then((res) => {
                    console.log(res.data.msg);
                    swal({
                        title: "Susscess",
                        text: res.data.msg,
                        icon: "success",
                    });
                })
                .catch((err) => {
                    console.log(err.response.data.msg);
                    swal({
                        title: "Error",
                        text: err.response.data.msg,
                        icon: "error",
                    });
                });
        } catch (err) {}
    };

    return (
        <ThemeProvider theme={createMuiTheme(submitFormTheme)}>
            <div>
                <SubSubSection>
                    <SubTitle
                        title={
                            <span>
                                <strong>Submission</strong>
                            </span>
                        }
                        titleColor="primary"
                    />
                </SubSubSection>
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
                    <Controller
                        control={control}
                        name="submitName"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className={classes.textField}
                                label="Submission Name*"
                                fullWidth
                                error={errors.submitName}
                                helperText={
                                    errors.submitName &&
                                    errors.submitName.message
                                }
                            />
                        )}
                        rules={formVal.submitName}
                    />
                    <Controller
                        control={control}
                        name="modelURL"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className={classes.textField}
                                label="Model URL/Github"
                                fullWidth
                                error={errors.modelURL}
                                helperText={
                                    errors.modelURL && errors.modelURL.message
                                }
                            />
                        )}
                        rules={formVal.modelURL}
                    />
                    <Controller
                        control={control}
                        name="modelDesc"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className={classes.textField}
                                label="Model Description*"
                                fullWidth
                                error={errors.modelDesc}
                                helperText={
                                    errors.modelDesc && errors.modelDesc.message
                                }
                            />
                        )}
                        rules={formVal.modelDesc}
                    />
                    <Controller
                        control={control}
                        name="stride"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className={classes.textField}
                                label="Stride*"
                                fullWidth
                                error={errors.stride}
                                helperText={
                                    errors.stride && errors.stride.message
                                }
                            />
                        )}
                        rules={formVal.stride}
                    />
                    <Controller
                        control={control}
                        name="inputFormat"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className={classes.textField}
                                label="Input Format*"
                                fullWidth
                                error={errors.inputFormat}
                                helperText={
                                    errors.inputFormat &&
                                    errors.inputFormat.message
                                }
                            />
                        )}
                        rules={formVal.inputFormat}
                    />
                    <Controller
                        control={control}
                        name="corpus"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className={classes.textField}
                                label="Corpus*"
                                fullWidth
                                error={errors.corpus}
                                helperText={
                                    errors.corpus && errors.corpus.message
                                }
                            />
                        )}
                        rules={formVal.corpus}
                    />
                    <Controller
                        control={control}
                        name="paramDesc"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                hintText="Enter Your Product Name"
                                className={classes.textField}
                                label="Parameter Description*"
                                fullWidth
                                error={errors.paramDesc}
                                helperText={
                                    errors.paramDesc && errors.paramDesc.message
                                }
                            />
                        )}
                        rules={formVal.paramDesc}
                    />
                    <Controller
                        control={control}
                        name="paramShared"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className={classes.textField}
                                label="Parameter shared without fine-tuning*"
                                fullWidth
                                error={errors.paramShared}
                                helperText={
                                    errors.paramShared &&
                                    errors.paramShared.message
                                }
                            />
                        )}
                        rules={formVal.paramShared}
                    />
                    <Controller
                        control={control}
                        name="fineTunedParam"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className={classes.textField}
                                label="Fine-tuned parameters"
                                fullWidth
                                error={errors.fineTunedParam}
                                helperText={
                                    errors.fineTunedParam &&
                                    errors.fineTunedParam.message
                                }
                            />
                        )}
                        rules={formVal.fineTunedParam}
                    />
                    <Controller
                        control={control}
                        name="taskSpecParam"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                className={classes.textField}
                                label="Task-Specific parameters"
                                fullWidth
                                error={errors.taskSpecParam}
                                helperText={
                                    errors.taskSpecParam &&
                                    errors.taskSpecParam.message
                                }
                            />
                        )}
                        rules={formVal.taskSpecParam}
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
                                    {tracks.map((track, index) => {
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
                    <input
                        type="file"
                        accept=".zip"
                        style={{ display: "none" }}
                        name="file"
                        ref={(e) => {
                            ref(e);
                            filePickerRef.current = e;
                        }}
                        onChange={(e) => setValue("file", e.target.files)}
                    />
                    <Button
                        className={classes.Button}
                        variant="contained"
                        color="primary"
                        onClick={() => filePickerRef.current.click()}
                    >
                        {watchFile && watchFile[0]?.name
                            ? watchFile[0]?.name
                            : "Select zip"}
                    </Button>
                    <span style={{ color: "red" }}>
                        {errors.file && errors.file.message}
                    </span>
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
        </ThemeProvider>
    );
}
