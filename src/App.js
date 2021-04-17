import "./App.css";
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
    maxWidth: 900,
    margin: "auto",
  },
}));

function App() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className="App">
      <Router>
        <NavigationBar />
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
            <Leaderboard />
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
