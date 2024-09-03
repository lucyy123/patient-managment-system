import { CalendarTodayOutlined, Search } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogContent,
    IconButton,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import { Dispatch } from "react";
import DialogHeader from "./DialogHeader";

type Props = {
  open?: boolean;
  handelOpen: Dispatch<React.SetStateAction<boolean>>;
};
const AppointmentDialogue = ({ handelOpen, open }: Props) => {
  const theme = useTheme();
  const handleOTP = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handelOpen(false);
  };
  return (
    <Dialog
      open={open!}
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
        title="Schedule Appointment"
        subtitle="Please fill in the following details to schedule"
        handelOpen={handelOpen}
      />

      <DialogContent>
        <Stack gap={1}>
          <Stack
            gap={1}
            sx={{
              width: "30rem",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              Doctor
            </Typography>

            <Select
              size="small"
              fullWidth
              sx={{
                border: "1px solid",
                color: "white",
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              input={
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton edge="start">
                        <Search
                          sx={{
                            color: "#CDCECF",
                            marginInline: "0.23rem",
                            background: "none",
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              }
              //   value={}
              //   label="Select Physician"

              //   onChange={}
            >
              <MenuItem value={10}>Dr. Atifa Khan</MenuItem>
              <MenuItem value={20}>Dr. Faizan khan</MenuItem>
              <MenuItem value={30}>Dr. Shiba</MenuItem>
            </Select>
          </Stack>
          <Stack gap={1}>
            <Typography
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              Reason For appointment
            </Typography>
            <TextField
              //   size="small"
              sx={{
                border: "1px solid",
                borderRadius: "8px",
              }}
              fullWidth
              multiline
              rows={3}
              placeholder="ex:monthly check-up"
            />
          </Stack>
          <Stack gap={1}>
            <Typography
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              expected appointment date
            </Typography>
            <TextField
              size="small"
              type="date"
              sx={{
                border: "1px solid",
                borderRadius: "8px",
              }}
              fullWidth
              placeholder="Select Your Birth Date"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="start"
                      >
                        {/* ----------------- Calender icon---------------- */}
                        <CalendarTodayOutlined
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
          </Stack>
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
          Schedule appointment
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialogue;
