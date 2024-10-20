import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Dispatch, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DialogHeader from "../pages/admin/DialogHeader";
import { useVerifyUserMutation } from "../redux/apis/userApi";
import { userExist } from "../redux/reducers/user";
import { UserRegistrationResMsg } from "../vite-env";


type Props = {
  open?: boolean;
  handelOpen: Dispatch<React.SetStateAction<boolean>>;
  phoneNumber:string;
  title:string,
  subtitle:string;
  routeName:string
};

const DialogComponent = ({ handelOpen, open = true ,phoneNumber,subtitle,title,routeName}: Props) => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading,setLoading] = useState<boolean>()
  const dispatch = useDispatch()
  const [verifyUser] = useVerifyUserMutation();

  

  //*---------------------------------- H A N L D L E R S-------------------------------------
  //* 1.----------FOR SUBMIT------------
  const handleOTPSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const otp = otpValues.join("").toString();
    console.log('otp:', otp)
    console.log('phoneNumber:', phoneNumber)

    try {
      setLoading(true)
      const res = await verifyUser({
        phoneNumber,
        otp,
      }).unwrap();

      if (res.success) {
        toast.success(res.message);
        dispatch(userExist(res.user!));
        handelOpen(false);
        navigate(routeName);
        setLoading(false)
      }
    } catch (error) {
      console.log("error:", error);
      const err = error as FetchBaseQueryError;
      const data = err.data as UserRegistrationResMsg;
      toast.error(data.message);
      setLoading(false)
      // catchError(error,UserRegistrationResMsg)
    }
  };

  //* 2. ----------------FOR ONCHANGE----------------

  const hanldeChange = (value: string, index: number) => {
    const newotp = [...otpValues];
    console.log("newotp:", newotp);

    newotp[index] = value;

    setOtpValues(newotp);

    //*-----move focus to another box
    if (value !== "" && index < otpValues.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  //* 3. ----------------------FOR BACKSPACE ----------------

  const hanldekeydown = (e:React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key == "Backspace") {
      const newotp = [...otpValues];

      //*-------empty the opt box
      newotp[index] = "";

      //*---------- update the state
      setOtpValues(newotp);

      //*-----------change the focus to previous ---------

      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`)?.focus();
      }
    }
  };

  return (
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
        title={title}
        subtitle={subtitle}
        handelOpen={handelOpen}
      />

      <DialogContent>
        <Stack
          direction={"row"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          {otpValues.map((value: string, idx) => (
            <TextField
              onChange={(e) => hanldeChange(e.target.value, idx)}
              value={value}
              onKeyDown={(e) => hanldekeydown(e, idx)}
              id={`otp-input-${idx}`}
              key={idx}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "2rem",
                  color: "#24AE7C",
                  padding: "0.8rem",
                  width: "2rem",
                  height: "1.7rem",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#24AE7C",
                  },
                  "&:hover fieldset": {
                    borderColor: "#24AE7C",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#24AE7C",
                  },
                },
              }}
            />
          ))}
        </Stack>

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
               {loading ? <CircularProgress
                      size={27}
                      sx={{
                        color: "#fff",
                      }}
                    /> :"Verify"} 
            </Button>

      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;


