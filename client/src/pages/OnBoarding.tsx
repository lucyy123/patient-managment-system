import { CallOutlined, MailOutline, PersonOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FormEvent, useState } from "react";
import logo from "../assets/logo.png";
import onboardinimage from "../assets/onboarding.png";
import DialogComponent from "../Components/Dialog";

const OnBoarding = () => {
  const theme = useTheme();
  const [open,setOpen] = useState(false)

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
setOpen(true)
  };

  return (
    <Stack
      direction={"row"}
      sx={{
        // flexDirection: { xs: "column" },
        borderRadius: "2px solid",
      }}
      width={"100%"}
      height={"100vh"}
    >
      {/* --------left side------- --- */}
      <Box width={"50%"} padding={"2rem 6rem"}>
        {/* ------------logo---------- */}

        <Box>
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
                src={logo}
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
        </Box>
{/* ---------------------- content------------------------------- */}
        <Box marginTop={13}>
          {/* ------------title---------- */}
          <Typography variant="h4" fontSize={"2.1rem"}>
            Hi there,...
          </Typography>
          {/* ------------sub title---------- */}
          <Typography variant="subtitle1" fontSize={"1rem"} color="#ABB8C4">
            {" "}
            Get Started with Appointments.
          </Typography>

          {/* ------------form---------- */}

          <Box marginTop={5}>
            <form onSubmit={handleSubmit}>
              <Stack
                gap={3}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "0.8rem",
                    color: theme.palette.text.secondary,
                    marginBottom: "0.38rem",
                  },

                  "& .MuiTextField-root": {
                    bgcolor: "#1A1D21",
                    border: "1px solid ",
                    borderRadius: "8px",
                    color: "#CDCECF",
                  },
                }}
              >
                {/* ------------full name---------- */}

                <Box>
                  <Typography>Full Name</Typography>
                  <TextField
                    placeholder="Enter Your Name"
                    size="small"
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="start"
                            >
                              {/* ----------------- user icon---------------- */}
                              <PersonOutline
                                sx={{
                                  color: "#CDCECF",
                                  marginInline: "0.23rem",
                                  background: "none",
                                }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Box>

                {/* ------------email address---------- */}

                <Box>
                  <Typography>Email Address</Typography>
                  <TextField
                    placeholder="Enter Your Email"
                    size="small"
                    fullWidth
                    slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                aria-label="toggle password visibility"
                                edge="start"
                              >
                                {/* ----------------- user icon---------------- */}
                                <MailOutline
                                  sx={{
                                    color: "#CDCECF",
                                    marginInline: "0.23rem",
                                    background: "none",
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                  />
                </Box>
                {/* ------------Phone Number---------- */}

                <Box>
                  <Typography>Phone Number</Typography>
                  <TextField
                    placeholder="Enter Your Number"
                    size="small"
                    fullWidth
                    slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                aria-label="toggle password visibility"
                                edge="start"
                              >
                                {/* ----------------- user icon---------------- */}
                                <CallOutlined
                                  sx={{
                                    color: "#CDCECF",
                                    marginInline: "0.23rem",
                                    background: "none",
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                  />
                </Box>
                {/* ------------Get Started button---------- */}

                <Button
            type="submit"
                  sx={{
                    mt: "1.5rem",
                    color: "white",
                    textTransform:"none"
                  }}
                  variant="contained"
                  fullWidth
                >
                  Get Started
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>


      {/*-------------------------------- copyright ----------------------- */}
      <Typography variant="body2" fontSize={"0.7rem"} sx={{
        color:theme.palette.text.secondary,
        marginTop:"6.6rem"
        
      }}>@careplus copyright</Typography>

      </Box>


      {/* --------right side ------------- */}
      <Box width={"50%"} height={"100vh"}>
        {/* ----------- image ----------- */}
        <Box sx={{
            width:"100%",
            height: "100%" 
        }}>
        <img
          src={onboardinimage}
          alt="onboarding_image"
          style={{
              width: "100%",
              height: "95%",  // Set the height to 100% of the parent container
              borderRadius: "24px",
            //   height: "1000px",
              objectFit: "cover",
            }}
            />
            </Box>
      </Box>
<DialogComponent open={open} handelOpen={setOpen} />
    </Stack>
  );
};

export default OnBoarding;
