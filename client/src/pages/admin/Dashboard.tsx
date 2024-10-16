import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppointmentCard from "../../Components/AppointmentCard";
import Loader from "../../Components/Loader";
import Heading from "../../Components/shared/Heading";
import SubHeading from "../../Components/shared/SubHeading";
import AdminTable from "../../Components/Table";
import useGetAllAppointments from "../../hooks/admin/useGetAllAppointments";
import {
  AdminInitStateType,
  DocAppointmentInitStateType,
  TableRowsType,
} from "../../vite-env";
import AppointmentDialogue from "./AppointmentDialogue";
import CancelDialogue from "./CancelDailog";

const Dashboard = () => {
  const { docId } = useParams();
  useGetAllAppointments({ docId });
  const [open, setOpen] = useState<boolean>(false);
  const [cancelOpen, setCancelOpen] = useState<boolean>(false);
  const { admin, loading } = useSelector(
    (state: { adminReducer: AdminInitStateType }) => state.adminReducer
  );
  const { docAppointments } = useSelector(
    (state: { appointmentListReducer: DocAppointmentInitStateType }) =>
      state.appointmentListReducer
  );

  const [targetedRow, setTargetedRow] = useState<TableRowsType>();
  const [scheduled, setScheduled] = useState<number>();
  const [pendings, setPendings] = useState<number>();
  const [cancelled, setCancelled] = useState<number>();

  useEffect(() => {
    const pend = docAppointments?.filter(
      (ele) => ele.appointmentId.status === "pending"
    );
    setPendings(pend?.length);
    const canc = docAppointments?.filter(
      (ele) => ele.appointmentId.status === "cancelled"
    );
    setCancelled(canc?.length);
    const sche = docAppointments?.filter(
      (ele) => ele.appointmentId.status === "scheduled"
    );
    setScheduled(sche?.length);
  }, [docId, docAppointments]);

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
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.value == "scheduled" ? "success" : "error"}
          sx={{
            textTransform: "none",
            color:params.value == "pending"? "#000" : "#fff",
            backgroundColor: params.value == "pending" ? "yellow" : "none",
          }}
        >
          {params.value}
        </Button>
      ),
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
          
{params.row.status === "pending"?   (
            <Button
              variant="text"
              sx={{
                color: theme.palette.primary.main,
                textTransform: "none",
              }}
              onClick={() => {
                setTargetedRow(params.row);
                setOpen(true);
              }}
            >
              Schedule
            </Button>
          ):null}

          {params.row.status === "cancelled"  ? (
            <Button
              variant="text"
              sx={{
                color: theme.palette.primary.main,
                textTransform: "none",
              }}
              onClick={() => {
                setTargetedRow(params.row);
                setOpen(true);
              }}
            >
              Schedule
            </Button>
          ) : (
            <Button
            disabled ={params.row.status === 'scheduled'}
              variant="text"
              sx={{
                color: "red",
                textTransform: "none",
              }}
              onClick={() => {
                setTargetedRow(params.row);

                setCancelOpen(true)}}
            >
              Cancel
            </Button>
          )}
        </Stack>,
      ],
    },
  ];

  const rows: TableRowsType[] = docAppointments?.map((ele) => ({
    id: ele._id,
    patient: ele.patientName,
    date: String(ele.appointmentId?.date).split("T")[0],
    time: ele.appointmentId.time,
    status: ele.appointmentId.status,
    reason: ele.appointmentId.reason,
    appointmentId: ele.appointmentId._id,
    phoneNumber:ele.patientPhone
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
          <AppointmentCard
            cancelled={cancelled}
            pending={pendings}
            scheduled={scheduled}
          />
        </Box>
        {/* ------------------------------------- table------------------------------------ */}

        <Box mt={5}>
          <AdminTable columns={columns} rows={rows} />
        </Box>
        {/* ----------------------------------Appointment Dialogue------------------------- */}
        <AppointmentDialogue
          handelOpen={setOpen}
          open={open}
          row={targetedRow!}
          
        />
        {/* ----------------------------------Cancel Dialogue------------------------- */}
        <CancelDialogue
          handelOpen={setCancelOpen}
          open={cancelOpen}
          row={targetedRow!}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
