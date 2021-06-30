import React, { useState, useEffect } from "react"
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
import { useTheme, fade } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { blueGrey, grey, red, orange, green } from "@material-ui/core/colors";

import { submissions, submission_types } from "./Data";
import Model from "./components/Modal";

const Styles = styled.div`
  .table {
    outline: 1px solid #ddd;

    .th,
    .td {
      background-color: ${(props) => props.theme.palette.primary.main};
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      border: 0.2px solid #ddd;
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
  const scores = columns.filter((item) => item.isScore);
  const randomColumn = scores[Math.floor(Math.random() * scores.length)];
  const defaultSortby = React.useMemo(() => [
    {
      id: randomColumn.accessor,
      desc: randomColumn.higherBetter,
    },
  ]);

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        hiddenColumns: [
          "Description",
          "Parameters",
          "Stride",
          "Input",
          "Corpus",
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

function LeaderBoard(props) {
  const theme = useTheme();
  const [LeaderboardData, setLeaderboardData] = useState([]);
  const columnInfo = {
    Method: {
      width: 120,
      higherBetter: undefined,
    },
    Description: {
      width: 120,
      higherBetter: undefined,
    },
    Parameters: {
      width: 100,
      higherBetter: undefined,
    },
    Stride: {
      width: 100,
      higherBetter: undefined,
    },
    Input: {
      width: 100,
      higherBetter: undefined,
    },
    Corpus: {
      width: 100,
      higherBetter: undefined,
    },
    PR: {
      width: 100,
      higherBetter: false,
      isScore: true,
    },
    KS: {
      width: 100,
      higherBetter: true,
      isScore: true,
    },
    IC: {
      width: 100,
      higherBetter: true,
      isScore: true,
    },
    SID: {
      width: 100,
      higherBetter: true,
      isScore: true,
    },
    ER: {
      width: 100,
      higherBetter: true,
      isScore: true,
    },
    ASR: {
      width: 100,
      higherBetter: false,
      isScore: true,
    },
    "ASR-LM": {
      width: 100,
      higherBetter: false,
      isScore: true,
    },
    QbE: {
      width: 100,
      higherBetter: true,
      isScore: true,
    },
    "SF-F1": {
      width: 100,
      higherBetter: true,
      isScore: true,
    },
    "SF-CER": {
      width: 100,
      higherBetter: false,
      isScore: true,
    },
    SV: {
      width: 100,
      higherBetter: false,
      isScore: true,
    },
    SD: {
      width: 100,
      higherBetter: false,
      isScore: true,
    },
  };

  const memoizedNumericSort = React.useCallback(
    (rowA, rowB, columnId, desc) => {
      const valueA = rowA.original[columnId];
      const valueB = rowB.original[columnId];
      return valueA > valueB ? 1 : -1;
    }
  );

  const getLeaderboard = () => {
    axios.get("http://localhost:5000/api/result/leaderboard")
    .then((res) => { 
        //console.log(res.data.leaderboard)
        setLeaderboardData(res.data.leaderboard);
    })
    .catch((error) => { console.error(error) })
  }

  useEffect(() => {
    getLeaderboard();
  },[]);

  let columns = Object.keys(columnInfo).map((key) => {
    return {
      Header: key,
      accessor: key,
      width: columnInfo[key].width,
      sortType:
        typeof submission_types[key] == "number"
          ? memoizedNumericSort
          : "alphanumeric",
      higherBetter: columnInfo[key].higherBetter,
      isScore: columnInfo[key].isScore,
    };
  });
  columns[0]["sticky"] = "left";

  const memoColumns = React.useMemo(() => columns);
  //const memoData = React.useMemo(() => submissions, []);

  return <Table columns={memoColumns} data={LeaderboardData} {...props} />;
}

export default LeaderBoard;
