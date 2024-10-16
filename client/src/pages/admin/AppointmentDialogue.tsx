import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Dispatch } from "react";
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
  row: TableRowsType ;
};
const AppointmentDialogue = ({ handelOpen, open, row }: Props) => {
  console.log('row:', row)
  const theme = useTheme();
  const dispatch = useDispatch();
  const { admin, loading } = useSelector(
    (state: { adminReducer: AdminInitStateType }) => state.adminReducer
  );

  const [updateAppointment] = useUpdateAppointmentMutation();

  const [fetchingAppointmests] = useLazyGetAllAppointmentsQuery();
  const handleAppointement = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const res = await updateAppointment({
        status: "scheduled",
        reason:'',
        phoneNumber:row.phoneNumber! ,
        id: row?.appointmentId,
        name:row?.patient
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

        onSubmit: handleAppointement,
        sx: {
          backgroundColor: theme.palette.background.default,
          padding: 2,
          borderRadius: "16px",
        },
      }}
    >
      <DialogHeader
        title="Schedule Appointment"
        subtitle="Please check the informatio before schedule"
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
            <Stack direction={"row"}>
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: "1.5rem",
                  marginRight: "auto",
                }}
              >
                {admin?.name}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  fontWeight: "700",
                }}
              >
                {admin?.speciality}
              </Button>
            </Stack>
          </Stack>
          <Stack gap={1}>
            <Typography
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              Reason
            </Typography>
            <Typography variant="body2">{row?.reason}</Typography>
          </Stack>
          <Stack gap={1} direction={"row"}>
            <Box
              sx={{
                marginRight: "auto",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                Date
              </Typography>
              <Typography
                sx={{
                  color: "#fff",
                }}
              >
                {row?.date}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                Time
              </Typography>
              <Typography
                sx={{
                  color: "#fff",
                }}
              >
                {row?.time}
              </Typography>
            </Box>
          </Stack>
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
          Schedule appointment
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialogue;
