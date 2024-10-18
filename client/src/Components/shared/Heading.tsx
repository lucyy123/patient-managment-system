import { Logout } from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";
import LogoutComponent from "./Logout";
import { useState } from "react";
import { useLogoutUserQuery } from "../../redux/apis/userApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userNotExist } from "../../redux/reducers/user";

type Props ={
  showLogout?:boolean
}

const Heading = ({showLogout=false}:Props) => {
  const [open,setOpen] = useState<boolean>(false)
  const {refetch:logoutUser}=useLogoutUserQuery('')
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = async ()=>{
try {
  
  const res = await logoutUser().unwrap()
  if(res.success){
    toast.success(res.message)
    dispatch(userNotExist())
    navigate('/')
  }
} catch (error) {
  console.log('error:', error)
  
}
  }
  return (
   
    <Box>
      <Stack direction={'row'} >

    <Stack direction={"row"} gap={1}>
      <Paper
        elevation={2}
        sx={{
          padding: "0.2rem",
          height: "32px",
          width: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "lightgray",
        }}
        >
        <img
          src={'/logo.png'}
          alt="health_logo"
          style={{
            height: "30px",
            width: "30px",
          }}
          />
      </Paper>
      <Typography variant="h4" fontWeight={"700"} fontSize={"1.5rem"}>
        Care Plus
      </Typography>
    </Stack>

     { showLogout &&( 
      <div style={{
        marginLeft:'auto'
      }}>

      <LogoutComponent dialogue = {open} setDialogue={setOpen} handleLogout={handleLogout} Boxposition="relative"/>
      
      </div>
      )}
          </Stack>
  </Box>

  )
}

export default Heading
