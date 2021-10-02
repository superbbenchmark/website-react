import React, { useState } from "react";
import { HashLink } from 'react-router-hash-link';
import Clock from "react-live-clock";

import { Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { submitFormTheme } from "./Theme";
import { SubSubSection } from "./Sections";
import { SubTitle } from "./Titles";
import { Strong } from "./Utilies";
import PubHidSelect from "./PubHidSelect";
import PublicForm from "./PublicForm";
import HiddenForm from "./HiddenForm";

export default function SubmitForm(props) {
    const theme = useTheme();
    const [type, setType] = useState("public");

    const onTypeChange = (e) => {
        setType(e.target.value);
    };

    const SwitchPart = () => {
        switch(type) {
            case "public":   return <PublicForm />;
            case "hidden":   return <HiddenForm />;
            default:      return <h1>No competition type match</h1>
        }
      }

    return (
        <ThemeProvider theme={createMuiTheme(submitFormTheme)}>
            <>
                <SubSubSection margin={theme.spacing(8, "auto", 1)}>
                    <SubTitle
                        title={
                            <span>
                                <strong>Submission</strong>
                            </span>
                        }
                        description={
                            <Clock
                                format={"YYYY-MM-DD HH:mm:ss"}
                                ticking={true}
                                timezone={"Etc/GMT+12"}
                            />
                        }
                        titleColor="primary"
                    />
                </SubSubSection>
                {props.login ? (
                    <>
                        <PubHidSelect type={type} onTypeChange={onTypeChange} />
                        <SwitchPart />
                    </>
                ) : (
                    <SubSubSection>
                        <Typography variant="body1" color="textSecondary">
                            <Strong>Please <HashLink to="/login">login</HashLink> first before submission</Strong>
                        </Typography>
                    </SubSubSection>
                )}
            </>
        </ThemeProvider>
    );
}
