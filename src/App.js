import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { useTheme, ThemeProvider, makeStyles, createMuiTheme } from "@material-ui/core/styles";

import Landing from "./Landing";
import Tasks from "./Tasks";
import Submit from "./Submit";
import Compare from "./Compare";
import Leaderboard from "./Leaderboard";
import NavigationBar from "./components/NavigationBar";
import { mainTheme } from "./components/Theme";

const useStyles = makeStyles((theme) => ({
  narrowViewport: {
    width: "85%",
    maxWidth: 900,
    margin: "auto",
  },
}));

function App() {
  const [ width, setWidth ] = React.useState(0);
  const [ height, setHeight ] = React.useState(0);
  const [ navbarHeight, setNavbarHeight ] = React.useState(0);

  const setViewPort = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setNavbarHeight(document.getElementById("navbar").offsetHeight);
  }
  React.useEffect(setViewPort);
  window.addEventListener("resize", setViewPort);

  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className="App">
      <Router>
        <div id="navbar">
          <NavigationBar />
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
          <Route path="/submit">
            <div className={`${classes.narrowViewport}`}>
              <Submit />
            </div>
          </Route>
          <Route path="/compare">
            <div className={`${classes.narrowViewport}`}>
              <Compare />
            </div>
          </Route>
          <Route path="/leaderboard">
            <Leaderboard height={`${height - navbarHeight}px`} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default () => {
  return (
    <ThemeProvider theme={createMuiTheme(mainTheme)}>
      <App />
    </ThemeProvider>
  );
};
