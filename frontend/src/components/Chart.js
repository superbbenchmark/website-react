import React from "react";
import { HashLink } from 'react-router-hash-link';
import { makeStyles } from "@material-ui/core/styles";
import { 
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import {
  //Scatter Chart
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Scatter,
  LabelList,
  //Radar Chart
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Polygon,
  //General
  Legend,
  ResponsiveContainer,
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

function SelectVariants({ name, value, setValue, options }) {
  const classes = useStyles();
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl variant="standard" className={classes.formControl}>
      <InputLabel>{name}</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label="test"
      >
        {options.map((value, idx) => <MenuItem value={idx}>{value}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

function ModelScatterChart({ columns, data }) {
  const classes = useStyles();
  const [x, setX] = React.useState(1);
  const [y, setY] = React.useState(1);
  const scores = columns.filter(value => value.isScore && !value.Header.match(/MACs|\([1-4]\)/));
  const xOptions = ["Params", "MACs"]; // , "MACs (short)", "MACs (medium)", "MACs (long)", "MACs (longer)"
  const xNames = ["paramShared", "macs"]; // , "macsShort", "macsMedium", "macsLong", "macsLonger"
  const xTicks = [
    [0,100,200,300,400,500,600,650],
    [200,500,1500,5000],
    // [0,125,250,375,500],
    // [0,250,500,750,1000],
    // [0,375,750,1125,1500],
    // [0,625,1250,1875,2500],
  ];
  const yOptions = scores.map(value => value.Header);
  const yAccess = scores[Object.keys(scores)[y]].accessor;
  const paperIDmapping = {
    "DistilHuBERT": 10,
    "PASE+": 26,
    "APC": 27,
    "modified CPC": 28,
    "TERA": 29
  }
  const presentData = data.filter(
    value => value[xNames[x]] != "-" && value[yAccess] != "-"
    ).map(
      value => ({
        "submitName": value.submitName,
        // "submitName": value.paperId ? value.paperId + ". " + value.submitName : (value.submitName in paperIDmapping ? paperIDmapping[value.submitName] + ". " + value.submitName : value.submitName),
        "xValue": Math.round(value[xNames[x]]/(x ? 1e6 : 1e3))/1e3,
        "yValue": value[yAccess],
        "paperId": value.paperId ? value.paperId : paperIDmapping[value.submitName]})
      ).sort(
        (a, b) => (typeof a.paperId !== 'string' ? a.paperId : 999) > (typeof b.paperId !== 'string' ? b.paperId : 999) ? 1 : -1
      ).filter(value => value.yValue);


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
                <CartesianGrid strokeWidth={1} stroke={"#666666"} strokeDasharray="5 5" />
                <XAxis 
                  dataKey="xValue"
                  name={xOptions[x]}
                  unit={x ? "GMACs" : "M"}
                  type="number"
                  ticks={xTicks[x]}
                  domain={["dataMin-10", "dataMax+1000"]}
                  scale="log"
                  allowDataOverflow={true}
                  fontSize={20}
                  strokeWidth={2}
                />
                <YAxis
                  dataKey="yValue"
                  name={yOptions[y]}
                  type="number"
                  domain={["dataMin", "auto"]}
                  fontSize={20}
                  strokeWidth={2}
                />
                <ZAxis dataKey="submitName" name="Name" />
                <Tooltip cursor={{ strokeDasharray: '8 8' }} />
                <Legend />
                {presentData.map((value, index) => 
                    <Scatter name={value.submitName}
                             data={[value]}
                             fill={'hsla(' + (360 / presentData.length * index) + ', 80%, 40%, .8)'}
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

function ModelRadarChart ( {inters} ) {
  // style
  const classes = useStyles();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 8 + ITEM_PADDING_TOP,
        width: 280,
        maxWidth: 540,
      },
    },
  };
  // state
  const [model, setModel] = React.useState([]);
  
  let accessors = Object.keys(inters["FBANK"]===undefined ? {} : inters["FBANK"]);
  let task_scores = [];
  let model_names = Object.keys(inters).sort();
  
  if (accessors){
    let tasks = new Set(accessors.map(accessor => accessor.split("_")[0]));
    // iterate each task
    for (let task of tasks.values()) {
        let task_metrics_name = accessors.filter(accessor => accessor.split("_")[0] == task)
        let tmp = {"task": task};
        // iterate each model
        for (const [key, value] of Object.entries(inters)) {
            let task_metrics = task_metrics_name.map(metric => value[metric])
            tmp[key] = Math.round(task_metrics.reduce((a, b) => a + b, 0) / task_metrics.length * 100) / 100
        }
        task_scores.push(tmp);
    }
  }

  return (
    <Section>
        <Grid container
          alignItems="center"
          justify="center"
          className={classes.root}
        >
          <Grid item md={12}>
            <FormControl variant="standard" className={classes.formControl}>
              <InputLabel>Models</InputLabel>
              <Select
                multiple
                value={model}
                onChange={(event) => {setModel(event.target.value);}}
                MenuProps={MenuProps}
                >
                {model_names.map((name) => (
                  <MenuItem key={name} value={name}>{name}</MenuItem>
                  ))}
              </Select>
              <FormHelperText>Multiple-choice supported</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item md={12} >
            <ResponsiveContainer width="100%" height={720}>
              <RadarChart data={task_scores}>
                <PolarGrid stroke={"#666666"}/>
                <PolarAngleAxis stroke={"#666666"} dataKey="task" fontSize={28}/>
                <PolarRadiusAxis stroke={"#666666"} scale="linear" orientation="middle" angle={36} domain={[-500, 1500]} tickCount={5} fontSize={20}/>
                {model.map((value, index) => {
                    const color = 'hsla(' + (360 / model.length * index + 20) + ', 80%, 40%, .6)'
                    return (
                      <Radar name={value}
                             dataKey={value}
                             stroke={color}
                             shape={<Polygon strokeWidth={3}/>}
                             fill={color}
                             fillOpacity={.6}
                      />
                    )
                  })
                }
                <Legend iconSize={14} formatter={(value, entry) => (<span style={{"font-size":28}}>{" " + value}</span>)}/>
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
            <span>The value in this chart is the SUPERB score of each task, which is (metrics - baseline) &divide; (SOTA - baseline) &times; 1000</span>
            <div>Note: <HashLink to="challenge-slt2022/metrics#Reference-points">The SOTA and the baseline</HashLink> are predefined for each task and will not be changed during the challenge.</div>
          </Grid>
        </Grid>
    </Section>
  )
}

export { ModelScatterChart, ModelRadarChart };