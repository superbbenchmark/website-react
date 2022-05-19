import React from "react";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { 
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  Scatter
} from "recharts";
import { Section } from "./Sections";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}
));

function SelectVariants(props) {
  const classes = useStyles();
  const handleChange = (event) => {
    props.setValue(event.target.value);
  };

  return (
    <FormControl variant="standard" className={classes.formControl}>
      <InputLabel>{props.name}</InputLabel>
      <Select
        value={props.value}
        onChange={handleChange}
        label="test"
      >
        {props.options.map((value, idx) => <MenuItem value={idx}>{value}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

function ModelScatterChart(props) {
  const classes = useStyles();
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(1);
  const scores = props.columns.filter(value => value.isScore && !value.Header.match(/MACs|\([1-4]\)/));
  const xOptions = ["Params", "MACs", "MACs (short)", "MACs (medium)", "MACs (long)", "MACs (longer)"];
  const xNames = ["paramShared", "macs", "macsShort", "macsMedium", "macsLong", "macsLonger"];
  const xTicks = [
    [0,100,200,300,400],
    [0,1250,2500,3750,5000],
    [0,125,250,375,500],
    [0,250,500,750,1000],
    [0,375,750,1125,1500],
    [0,625,1250,1875,2500],
  ];
  const yOptions = scores.map(value => value.Header);
  const yAccess = scores[Object.keys(scores)[y]].accessor;
  const presentData = props.data.filter(
    value => value[xNames[x]] != "-" && value[yAccess] != "-"
    ).map(
      value => ({
        "submitName": value.submitName,
        "xValue": Math.round(value[xNames[x]]/(x ? 1e6 : 1e3))/1e3,
        "yValue": value[yAccess]})
      );


  return (
    <Section>
        <Grid container
          alignItems="center"
          justify="center"
          className={classes.root}
          spacing={2}
        >
          <Grid item md={3} lg={2}
            direction="column"
            alignItems="center"
            justify="flex-start"
            spacing={6}
          >
            <Grid item>
              <SelectVariants
                value={y}
                setValue={setY}
                name="Y-Axis"
                options={yOptions}
              />
            </Grid>
            <Grid item>
              <SelectVariants
                value={x}
                setValue={setX}
                name={"X-Axis"}
                options={xOptions}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={7} xl={6} >
            <ResponsiveContainer width="100%" height={540}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis 
                  dataKey="xValue"
                  name={xOptions[x]}
                  unit={x ? "GMACs" : "M"}
                  type="number"
                  ticks={xTicks[x]}
                  interval={0}
                  scale="linear"
                />
                <YAxis
                  dataKey="yValue"
                  name={yOptions[y]}
                  type="number"
                  domain={["dataMin", "auto"]}
                />
                <ZAxis dataKey="submitName" name="Name" />
                <Tooltip cursor={{ strokeDasharray: '8 8' }} />
                <Legend />
                {presentData.map((value, index) => 
                    <Scatter name={value.submitName}
                             data={[value]}
                             fill={'hsla(' + (360 / presentData.length * index) + ', 80%, 50%, 0.8)'}
                    />
                  )
                }
              </ScatterChart>
            </ResponsiveContainer>
          </Grid>
          <Grid md={0} lg={2} />
        </Grid>
    </Section>
  );
}

export { ModelScatterChart };