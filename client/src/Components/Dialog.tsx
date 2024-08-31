import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Dialog } from "@mui/material/";
import { Dispatch } from "react";

type Props = {
  open?: boolean;
  handelOpen: Dispatch<React.SetStateAction<boolean>>;
};

const DialogComponent = ({ handelOpen, open = true }: Props) => {
  const theme = useTheme();

  const handleOTP = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handelOpen(false);
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
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Box>
          <Typography fontSize={"1.3rem"}>Verify OTP</Typography>
          <Typography
            variant="body2"
            fontSize={"0.8rem"}
            sx={{
              color: theme.palette.text.secondary,
              marginTop: "0.36rem",
            }}
          >
            Please enter the OTP sent to your registered mobile number.
          </Typography>
        </Box>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handelOpen(false)}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <Stack direction={"row"} gap={2}>
          {Array(6)
            .fill("")
            .map((ele) => (
              <TextField
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
