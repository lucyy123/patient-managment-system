import { CallOutlined, MailOutline, PersonOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Hidden,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FormEvent, useState } from "react";
import onboardinimage from "../assets/onboarding.png";
import DialogComponent from "../Components/Dialog";
import Heading from "../Components/shared/Heading";
import { Link } from "react-router-dom";

const OnBoarding = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        overflow: { xs: "none", md: "hidden" },
        width: { xs :"100%", md: "100%" },
        height: { xs: "100vh", md: "100vh" },
      }}
    >
      {/* --------left side------- --- */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          padding: { xs: " 3rem 1.5rem", md: "2rem 6rem" },
        }}
      >
        {/* ------------logo---------- */}

        <Heading />

        {/* ---------------------- content------------------------------- */}
        <Box  sx={{
          marginTop:{xs:6,md:13}
        }}>
          {/* ------------title---------- */}
          <Typography variant="h4" fontSize={"2.1rem"} fontWeight={'bold'}>
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
                              {/* ----------------- Mail icon---------------- */}
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
                    textTransform: "none",
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
        <Stack
          direction={"row"}
          sx={{
            marginTop:{xs:'3.3rem', md:"6.6rem"},
          }}
        >
          <Typography
            marginRight={"auto"}
            variant="body2"
            fontSize={"0.7rem"}
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            @careplus copyright
          </Typography>
          <Link to={"/admin/dashboard"}>
            <Typography
              variant="body2"
              fontSize={"0.7rem"}
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              Admin
            </Typography>
          </Link>
        </Stack>
      </Box>

      {/* --------right side ------------- */}
      <Box
        sx={{
          paddingInline:{xs:'1.5rem'},
          width: { xs: "100%", md: "50%" },
          height: { xs: "1000px", md: "100vh" },
        }}
      >
        {/* ----------- image ----------- */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={onboardinimage}
            alt="onboarding_image"
            style={{
              width: "100%",
              height: "100%",
              // borderRadius: "24px",
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
