import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  DataGrid,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
} from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import { Typography, Box } from '@material-ui/core';


function CustomToolbar() {
  return (
    <Box margin="5px 10px">
      <GridToolbarContainer>
        <GridColumnsToolbarButton />
        <GridFilterToolbarButton />
      </GridToolbarContainer>
    </Box>
  );
}


export default function BasicSortingGrid(props) {
  const { submissions } = props;
  let rows = submissions.map((row, index) => (
    {
      id: index,
      ...row
    }
  ));

  const infoColumns = ["Method"]
  const scoreColumns = ["PR", "KS", "IC", "SID", "ER", "ASR", "ASR-LM", "QbE", "SF-F1", "SF-CER", "SV", "SD"]
  const scoreSort = ["asc", "dsc", "dsc", "dsc", "dsc", "asc", "asc", "dsc", "dsc", "asc", "asc", "asc"]
  let columns = Object.keys(submissions[0]).map((column) => {
    let scoreWidth = 81 + (column.length - 2) * 10;
    return {
      field: column,
      type: typeof (submissions[0][column]),
      hide: !(infoColumns + scoreColumns).includes(column),
      width: scoreColumns.includes(column) ? scoreWidth : 130,
    }
  })
  let randomIndex = Math.floor(Math.random() * scoreColumns.length);

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={rows}
        disableColumnMenu={true}
        density="compact"
        components={{
          Toolbar: CustomToolbar,
        }}
        sortModel={[
          {
            field: scoreColumns[randomIndex],
            sort: scoreSort[randomIndex],
          },
        ]}
      />
    </div>
  );
}
