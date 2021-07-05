import { leaderboard_selections } from "../Data";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { capitalizeFirstLetter } from "./Utilies";
import { Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

export default function TrackSelect({ task, onTaskChange }) {
    return (
    <div className="select group" style={{width: "fit-content", maxWidth: "100%", margin: "auto",}}>
        <RadioGroup row aria-label="position" name="position" defaultValue="constrained" value={task} onChange={onTaskChange}>
        {leaderboard_selections.map((leaderboard_selections) => {
                  return (
                      <ThemeProvider theme={leaderboard_selections.theme}>
                          <FormControlLabel
                              value={leaderboard_selections.name}
                              control={<Radio color="primary" />}
                              label={
                                  <Typography color="primary">
                                      {capitalizeFirstLetter(
                                          leaderboard_selections.name.toLowerCase()
                                      )}
                                  </Typography>
                              }
                              color="primary"
                          />
                      </ThemeProvider>
                  );
              })}
        </RadioGroup>
    </div>
    )
  }