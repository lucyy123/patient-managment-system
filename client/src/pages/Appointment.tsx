import {
    CalendarTodayOutlined,
    Search
} from "@mui/icons-material";
import {
    Box,
    Button,
    Grid,
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
import leftImag from "../assets/appointment_image.jpeg";
import Heading from "../Components/shared/Heading";
import LeftImage from "../Components/shared/LeftImage";
import SubHeading from "../Components/shared/SubHeading";
import { useNavigate } from "react-router";

const Appointment = () => {
  const theme = useTheme();
const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(
      '/success'
    )
  };

  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      {/* ------------left side ------------- */}
      <Box width={"75%"} padding={"2rem 6rem"}>
        <Heading />

        {/* ?------------------------ sub heading --------------------------------------------- */}

        <SubHeading
          title="Hi there 👋"
          subtitile="Request a new appointment in 10 seconds"
        />

        {/* --------------------------- form content-------------------------------- */}

        <form onSubmit={handleSubmit}>
          <Typography
            variant="h6"
            fontSize={"1.8rem"}
            mb={5}
            fontWeight={"700"}
          >
            {" "}
            Personal Information
          </Typography>

          <Grid container spacing={3}>
            {/* ------------------------- Doctor------------------------------ */}
            <Grid item md={12}>
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
            </Grid>

            {/* ------------------------- Reason For appointment------------------------------ */}
            <Grid item md={6}>
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
            </Grid>
            {/* -------------------------additional comment / notes------------------------------ */}

            <Grid item md={6}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  additional comment / notes
                </Typography>
                <TextField
                //   size="small"
                
              
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
            <Grid item md={12}>
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
                Submit and contiue{" "}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      {/* -----------------right side image */}
      <LeftImage image={leftImag} />
    </Stack>
  );
};

export default Appointment;
