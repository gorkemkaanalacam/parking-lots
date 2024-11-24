import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { ParkingLot } from '../../types/interfaces';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 80 },
  { field: 'rating', headerName: 'Rating', width: 80 },
  { field: 'size', headerName: 'Size', width: 80 },
  { field: 'status', headerName: 'Status', width: 80 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable(props: { choices: ParkingLot[] }) {
  return (
    <Paper sx={{ flexGrow: 1 }}>
      <DataGrid
        rows={props.choices}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
