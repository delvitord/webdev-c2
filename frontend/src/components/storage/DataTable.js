import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { createTheme, ThemeProvider, CssBaseline} from "@mui/material";


const themeLight = createTheme();
const themeDark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
  },
});

export default function DataTable({ rows, columns, isDarkMode }) {
  const theme = isDarkMode ? themeDark : themeLight;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        disableColumnMenu
        columnHeaderHeight={60}
        checkboxSelection
        cellModesModel={1}
        disableSelectionOnClick
        pageSize={5}
        rowsPerPageOptions={[5]}
        slots={{
          toolbar: GridToolbar,
        }}
        // Customize row styling
        sx={{
          [`& .MuiDataGrid-row`]: {
            backgroundColor: theme.palette.background.default,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          },
        }}
      />
    </ThemeProvider>
  );
}
