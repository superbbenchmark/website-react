import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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
  logoSpacing: {
    margin: theme.spacing(8, 'auto', 4),
  },
  basicSpacing: {
    margin: theme.spacing(1, 'auto')
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <NavigationBar />
          <Switch>
            <Route path="/" exact>
              <div className={classes.logoSpacing}>
                <Typography variant="h2" color="textPrimary" className={classes.basicSpacing}>
                  <strong>SUPERB</strong>
                </Typography>
                <Typography variant="h4" color="textPrimary" className={classes.basicSpacing}>
                  <strong>S</strong>peech processing <strong>U</strong>niversal <strong>PER</strong>formance <strong>B</strong>enchmark
                </Typography>
              </div>
              <Typography variant="h6" color="textSecondary" className={classes.basicSpacing}>
                This is the official website for the challenge SUPERB.
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
