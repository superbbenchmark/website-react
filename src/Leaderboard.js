import React from "react";
import { useTable, useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";

import { submissions } from "./Data";
import "./Leaderboard.scss";

function Table({ columns, data, height = "500px" }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 10,
      width: 150,
      maxWidth: 400,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useSticky
  );

  return (
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
            {headerGroup.headers.map((column) => (
              <div {...column.getHeaderProps()} className="th">
                {column.render("Header")}
              </div>
            ))}
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
  );
}

function LeaderBoard(props) {
  const columnWidth = {
    Method: 120,
    Description: 120,
    Parameters: 60,
    Stride: 50,
    Input: 80,
    Corpus: 80,
    PR: 50,
    KS: 50,
    IC: 50,
    SID: 50,
    ER: 50,
    ASR: 50,
    "ASR-LM": 70,
    QbE: 70,
    "SF-F1": 50,
    "SF-CER": 80,
    SV: 50,
    SD: 50,
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
  const memoData = React.useMemo(() => longerData, []);

  return <Table columns={memoColumns} data={memoData} {...props} />;
}

export default LeaderBoard;
