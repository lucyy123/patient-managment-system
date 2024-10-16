import { Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { theme } from '../utils/theme';
import { TableRowsType } from '../vite-env';

type Props ={
    columns:GridColDef[],
    rows:TableRowsType[]
}

const AdminTable = ({columns,rows}:Props) => {
  return (
    <div style={{ height: 300, width: '100%' }}>

 {  rows &&  rows.length> 0 ? (  <DataGrid 
    columns={columns} 
    rows={rows}
    autoPageSize
    />):(

      <div style={{
        height:'100%',
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}>

        <Typography variant="h6" sx={{
          color:theme.palette.primary.main
         
        }}> You Don't have any Appointment yet </Typography>

      
      </div>
    )
  }
  </div>
  )
}

export default AdminTable

