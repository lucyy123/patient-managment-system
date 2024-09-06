import {
  CalendarTodayOutlined,
  CheckCircleOutlineOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Heading from "../Components/shared/Heading";
import logo from "../assets/doctor.avif";
import { Link } from "react-router-dom";

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

      <Stack
        gap={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: {xs:'4rem',md:"8rem"},
        }}
      >
        <CheckCircleOutlineOutlined
          sx={{
            height: "4.68rem",
            width: "4.68rem",
            color: theme.palette.primary.main,
          }}
        />
        {/* ------------------ success message----------------------------- */}

        <Typography variant="h4" fontWeight={700} fontSize={{xs:'1.3rem',md:'2.3rem'}}>
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
        {/* ------------------ sub titile----------------------------- */}

        <Typography color={theme.palette.text.secondary} fontSize={{xs:'0.7rem',md:'1.2rem'}}>
          We'll be in touch shortly to confirm.
        </Typography>

        {/* ------------------ show Date for appointment----------------------------- */}

        <Stack
          direction={"row"}
          gap={{xs:1,md:2}}
          sx={{
            borderTop: "1px solid #363A3D99",
            borderBottom: "1px solid #363A3D99",
            py: {xs:'0.8rem',md:"2rem"},
          }}
        >
          <Typography color={theme.palette.text.secondary} fontSize={{xs:'0.8rem',md:'1.5rem'}}>
            Requested Appointment Details
          </Typography>

          <Button
            variant="outlined"
            sx={{
              display:'flex',
              flexDirection:{xs:'column',md:'row'},
              textTransform: "none",
              color: "#fff",
              gap: {xs:0,md:1},
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={logo}
              sx={{
                width: {xs:25,md:30},
                height: {xs:25,md:30},
             
              }}
              
            />
            Dr.Atifa Khan
          </Button>

          <Box
            sx={{
              display: "flex",
              flexDirection:{xs:'column',md:'row'},
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <CalendarTodayOutlined
              sx={{
                color: "#CDCECF",
                marginInline: "0.23rem",
                background: "none",
              }}
            />{" "}
            23 June 2024 - 5:00 PM{" "}
          </Box>
        </Stack>
      </Stack>
      <Link to={"/appointment"}>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            color: "#ffff",
            mt: 5,
          }}
        >
          {" "}
          New Appointment
        </Button>
      </Link>
    </Container>
  );
};

export default Success;
