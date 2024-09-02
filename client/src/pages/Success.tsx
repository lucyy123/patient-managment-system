import { CalendarTodayOutlined, CheckCircleOutlineOutlined } from "@mui/icons-material";
import { Avatar, Button, Container, Stack, Typography, useTheme } from "@mui/material";
import Heading from "../Components/shared/Heading";
import logo from "../assets/doctor.avif";

const Success = () => {
  const theme = useTheme();
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        my: "2rem",
      }}
    >
      {/* ---------------- header----------------------- */}
      <Heading />

      {/* ------------------ check mark logo----------------------------- */}

      <Stack gap={3} 
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: "8rem",
          }}>
        <CheckCircleOutlineOutlined
          sx={{
            height: "4.68rem",
            width: "4.68rem",
            color: theme.palette.primary.main,
          }}
        />

        <Typography variant="h4" fontWeight={700} fontSize={"2.3rem"}>
          {" "}
          Your
          <span
            style={{
              color: theme.palette.primary.main,
            }}
          >
            {" "}
            appointment request
          </span>{" "}
          has
          <br />
          been successfully submitted!
        </Typography>


        <Typography color={theme.palette.text.secondary}>
        We'll be in touch shortly to confirm.
        </Typography>



<Stack direction={'row'} gap={2} sx={{
    borderTop:'1px solid #363A3D99',
    borderBottom:'1px solid #363A3D99',
    py:"2rem"
}}>

<Typography color={theme.palette.text.secondary} fontSize={'1.5rem'}>
    Requested Appointment Details
</Typography>


<Button variant="outlined" sx={{
    textTransform:"none",
    color:'#fff',
    gap:1
}}> 

<Avatar alt="Remy Sharp" src={logo} sx={{
    width:30,
    height:30
}} />
Dr.Atifa Khan



</Button>

<span style={{
    display:"flex",
    justifyContent:'center',
  alignItems:'center'  
}}>   <CalendarTodayOutlined
                              sx={{
                                color: "#CDCECF",
                                marginInline: "0.23rem",
                                background: "none",
                              }}
                            />  23 June 2024 - 5:00 PM </span>
</Stack>

      </Stack>

      {/* ------------------ success message----------------------------- */}
      {/* ------------------ sub titile----------------------------- */}
      {/* ------------------ show Date for appointment----------------------------- */}
    </Container>
  );
};

export default Success;
