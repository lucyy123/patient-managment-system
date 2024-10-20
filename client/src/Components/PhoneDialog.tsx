import { CallOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Dispatch, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DialogHeader from "../pages/admin/DialogHeader";
import { useLoginUserMutation } from "../redux/apis/userApi";
import { userExist } from "../redux/reducers/user";
import { LoginUserResType } from "../vite-env";
import DialogComponent from "./Dialog";

type Props = {
  open?: boolean;
  handelOpen: Dispatch<React.SetStateAction<boolean>>;
  openOTPDialog: boolean;
  hanldeOpenOTPDialog: Dispatch<React.SetStateAction<boolean>>;
};

const PhoneDialoge = ({ handelOpen, open = true }: Props) => {
  const [phoneNumber, SetPhoneNumber] = useState("");
  const [dailogueOpen, setDailogueOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState<boolean>();

  //*---------------------------------- H A N L D L E R S-------------------------------------
  //* 1.----------FOR SUBMIT------------
  const handleOTPSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser({ phoneNumber }).unwrap();
      // success = true --> user is verified and token will be store
      if (res.success) {
        toast.success(res.message);
        dispatch(userExist(res.user!));
        handelOpen(false);
        if (res.user?.isCompleted) {
          navigate("/appointment");
        } else {
          navigate("/patient");
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("error:", error);
      const err = error as FetchBaseQueryError;
      const data = err.data as LoginUserResType;
      toast.error(data.message);
      if (data.message.includes("we")) return setDailogueOpen(true);
      // redirect user to otp section

      setLoading(false);
      // catchError(error,UserRegistrationResMsg)
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => handelOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: handleOTPSubmit,
          sx: {
            backgroundColor: theme.palette.background.default,
            padding: { xs: 1, md: 2 },
            borderRadius: "16px",
            width: { xs: "85%", md: "100%" },
          },
        }}
      >
        <DialogHeader
          title="Enter Mobile Number"
          subtitle="Please enter your registered mobile number."
          handelOpen={handelOpen}
        />

        <DialogContent>
          <Box>
            <TextField
              placeholder="Enter Your Number"
              size="small"
              sx={{
                border: "1px solid",
              }}
              fullWidth
              name="phoneNumber"
              required={true}
              value={phoneNumber}
              onChange={(e) => SetPhoneNumber(e.target.value)}
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

          {/* */}

          <Button
            fullWidth
            type="submit"
            sx={{
              marginTop: "1.7rem",
              textTransform: "none",
              color: theme.palette.text.primary,
            }}
            variant="contained"
          >
            {loading ? (
              <CircularProgress
                size={27}
                sx={{
                  color: "#fff",
                }}
              />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogContent>
      </Dialog>

      <DialogComponent
        open={dailogueOpen}
        handelOpen={setDailogueOpen}
        phoneNumber={phoneNumber}
        title={"Re-Sent OTP"}
        subtitle={"we have sent you a new OTP on your mobile,"}
        routeName={"/patient"}
      />
    </>
  );
};

export default PhoneDialoge;
