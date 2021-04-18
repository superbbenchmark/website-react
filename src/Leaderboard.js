import React from "react";
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

import { submissions } from "./Data";
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
    setHiddenColumns,
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
                return (
                  <div
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="th"
                  >
                    {column.render("Header")}
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
  const columnWidth = {
    Method: 120,
    Description: 120,
    Parameters: 100,
    Stride: 100,
    Input: 100,
    Corpus: 100,
    PR: 100,
    KS: 100,
    IC: 100,
    SID: 100,
    ER: 100,
    ASR: 100,
    "ASR-LM": 100,
    QbE: 100,
    "SF-F1": 100,
    "SF-CER": 100,
    SV: 100,
    SD: 100,
  };

  let columns = Object.keys(columnWidth).map((key) => {
    return {
      Header: key,
      accessor: key,
      width: columnWidth[key],
    };
  });
  columns[0]["sticky"] = "left";

  const memoColumns = React.useMemo(() => columns);

  const longerData = submissions.concat(submissions).concat(submissions);
  const memoData = React.useMemo(() => submissions, []);

  return <Table columns={memoColumns} data={memoData} {...props} />;
}

export default LeaderBoard;
