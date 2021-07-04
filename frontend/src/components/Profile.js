import React, { useState, useEffect, useContext } from "react"
import axios from "axios";
import styled from "styled-components";
import {
  useTable,
  useBlockLayout,
  useSortBy,
  useResizeColumns,
  useGlobalFilter,
} from "react-table";
import { useSticky } from "react-table-sticky";
import { capitalizeFirstLetter } from "./Utilies";
import { Typography, Button, TextField } from "@material-ui/core";
import { useTheme, fade, ThemeProvider } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { blueGrey, grey, red, orange, green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckIcon from '@material-ui/icons/Check';
import Checkbox from '@material-ui/core/Checkbox';
import CropSquareIcon from '@material-ui/icons/CropSquare';
import { individual_submission_columnInfo, tracks } from "../Data";
import { AuthContext } from "../context/auth-context";
import swal from "sweetalert";
import Model from "./Modal";
import config from "../config.json";

const Styles = styled.div`
  .table {
    outline: 1px solid #ddd;

    .click-btn {
      cursor: pointer;
    }

    .th,
    .td {
      background-color: ${(props) => props.theme.palette.primary.main};
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      border: 0.2px solid #ddd;
      vertical-align: middle;
      padding: ${(props) => props.theme.spacing(1, 1)};
    }

    .th {
      font-weight: bold;
      padding: ${(props) => props.theme.spacing(1.5, 1)};
    }

    .toggle {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }

      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }

      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 2px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px -2px 3px #ccc;
      }
    }
  }

  .resizer {
    display: inline-block;
    background: ${(props) => `${fade(props.theme.palette.text.primary, 0.2)}`};
    width: ${(props) => `${props.theme.spacing(2)}px`};
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%);
    z-index: 1;
    ${"" /* prevents from scrolling while dragging on touch devices */}
    touch-action:none;

    &.isResizing, &:hover {
      background: ${(props) =>
        `${fade(props.theme.palette.text.primary, 0.6)}`};
    }
`;

function Table({ columns, data, height = "500px", tableControlRef = null }) {
  const theme = useTheme();
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 10,
      width: 150,
      maxWidth: 400,
    }),
    []
  );
  const defaultSortby = React.useMemo(() => [
    {
      id: "aoeTimeUpload",
      desc: true,
    },
  ]);

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        hiddenColumns: [
          "modelDesc",
          "modelURL",
          "stride",
          "inputFormat",
          "corpus",
          "paramDesc",
          "paramShared",
          "fineTunedParam",
          "taskSpecParam",
          "stateInfo",
          "submitUUID",
        ],
        sortBy: defaultSortby,
      },
    },
    useSortBy,
    useBlockLayout,
    useResizeColumns,
    useSticky
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <Styles theme={theme}>
      <Model tableInstance={tableInstance} modalOpenRef={tableControlRef} />
      <div
        {...getTableProps()}
        className="table sticky"
        style={{
          width: "fit-content",
          maxWidth: "100%",
          maxHeight: height,
          margin: "auto",
        }}
      >
        <div className="header">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => {
                let color =
                  column.isSortedDesc == undefined ||
                  column.higherBetter == undefined
                    ? theme.palette.text.primary
                    : column.isSortedDesc == column.higherBetter
                    ? green[300]
                    : red[300];

                return (
                  <div {...column.getHeaderProps()} className="th">
                    <div {...column.getSortByToggleProps()} className="toggle">
                      <span style={{ margin: "0px 1px", color: color }}>
                        {column.render("Header")}
                      </span>
                      {column.higherBetter != undefined &&
                        (column.higherBetter ? (
                          <ArrowUpwardIcon
                            style={{ fontSize: 16, color: color }}
                          />
                        ) : (
                          <ArrowDownwardIcon
                            style={{ fontSize: 16, color: color }}
                          />
                        ))}
                    </div>
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? "isResizing" : ""
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()} className="body">
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map((cell) => {
                  return (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render("Cell")}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Styles>
  );
}

function Profile(props) {
  const theme = useTheme();
  const auth = useContext(AuthContext);
  const [allSubmissionData, setAllSubmissionData] = useState([]);
  const [shownData, setShownDate] = useState([]);
  const [task, setTask] = useState("constrained");
  
  const memoizedNumericSort = React.useCallback(
    (rowA, rowB, columnId, desc) => {
      const valueA = rowA.original[columnId];
      const valueB = rowB.original[columnId];
      return valueA > valueB ? 1 : -1;
    }
  );

  const mapping_array = {"CONSTRAINED":"constrained", "LESS_CONSTRAINED":"less-constrained", "UNCONSTRAINED":"unconstrained"}

  const getIndividualSubmission = async () => {
    await axios({
        method:"get",
        url: `${config.SERVER_URL}/api/result/individual`,
        headers: {
            Authorization: "Bearer " + auth.token,
        },
    })
    .then((res) => { 
        console.log(res.data.submission_info)
        setAllSubmissionData(res.data.submission_info);
        setShownDate(res.data.submission_info.filter(data => mapping_array[data.task] === task))
    })
    .catch((error) => { console.error(error) })
  }
  
  const onTaskChange = (e) => {
    setTask(e.target.value);
    setShownDate(allSubmissionData.filter(data => mapping_array[data.task] === e.target.value))
  }
 
  const setShowOnLeaderboard = async (submission_id) => {
    await axios({
      method:"post",
      url: `${config.SERVER_URL}/api/result/shown`,
      headers: {
          Authorization: "Bearer " + auth.token,
      },
      data: {
        task: task,
        submission_id: submission_id,
      },
    })
    .then((res) => { 
      swal({ text: "Shown on the leaderboard!", icon: "success" });
      getIndividualSubmission();
    })
    .catch((error) => { 
      console.error(error) 
      swal({ text: error, icon: "error" });
    })
  }
  const parseShowCell = ({row, value}) => {
    if (value === "NO") return <CropSquareIcon className="click-btn" onClick={() => setShowOnLeaderboard(row.allCells[15].value)}></CropSquareIcon>
    else return <CheckIcon style={{ color: green[500] }}></CheckIcon>
  }

  useEffect(() => {
    getIndividualSubmission();
  },[]);

  let columns = Object.keys(individual_submission_columnInfo).map((key) => {
    return {
      Header: individual_submission_columnInfo[key].header,
      accessor: key,
      width: individual_submission_columnInfo[key].width,
      sortType: individual_submission_columnInfo[key] == "number" ? memoizedNumericSort : "alphanumeric",
      higherBetter: individual_submission_columnInfo[key].higherBetter,
      isScore: individual_submission_columnInfo[key].isScore,
      Cell: key === "showOnLeaderboard" ? parseShowCell : ({value}) => String(value)
    };
  });
  columns[0]["sticky"] = "left";

  const memoColumns = React.useMemo(() => columns);

  return (
  <>
    <div className="select group" style={{width: "fit-content", maxWidth: "100%", margin: "auto",}}>
        <RadioGroup row aria-label="position" name="position" defaultValue="constrained" value={task} onChange={onTaskChange}>
            {tracks.map((track) => {
                return (
                    <ThemeProvider theme={track.theme}>
                        <FormControlLabel
                            value={track.name}
                            control={<Radio color="primary" />}
                            label={
                                <Typography color="primary">
                                    {capitalizeFirstLetter(
                                        track.name.toLowerCase()
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
    <Table columns={memoColumns} data={shownData} {...props} />
  </>);
}

export default Profile;
