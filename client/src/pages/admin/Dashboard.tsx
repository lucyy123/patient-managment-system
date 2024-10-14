import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import AppointmentCard from "../../Components/AppointmentCard";
import Heading from "../../Components/shared/Heading";
import SubHeading from "../../Components/shared/SubHeading";
import AdminTable from "../../Components/Table";
import { AdminInitStateType, TableRowsType } from "../../vite-env";
import AppointmentDialogue from "./AppointmentDialogue";
import CancelDialogue from "./CancelDailog";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import useGetAllAppointments from "../../hooks/admin/useGetAllAppointments";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { docId } = useParams();
  const listOfAppoints = useGetAllAppointments({ docId });
  const [open, setOpen] = useState<boolean>(false);
  const [cancelOpen, setCancelOpen] = useState<boolean>(false);
  const { admin, loading } = useSelector(
    (state: { adminReducer: AdminInitStateType }) => state.adminReducer
  );

  const theme = useTheme();

  const columns: GridColDef[] = [
    {
      field: "patient",
      headerName: "Patient",
      flex: 1,
    },
    {
      field: "time",
      headerName: "Time",
      width: 150,
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      flex: 1,
    },
   
    {
      field: "status",
      headerName: "Status",
      width: 150,
      flex: 1,
    },
    {
      field: "reason",
      headerName: "Reason",
      width: 150,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      getActions: (params) => [
        <Stack direction={"row"}>
          <Button
            variant="text"
            sx={{
              color: theme.palette.primary.main,
              textTransform: "none",
            }}
            onClick={() => setOpen(true)}
          >
            Schedule
          </Button>

          <Button
            variant="text"
            sx={{
              color: "#ffff",
              textTransform: "none",
            }}
            onClick={() => setCancelOpen(true)}
          >
            Cancel
          </Button>
        </Stack>,
      ],
    },
  ];

  const rows: TableRowsType[] = listOfAppoints?.map((ele) => ({
    id: ele._id,
    patient: ele.patientName,
    date: ele.appointmentId?.date?.split("T")[0],
    time: ele.appointmentId.time,
    status: ele.appointmentId.status,
    reason: ele.appointmentId.reason,
  }));

  if (loading) return <Loader></Loader>;

  return (
    <Box>
      {/* --------- Header  { heading + admin info } ------------------*/}

      <Stack
        direction={"row"}
        sx={{
          padding: "1rem 2rem",
          backgroundColor: "#0D0F10",
        }}
      >
        <Heading />

        <Stack marginLeft={"auto"} direction={"row"} gap={1}>
          <Avatar
            src={"/doctor.avif"}
            alt="admin_avatar"
            sx={{
              height: "2rem",
              width: "2rem",
            }}
          />
          {/* ----------------------name-------------------------- */}
          <Typography variant="subtitle2" fontSize={"1.2rem"}>
            {admin?.name}
          </Typography>
        </Stack>
      </Stack>

      {/* -------------------------------- Content ------------------------------- */}

      <Box padding={"1.5rem 4.5rem"}>
        {/* --------------------+ sub heading ----------------------- */}

        <SubHeading
          title={`Welcome, ${admin?.name}`}
          subtitile="Start day with managing new appointments"
          margintop={1}
        />
        {/* ---------------------- appointment statistics  cards-----------------------------*/}
        <Box mt={5}>
          <AppointmentCard />
        </Box>
        {/* ------------------------------------- table------------------------------------ */}

        <Box mt={5}>
          <AdminTable columns={columns} rows={rows} />
        </Box>
        {/* ----------------------------------Appointment Dialogue------------------------- */}
        <AppointmentDialogue handelOpen={setOpen} open={open} />
        {/* ----------------------------------Cancel Dialogue------------------------- */}
        <CancelDialogue handelOpen={setCancelOpen} open={cancelOpen} />
      </Box>
    </Box>
  );
};

export default Dashboard;
