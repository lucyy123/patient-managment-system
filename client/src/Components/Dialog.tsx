import {
  Button,
  DialogContent,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { Dialog } from "@mui/material/";
import { Dispatch } from "react";
import DialogHeader from "../pages/admin/DialogHeader";
import { useNavigate } from "react-router";

type Props = {
  open?: boolean;
  handelOpen: Dispatch<React.SetStateAction<boolean>>;
};

const DialogComponent = ({ handelOpen, open = true }: Props) => {
  const theme = useTheme();

  const navigate = useNavigate()
  const handleOTP = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    handelOpen(false);
    navigate('/patient')

  };
  return (
    <Dialog
      open={open}
      onClose={() => handelOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: handleOTP,
        sx: {
          backgroundColor: theme.palette.background.default,
          padding: 2,
          borderRadius: "16px",
        },
      }}
    >
      <DialogHeader
        title="Verify OTP"
        subtitle="Please enter the OTP sent to your registered mobile number."
        handelOpen={handelOpen}
      />

      <DialogContent>
        <Stack direction={"row"} gap={2}>
          {Array(6)
            .fill("")
            .map((ele,idx) => (
              <TextField
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
          Verify
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
