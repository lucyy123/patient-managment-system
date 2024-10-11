import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loader from "../Components/Loader";
import Heading from "../Components/shared/Heading";
import LeftImage from "../Components/shared/LeftImage";
import SubHeading from "../Components/shared/SubHeading";
import { formatedDate, getAllDoctorsList, getTime } from "../utils/constants";
import { AdminItemType, AdminsType, AppointResBodyType, UserReducerInitialState } from "../vite-env";
import { useNewAppointmentMutation } from "../redux/apis/appointment";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { getAppointment } from "../redux/reducers/appointment";

const Appointment = () => {
  const [value, setValue] = useState<Dayjs | null>(dayjs(getTime));
  const [datevalue, setDateValue] = useState<Dayjs | null>(dayjs(formatedDate));
  const [isLoading,setIsLoading]=useState<boolean>()
  const theme = useTheme();
  const navigate = useNavigate();

  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const dispatch = useDispatch();
  const [newAppointment] = useNewAppointmentMutation();
  const [doclist, setDoclist] = useState<AdminsType | []>();
  useEffect(() => {
    getAllDoctorsList().then((data) => setDoclist(data));
  }, []);


  const [appointDetails, setAppointDetails] = useState({
    status: "pending",
    user: user?._id,
    physicianName: "",
    docId:'',
    time: String(dayjs(value).format("HH:mm")),
    date:formatedDate,
    reason: "",
    additionalInfo: "",
  });

  //*------------------------HANDLERS-----------------------------
  //* 1. FOR SUBMIT
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const res = await newAppointment(appointDetails).unwrap();
      if (res.success) {
        toast.success(res.message);
        dispatch(getAppointment(res.appointment))
        navigate(`/success`);
      } else {
        toast.error(res.message);
      }
      setIsLoading(false)
    } catch (error) {
      console.log("error:", error);
      const err = error as FetchBaseQueryError;
      const actualError = err.data as AppointResBodyType;
      toast.error(actualError.message);
      setIsLoading(false)
    }
  };

  //*2.----------- HANDLE CHANGE
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setAppointDetails((pre) => ({ ...pre, [name]: value }));
  };

  if (loading) return <Loader></Loader>;

  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        height: "100vh",
      }}
    >
      {/* ------------left side ------------- */}
      <Box
        sx={{
          width: { xs: "100%", md: "75%" },
          padding: { xs: "3rem 1rem", md: "2rem 6rem" },
        }}
      >
        <Heading />

        {/* ?------------------------ sub heading --------------------------------------------- */}

        <SubHeading
          title="Hi there 👋"
          subtitile="Request a new appointment in 10 seconds"
        />

        {/* --------------------------- form content-------------------------------- */}
        <Box
          sx={{
            mt: { xs: 2, md: 5 },
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* ------------------------- Doctor------------------------------ */}
              <Grid item xs={12} md={12}>
                <Stack gap={1}>
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
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: theme.palette.background.default, // Change dropdown list background color
                          border: "1px solid #bdbdbd", // Optional: Add border to the dropdown
                        },
                      },
                    }}
                    sx={{
                      border: "1px solid",
                      "& .MuiSelect-icon": {
                        color: "white", // Dropdown arrow color
                      },
                    }}
                    displayEmpty
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={appointDetails.physicianName && appointDetails.docId ? `${appointDetails.physicianName}-${appointDetails.docId}` : ""}
                    onChange={(e) =>{
                      const selectedValue = e.target.value
                           console.log('selectedValue:', selectedValue)
                           const value = e.target.value.split("-")
                          const name = value[0]
                          console.log('name:', name)
                          const id = value[1]
                          console.log('id:', id)
                  return    setAppointDetails({
                        ...appointDetails,
                        physicianName: name,
                        docId:id
                      })
                    }

                    }
                  >
                    <MenuItem value="">
                      <em>Select Physician</em> {/* Placeholder */}
                    </MenuItem>


                    {doclist?.map((ele: AdminItemType) => (
                    <MenuItem   value={`${ele.name}-${ele._id}`} key={ele._id} >
                      <Box
                        display="flex"
                        flexDirection="row"
                        sx={{ width: "100%" }}
                      >
                        <Typography>{ele.name}</Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ marginLeft: "auto" }}
                        >
                          {ele.speciality}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                  
                  </Select>
                </Stack>
              </Grid>

              {/* ------------------------- Reason For appointment------------------------------ */}
              <Grid item xs={12} md={6}>
                <Stack gap={1}>
                  <Typography
                    sx={{
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Reason For appointment
                  </Typography>
                  <TextField
                    value={appointDetails.reason}
                    name="reason"
                    onChange={handleChange}
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
              </Grid>
              {/* -------------------------additional comment / notes------------------------------ */}

              <Grid item xs={12} md={6}>
                <Stack gap={1}>
                  <Typography
                    sx={{
                      color: theme.palette.text.secondary,
                    }}
                  >
                    additional comment / notes
                  </Typography>
                  <TextField
                    value={appointDetails.additionalInfo}
                    name="additionalInfo"
                    onChange={handleChange}
                    sx={{
                      border: "1px solid",
                      borderRadius: "8px",
                    }}
                    multiline
                    rows={3}
                    fullWidth
                    placeholder="ex:preffer afternoon apppointment if possible"
                  />
                </Stack>
              </Grid>

              {/* ------------------------- expected appointment date------------------------------ */}
              <Grid item xs={12} md={6}>
                <Stack gap={1}>
                  <Typography
                    sx={{
                      color: theme.palette.text.secondary,
                    }}
                  >
                    expected appointment date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      defaultValue={dayjs(formatedDate)}
                      sx={{
                        border: "1px solid",
                        borderRadius: "8px",
                      }}
                      value={datevalue}
                      name="dateofBirth"
                      onChange={(newDate) =>
                        setAppointDetails({
                          ...appointDetails,
                          date:newDate,
                        })
                      }
                      slotProps={{
                        openPickerButton: { color: "secondary" },
                        textField: {
                          name: "dateofBirth",
                          size: "small",
                          inputProps: { readOnly: true }, 
                        },
                        popper: {
                          sx: {
                            "& .MuiPaper-root": {
                              backgroundColor: theme.palette.primary.main,
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Stack>
              </Grid>

              {/* ------------------------- expected appointment time------------------------------ */}
              <Grid item xs={12} md={6}>
                <Stack gap={1}>
                  <Typography
                    sx={{
                      color: theme.palette.text.secondary,
                    }}
                  >
                    expected appointment Time
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={value}
                      onChange={(newValue) =>
                        setAppointDetails({
                          ...appointDetails,
                          time: String(dayjs(newValue).format("HH:mm")),
                        })
                      }
                      sx={{
                        border: "1px solid",
                        borderRadius: "8px",
                      }}
                      slotProps={{
                        openPickerButton: { color: "secondary" },
                        textField: {
                          name: "dateofBirth",
                          size: "small",
                          inputProps: { readOnly: true }, 
                        },
                        popper: {
                          sx: {
                            "& .MuiPaper-root": {
                              backgroundColor: theme.palette.primary.main,
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Stack>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  my: 5,
                }}
              >
                {isLoading ?  <CircularProgress
                      size={27}
                      sx={{
                        color: "#fff",
                      }}
                    />:"Submit and contiue"}
                {" "}
              </Button>
            </Grid>
          </form>
        </Box>
      </Box>
      {/* -----------------right side image */}
      <LeftImage image={"/appointment_image.jpeg"} />
    </Stack>
  );
};

export default Appointment;
