import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TableRowsType } from '../vite-env';

type Props ={
    columns:GridColDef[],
    rows:TableRowsType[]
}

const AdminTable = ({columns,rows}:Props) => {
  return (
    <div style={{ height: 300, width: '100%' }}>
    <DataGrid 
    columns={columns} 
    rows={rows}
    
    />
  </div>
  )
}

export default AdminTable

