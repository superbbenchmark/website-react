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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';


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
  logo: {
    margin: theme.spacing(8, 'auto', 4),
  },
  sublogo: {
    margin: theme.spacing(2, 'auto')
  },
  description: {
    margin: theme.spacing(1, 'auto')
  }
}));

function App() {
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <NavigationBar />
          <Switch>
            <Route path="/" exact>
              <Box margin={theme.spacing(8, 'auto', 1)}>
                <Typography variant="h2" color="textPrimary">
                  <strong>SUPERB</strong>
                </Typography>
              </Box>
              <Box margin={theme.spacing(1, 'auto', 4)}>
                <Typography variant={matches ? "h4" : "h5"} color="textPrimary">
                  <strong>S</strong>peech processing <strong>U</strong>niversal <strong>PER</strong>formance <strong>B</strong>enchmark
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" color="textSecondary">
                  This is the official website for the challenge SUPERB.
                  We are working on the challenge rules, scripts for getting started and submitting results, and leaderboard.
                  We will provide more information in mid April.
                  Stay tuned!
                </Typography>
              </Box>
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
