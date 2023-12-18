import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'phone', headerName: 'Phone', width: 130 },
  { field: 'address', headerName: 'Address', width: 130 },
];

const rows = [
  { id: 1, name: 'Snow', email: 'Jon', phone: 35, address: "123123" }
];

export default function Customer() {
  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>

    </>
  );
}