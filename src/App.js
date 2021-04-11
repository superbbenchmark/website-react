import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavigationBar from "./NavigationBar";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6ab7ff",
      main: "#1e88e5",
      dark: "#005cb2",
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
              <h1>SUPERB Benchmark</h1>
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
