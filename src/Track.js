import React from "react";
import {
  useRouteMatch,
  useParams
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 64,
  },
  trackTitle: {
    fontWeight: "bold",
    margin: theme.spacing(0, "auto", 2),
  }
}));


export default function Track(props) {
  const classes = useStyles();
  const theme = useTheme();
  const match = useRouteMatch();
  const { urlTrack } = useParams();
  const { Icon, color, rules, scores } = props.infos[urlTrack];
  return (
    <React.Fragment>
      <Icon />
    </React.Fragment>
  )
}
