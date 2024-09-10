import { CallOutlined, MailOutline, PersonOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FormEvent, useState } from "react";
import DialogComponent from "../Components/Dialog";
import Heading from "../Components/shared/Heading";
import { Link } from "react-router-dom";
import { useUserRegisterMutation } from "../redux/apis/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { UserRegistrationResMsg } from "../vite-env";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist } from "../redux/reducers/user";

const OnBoarding = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [userRegister] = useUserRegisterMutation();
  const dispatch = useDispatch()


  //?----------------------- handlers--------------------------------
  //* ---------- FOR SUBMITTING FORM
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        setOpen(true); // opne the OTP dialogue
    try {
      const res = await userRegister(userDetails).unwrap();
      if (res.success) {
        toast.success(res.message.toString());
        console.log('res.message:', res.message)
        dispatch(userExist(res.user!))
        setOpen(true); // opne the OTP dialogue
      }

    } catch (error) {
      console.log("error:", error);
      const err = error as FetchBaseQueryError;
      const data = err.data as UserRegistrationResMsg;
      toast.error(data.message);
    }
  };
  //*-------------- FOR ONCHANGING

  const hanldeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserDetails({ ...userDetails, [name]: value });
  };

  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        overflow: { xs: "none", md: "hidden" },
        width: { xs: "100%", md: "100%" },
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
        <Box
          sx={{
            marginTop: { xs: 6, md: 13 },
          }}
        >
          {/* ------------title---------- */}
          <Typography variant="h4" fontSize={"2.1rem"} fontWeight={"bold"}>
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
                    name="name"
                    value={userDetails.name}
                    required={true}
                    onChange={hanldeChange}
                  
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
                                  marginInline: "0.2rem",
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
                    name="email"
                    required={true}
                    value={userDetails.email}
                    onChange={hanldeChange}
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
                                  marginInline: "0.2rem",
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
                    name="phoneNumber"
                    required={true}
                    value={userDetails.phoneNumber}
                    onChange={hanldeChange}
                
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
                                  marginInline: "0.2rem",
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
            marginTop: { xs: "3.3rem", md: "6.6rem" },
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
          display: { xs: "none", md: "block" },
          paddingInline: { xs: "1.5rem" },
          width: "50%",
          height: "100vh",
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
            src={'/onboarding.png'}
            alt="onboarding_image"
            style={{
              width: "100%",
              height: "100%",

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
