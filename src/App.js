import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';

import Landing from "./Landing";
import Tasks from "./Tasks";
import Submit from "./Submit";
import Leaderboard from "./Leaderboard";
import NavigationBar from "./components/NavigationBar";


const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#f5f5f5",
      dark: "#c2c2c2",
    },
    text: {
      primary: "#546e7a",
      secondary: "#9e9e9e"
    }
  }
})


const useStyles = makeStyles((theme) => ({
  narrowViewport: {
    maxWidth: 900,
    margin: "auto"
  }
}));


function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <NavigationBar />
          <Box margin={theme.spacing(4, "auto")}></Box>
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
                <Typography>Compare</Typography>
              </div>
            </Route>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
          </Switch>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
