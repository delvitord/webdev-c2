import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({
  rows,
  columns,
}) {
  return (
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
  );
}
