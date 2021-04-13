import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import { Typography, Box } from '@material-ui/core';


function PlacedToolBar(props) {
  return (
    <Box marginLeft="10px">
      <GridToolbar {...props} style={{ fontWeight: "bold" }} />
    </Box>
  )
}


export default function BasicSortingGrid(props) {
  const { submissions } = props;
  let rows = submissions.map((row, index) => (
    {
      id: index,
      ...row
    }
  ));
  let columns = Object.keys(submissions[0]).map((column) => ({
    field: column,
    type: typeof (submissions[0][column]),
    hide: ![
      "Method",
      "Description",
      "Parameters",
      "PR",
      "KS",
      "IC",
      "SID",
      "ER",
      "ASR",
      "QbE",
      "SF",
      "SV",
      "SD",
    ].includes(column),
  }))

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={rows}
        disableColumnMenu={true}
        components={{
          Toolbar: PlacedToolBar,
        }}
        sortModel={[
          {
            field: 'ASR',
            sort: 'asc',
          },
        ]}
      />
    </div>
  );
}
