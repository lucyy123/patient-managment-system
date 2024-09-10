import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import AppointmentCard from "../../Components/AppointmentCard";
import Heading from "../../Components/shared/Heading";
import SubHeading from "../../Components/shared/SubHeading";
import AdminTable from "../../Components/Table";
import { TableRowsType } from "../../vite-env";
import AppointmentDialogue from "./AppointmentDialogue";
import CancelDialogue from "./CancelDailog";

const Dashboard = () => {
    const [open,setOpen] = useState<boolean>(false)
    const [cancelOpen,setCancelOpen] = useState<boolean>(false)


  const theme = useTheme();

  const columns: GridColDef[] = [
    {
      field: "patient",
      headerName: "Patient",
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
      field: "doctor",
      headerName: "Doctor",
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
         onClick={()=>setOpen(true)}
         >
            Schedule
          </Button>

          <Button
            variant="text"
            sx={{
              color: "#ffff",
              textTransform: "none",
            }}
         onClick={()=>setCancelOpen(true)}

          >
            Cancel
          </Button>
        </Stack>,
      ],
    },
  ];

  const rows: TableRowsType[] = [
    {
      id: 1,
      patient: "Abbas khan",
      date: "02 Jan 2024",
      status: "Scheduled",
      doctor: "Dr.Atifa Khan",
    },

    {
      id: 2,
      patient: "Nabushan Bi",
      date: "10 Jan 2024",
      status: "Pending",
      doctor: "Dr.Faizan Khan",
    },

    {
      id: 3,
      patient: "Abbas khan",
      date: "02 Jan 2024",
      status: "Cancelled",
      doctor: "Dr.Atifa Khan",
    },
  ];

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
            src={'/doctor.avif'}
            alt="admin_avatar"
            sx={{
              height: "2rem",
              width: "2rem",
            }}
          />
          <Typography variant="subtitle2" fontSize={"1.2rem"}>
            Admin
          </Typography>
        </Stack>
      </Stack>

      {/* -------------------------------- Content ------------------------------- */}

      <Box padding={"1.5rem 4.5rem"}>
        {/* --------------------+ sub heading ----------------------- */}

        <SubHeading
          title="Welcome, Admin"
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
       <AppointmentDialogue  handelOpen={setOpen} open={open}/>
       <CancelDialogue handelOpen = {setCancelOpen} open ={cancelOpen} />
      </Box>
    </Box>
  );
};

export default Dashboard;
