import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Box, Typography } from "@material-ui/core";

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


function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <NavigationBar />
          <Box margin={theme.spacing(4, "auto")}></Box>
          <Switch>
            <Route path="/" exact>
              <Landing />
            </Route>
            <Route path="/tasks">
              <Tasks />
            </Route>
            <Route path="/submit">
              <Submit />
            </Route>
            <Route path="/compare">
              <Typography>Compare</Typography>
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
