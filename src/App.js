import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { Typography } from '@material-ui/core';

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
          <Switch>
            <Route path="/" exact>
              <h1>Speech processing Universal PERformance Benchmark</h1>
              <Typography>
                This is the official website for the challenge SUPERB (Speech processing Universal PERformance Benchmark).
                We are working on the challenge rules, scripts for getting started and submitting results, and leaderboard.
                We will provide more information in mid April.
                Stay tuned!
              </Typography>
            </Route>
            <Route path="/users">
              <p>test 2</p>
            </Route>
            <Route path="/test">
              <p>test 3</p>
            </Route>
          </Switch>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
