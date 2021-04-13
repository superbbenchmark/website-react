import React from "react";
import {
  useRouteMatch,
  useParams
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
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
