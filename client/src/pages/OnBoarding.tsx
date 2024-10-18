import { CallOutlined, MailOutline, PersonOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import DialogComponent from "../Components/Dialog";
import PhoneDialoge from "../Components/PhoneDialog";
import Heading from "../Components/shared/Heading";
import { useUserRegisterMutation } from "../redux/apis/userApi";
import { userExist, userNotExist } from "../redux/reducers/user";
import DialogPasskey from "./admin/PasskeyDialogue";

const OnBoarding = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>();
  const [openAdmin,setOpenAdmin] = useState<boolean>(false)

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [userRegister] = useUserRegisterMutation();
  const dispatch = useDispatch();

  //?----------------------- handlers--------------------------------
  //* ---------- FOR SUBMITTING FORM
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await userRegister(userDetails).unwrap();
      toast.success(res.message.toString());
      console.log("res.message:", res.message);
      dispatch(userExist(res.user!));
      setOpen(true); // opne the OTP dialogue
      setLoading(false);
    } catch (error) {
      console.log("error:", error);
      toast.error("user already register");
      setLoading(false);
    }
  };
  //*-------------- FOR ONCHANGING----------------------

  const hanldeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserDetails({ ...userDetails, [name]: value });
  };

  //*---------------------------FOR LOGIN------------------
  const hanldeLogin = () => {
    setPhoneOpen(true);
  };

 //*-----------------FOR ADMIN -----------------
 const hanldeAdminDialogue = ()=>{
  setOpenAdmin(true)
 }
 useEffect(()=>{
  dispatch(userNotExist())
 },[dispatch])




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
                              {/* ----------------- phone icon---------------- */}
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
                  {loading ? (
                    <CircularProgress
                      size={27}
                      sx={{
                        color: "#fff",
                      }}
                    />
                  ) : (
                    "Get Started"
                  )}
                </Button>

                <Button
                  onClick={hanldeLogin}
                  sx={{
                    color: "white",
                    textTransform: "none",
                  }}
                  variant="outlined"
                  fullWidth
                >
                  Already Register  <span style={{
                    color:theme.palette.primary.main,
                    fontWeight:'600',
                    marginLeft:"1rem"
                  }}>Try Login </span> 
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>

        {/*-------------------------------- copyright ----------------------- */}
        <Stack
          direction={"row"}
          sx={{
            marginTop: { xs: "3.3rem", md: "3.6rem" },
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
          <Box  onClick={hanldeAdminDialogue} sx={{
            cursor:'pointer'
          }}>
            <Typography
              variant="body2"
              fontSize={"0.7rem"}
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              Admin
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* -------------------------------------right side --------------------------------- */}
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
            src={"/onboarding.png"}
            alt="onboarding_image"
            style={{
              width: "100%",
              height: "100%",

              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
      <DialogComponent
        open={open}
        handelOpen={setOpen}
        phoneNumber={userDetails.phoneNumber}
        title = {"Verify OTP"}
        subtitle={ "Please enter the OTP sent to your registered mobile number."}
        routeName={'/patient'}
      />
      <DialogPasskey
        open={openAdmin}
        handelOpen={setOpenAdmin}
        title = {"Admin Access"}
        routeName={'admin/dashboard'}
        subtitle={ "Please enter your Passkey ."}
      />
      <PhoneDialoge
        open={phoneOpen}
        handelOpen={setPhoneOpen}
        hanldeOpenOTPDialog={setOpen}
        openOTPDialog={open}
      />
    </Stack>
  );
};

export default OnBoarding;
