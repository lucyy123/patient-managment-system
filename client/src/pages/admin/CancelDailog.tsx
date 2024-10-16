import {
  Button,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Dispatch, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import { useLazyGetAllAppointmentsQuery } from "../../redux/apis/adminApi";
import { useUpdateAppointmentMutation } from "../../redux/apis/appointment";
import { getAllAppointments } from "../../redux/reducers/appointment";
import {
  AdminInitStateType,
  TableRowsType,
  UpdateAppResBodyType,
} from "../../vite-env";
import DialogHeader from "./DialogHeader";

type Props = {
  open?: boolean;
  handelOpen: Dispatch<React.SetStateAction<boolean>>;
  row: TableRowsType;
};
const CancelDialogue = ({ handelOpen, open, row }: Props) => {
  console.log("row:", row);
  const theme = useTheme();
  const [reason, setReason] = useState("");
  const [updateAppointment] = useUpdateAppointmentMutation();

  const [fetchingAppointmests] = useLazyGetAllAppointmentsQuery();

  const { admin, loading } = useSelector(
    (state: { adminReducer: AdminInitStateType }) => state.adminReducer
  );
  const dispatch = useDispatch();

  const handle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("phone Number", row?.phoneNumber);
    console.log("reason", reason);
    try {
      const res = await updateAppointment({ 
        status: "cancelled",
        reason,
        phoneNumber: row.phoneNumber!,
          name: row?.patient,
          id: row?.appointmentId,
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
        const responses = await fetchingAppointmests(admin?._id).unwrap();
        if (responses.success) {
          dispatch(getAllAppointments(responses.appointmentsOfUsers));
        }
      }
      handelOpen(false);
    } catch (error) {
      console.log("error:", error);
      handelOpen(false);
      const err = error as FetchBaseQueryError;
      const data = err.data as UpdateAppResBodyType;
      toast.error(data.message);
    }
  };

  if (loading) return <Loader></Loader>;
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
            Reason For Cancellation
          </Typography>
          <TextField
            type="text"
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
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
          type="submit"
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
