import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { Dispatch, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useVerifyAdminMutation
} from "../../redux/apis/adminApi";
import { adminExist } from "../../redux/reducers/admin";
import DialogHeader from "../admin/DialogHeader";

type Props = {
  open?: boolean;
  handelOpen: Dispatch<React.SetStateAction<boolean>>;
  title: string;
  subtitle: string;
  routeName: string;
};

const DialogPasskey = ({
  handelOpen,
  open = true,
  subtitle,
  title,
  routeName,
}: Props) => {
  const [passKeys, setPassKeys] = useState(["", "", "", "", "", ""]);
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>();
  const dispatch = useDispatch();
  const [verifyAdmin] = useVerifyAdminMutation();

  //*---------------------------------- H A N L D L E R S-------------------------------------
  //* 1.----------FOR SUBMIT------------
  const handleOTPSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const passkeys = passKeys.join("").toString();
    console.log('passkeys:', passkeys)
    setLoading(true);
    try {
      const res = await verifyAdmin({passkeys}).unwrap();
      if (res.success) {
        dispatch(adminExist(res.admin));
        toast.success(`Welcome ${res.admin.name}`);
        navigate(`${routeName}/${res.admin._id}`);
        setLoading(false)
      }
    } catch (error) {
      console.log("error:", error);
      setLoading(false)
      toast.error('Error In loging')
    }
  };

  //* 2. ----------------FOR ONCHANGE----------------

  const hanldeChange = (value: string, index: number) => {
    const newPasskeys = [...passKeys];

    newPasskeys[index] = value;

    setPassKeys(newPasskeys);

    //*-----move focus to another box
    if (value !== "" && index < passKeys.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  //* 3. ----------------------FOR BACKSPACE ----------------

  const hanldekeydown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key == "Backspace") {
      const newPasskeys = [...passKeys];

      //*-------empty the opt box
      newPasskeys[index] = "";

      //*---------- update the state
      setPassKeys(newPasskeys);

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
      <DialogHeader title={title} subtitle={subtitle} handelOpen={handelOpen} />

      <DialogContent>
        <Stack
          direction={"row"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          {passKeys.map((value: string, idx) => (
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
          {loading ? (
            <CircularProgress
              size={27}
              sx={{
                color: "#fff",
              }}
            />
          ) : (
            "Go To Dashboard"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPasskey;
