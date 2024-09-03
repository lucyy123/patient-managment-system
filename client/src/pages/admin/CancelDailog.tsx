import {
    Button,
    Dialog,
    DialogContent,
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
const CancelDialogue = ({ handelOpen, open }: Props) => {
  const theme = useTheme();
  const handle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handelOpen(false);
  };
  return (
    <Dialog
      open={open!}
      onClose={() => handelOpen(false)}
      PaperProps={{
        component: "form",

        onSubmit: handle,
        sx: {
          backgroundColor: theme.palette.background.default,
          padding: 2,
          borderRadius: "16px",
        },
      }}
    >
      <DialogHeader
        title="Cancel Appointment"
        subtitle="Are you sure you want to cancel your appointment"
        handelOpen={handelOpen}
      />

      <DialogContent>
        <Stack gap={1}  
            sx={{
              width: "30rem",
            }}>
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
            placeholder="ex:urgent meeting came up"
          />
        </Stack>

        <Button
          fullWidth
          sx={{
            marginTop: "1.7rem",
            textTransform: "none",
            color: theme.palette.text.primary,
          }}
          variant="contained"
          color="error"
        >
          Cancel appointment
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CancelDialogue;
