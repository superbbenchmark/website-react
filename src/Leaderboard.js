import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import { Typography } from '@material-ui/core';

export default function BasicSortingGrid(props) {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 6,
  });
  const { submissions } = props;

  debugger;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        {...data}
        sortModel={[
          {
            field: 'commodity',
            sort: 'asc',
          },
        ]}
      />
    </div>
  );
}
