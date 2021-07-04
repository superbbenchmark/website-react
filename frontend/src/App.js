import "./App.css";
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import {
    useTheme,
    ThemeProvider,
    makeStyles,
    createMuiTheme,
} from "@material-ui/core/styles";

import Landing from "./Landing";
import Tasks from "./Tasks";
import Rules from "./Rules";
import Compare from "./Compare";
import Leaderboard from "./Leaderboard";
import NavigationBar from "./components/NavigationBar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import SubmitForm from "./components/SubmitForm";
import Profile from "./components/Profile";
import { mainTheme } from "./components/Theme";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";
import { useContext } from "react";

const useStyles = makeStyles((theme) => ({
    narrowViewport: {
        width: "85%",
        maxWidth: 900,
        margin: "auto",
    },
    LoginButton: {
        height: "30vh",
        paddingTop: "10vh",
    },
}));

function App() {
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const [navbarHeight, setNavbarHeight] = React.useState(0);
    const tableControlRef = React.useRef(null);
    const auth = useContext(AuthContext);

    const setViewPort = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        setNavbarHeight(document.getElementById("navbar").offsetHeight);
    };
    React.useEffect(setViewPort);
    window.addEventListener("resize", setViewPort);

    const classes = useStyles();
    const theme = useTheme();
    return (
        <div className="App">
            <Router>
                <div id="navbar">
                    <NavigationBar tableControlRef={tableControlRef} />
                </div>
                <Switch>
                    <Route path="/" exact>
                        <div className={`${classes.narrowViewport}`}>
                            <Landing />
                        </div>
                    </Route>
                    <Route path="/tasks">
                        <div className={`${classes.narrowViewport}`}>
                            <Tasks />
                        </div>
                    </Route>
                    <Route path="/rules">
                        <div className={`${classes.narrowViewport}`}>
                            <Rules />
                        </div>
                    </Route>
                    <Route path="/compare">
                        <div className={`${classes.narrowViewport}`}>
                            <Compare />
                        </div>
                    </Route>
                    <Route path="/leaderboard">
                        <Leaderboard
                            height={`${height - navbarHeight}px`}
                            tableControlRef={tableControlRef}
                        />
                    </Route>
                    {!auth.isLoggedIn ? (
                        <Route path="/login">
                            <div
                                className={`${classes.narrowViewport} ${classes.LoginButton}`}
                            >
                                <Login />
                            </div>
                        </Route>
                    ) : (
                        <>
                            <Route path="/profile">
                                <Profile tableControlRef={tableControlRef}/>
                            </Route>
                            <Route path="/logout">
                                <Logout />
                            </Route>
                            <Route path="/submit">
                                <div className={`${classes.narrowViewport}`}>
                                    <SubmitForm />
                                </div>
                            </Route>
                        </>
                    )}
                    
                    <Redirect to="/login" />
                </Switch>
            </Router>
        </div>
    );
}

export default () => {
    const { token, login, logout } = useAuth();
    return (
        <ThemeProvider theme={createMuiTheme(mainTheme)}>
            <AuthContext.Provider
                value={{
                    isLoggedIn: !!token,
                    token: token,
                    login: login,
                    logout: logout,
                }}
            >
                <App />
            </AuthContext.Provider>
        </ThemeProvider>
    );
};
