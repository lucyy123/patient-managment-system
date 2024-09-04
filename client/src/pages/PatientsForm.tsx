import {
  CalendarTodayOutlined,
  CallOutlined,
  MailOutline,
  PersonOutline,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router";
import pateintsImage from "../assets/patients_page_image.png";
import FileUploader from "../Components/FileUploader";
import Heading from "../Components/shared/Heading";
import LeftImage from "../Components/shared/LeftImage";
import SubHeading from "../Components/shared/SubHeading";
import { privacyContents } from "../utils/constants";

const PatientsForm = () => {
  const navigate = useNavigate();
  const hanldeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/appointment");
  };

  const theme = useTheme();
  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        height: "100vh",
      }}
    >
      {/* ----------------------------- Patients form---------------------------- */}
      <Box
        sx={{
          width: { xs: "100%", md: "75%" },
          padding: { xs: "3rem 1.5rem", md: "2rem 6rem" },
        }}
      >
        {/* ------------------------ logo + heading--------------------------- */}
        <Heading />

        {/* ---------------welcome----------------------- */}

        <SubHeading
          title="Welcome 👋"
          subtitile=" Let us know more about yourself"
        />

        {/* ----------------- content   + form -------------------------- */}
        <form
          onSubmit={hanldeSubmit}
          style={{
            marginTop: "2.4rem",
          }}
        >
          {/* ---------------------------------------- P E R S O N A L  I N F O R M A T I O N------------------------------------ */}
          <Typography
            variant="h6"
            fontSize={{ xs: "1.2rem", md: "1.8rem" }}
            fontWeight={"700"}
            sx={{
              mb: 5,
            }}
          >
            {" "}
            Personal Information
          </Typography>

          <Grid container spacing={{ xs: 1, md: 3 }}>
            {/* ------------------------- full name------------------------------ */}
            <Grid item xs={12} md={12}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Full Name
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  fullWidth
                  placeholder="ex:Adam"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="start"
                          >
                            {/* ----------------- user icon---------------- */}
                            <PersonOutline
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
            </Grid>

            {/* ------------------------- Email------------------------------ */}
            <Grid item xs={12} md={12}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Email
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  fullWidth
                  placeholder="ex:adam123@gmail.com"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="start"
                          >
                            {/* ----------------- Mail icon---------------- */}
                            <MailOutline
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
            </Grid>
            {/* ------------------------- Phone Number------------------------------ */}

            <Grid item xs={12} md={6}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Phone Number
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  fullWidth
                  placeholder="ex:9999222255"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="start"
                          >
                            {/* ----------------- Call icon---------------- */}
                            <CallOutlined
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
            </Grid>

            {/* ------------------------- DOB------------------------------ */}
            <Grid item xs={12} md={6}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Date of Birth
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
            </Grid>
            {/* ------------------------- Gender------------------------------ */}

            <Grid item md={6}>
              <Stack>
                <FormControl>
                  <FormLabel
                    sx={{
                      marginBottom: 1,
                    }}
                    id="demo-radio-buttons-group-label"
                  >
                    Gender
                  </FormLabel>

                  <RadioGroup
                    row
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Box
                      flex={1}
                      sx={{
                        border: "1px solid",
                        borderRadius: "8px",

                        paddingLeft: "0.8rem",
                      }}
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </Box>

                    <Box
                      flex={1}
                      sx={{
                        border: "1px solid",
                        borderRadius: "8px",

                        paddingLeft: "0.8rem",
                      }}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </Box>
                    <Box
                      flex={1}
                      sx={{
                        border: "1px solid",
                        borderRadius: "8px",

                        paddingLeft: "0.8rem",
                      }}
                    >
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </Box>
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Grid>
            {/* ------------------------- Address------------------------------ */}

            <Grid item xs={12} md={6}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Address
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  fullWidth
                  placeholder="ex:14 street,Swartgate, Pune"
                />
              </Stack>
            </Grid>
            {/* ------------------------- Occupation------------------------------ */}

            <Grid item xs={12} md={6}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Occupation
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  fullWidth
                  placeholder="Software Engineer"
                />
              </Stack>
            </Grid>
            {/* ------------------------- Emergency contact name------------------------------ */}
            <Grid item xs={12} md={6}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Emergency Contact Name
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  fullWidth
                  placeholder="Guardian's Name"
                />
              </Stack>
            </Grid>
            {/* ------------------------- His Number------------------------------ */}

            <Grid item xs={12} md={6}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Phone Number
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  fullWidth
                  placeholder="Enter Your Phone Number"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="start"
                          >
                            {/* ----------------- Call icon---------------- */}
                            <CallOutlined
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
            </Grid>
          </Grid>

          {/* ---------------------------------------- M E D I C A L   I N F O R M A T I O N------------------------------------ */}

          <Typography
            variant="h6"
            fontSize={{ xs: "1.2rem", md: "1.8rem" }}
            my={{ xs: 2, md: 5 }}
            fontWeight={"700"}
          >
            {" "}
            Medical Information
          </Typography>

          <Grid container spacing={{ xs: 1, md: 3 }}>
            {/* ------------------------- primay care physician------------------------------ */}
            <Grid item xs={12} md={12}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Primay Care physician
                </Typography>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                  size="small"
                  fullWidth
                  sx={{
                    border: "1px solid",
                    color: "white",
                    backgroundColor: theme.palette.background.default,
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //   value={}
                  label="Select Physician"
                  //   onChange={}
                >
                  <MenuItem value={""}>Select Physician</MenuItem>
                  <MenuItem value={10}>Dr. Naushad Khan</MenuItem>
                  <MenuItem value={20}>Dr. Atifa Khan</MenuItem>
                  <MenuItem value={30}>Dr. Faizan Khan</MenuItem>
                  <MenuItem value={30}>Dr. Danish Khan</MenuItem>
                </Select>
              </Stack>
            </Grid>

            {/* ------------------------- Insurance Provider------------------------------ */}
            <Grid item xs={12} md={6}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Insurance Provider
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  fullWidth
                  placeholder="ex:Policy Bazar"
                />
              </Stack>
            </Grid>
            {/* ------------------------- Insurance  policy number------------------------------ */}

            <Grid item xs={12} md={6}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Insurance Policy Number
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  fullWidth
                  placeholder="ex:ABC123456"
                />
              </Stack>
            </Grid>

            {/* ------------------------- Allergies (if any)------------------------------ */}
            <Grid item xs={12} md={6}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Allergies (if any)
                </Typography>
                <TextField
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="ex:peanuts, tree and grass pollen, house dust mites"
                />
              </Stack>
            </Grid>
            {/* ------------------------- Current Medications------------------------------ */}

            <Grid item xs={12} md={6}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Current Medications
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="ex:Ketoconazole, Saridon"
                />
              </Stack>
            </Grid>
            {/* ------------------------- Family Medical history------------------------------ */}

            <Grid item xs={12} md={6}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Family Medical history (if relevant)
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="ex:Father had dust allergy"
                />
              </Stack>
            </Grid>
            {/* ------------------------- past medical history------------------------------ */}

            <Grid item xs={12} md={6}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Past medical history
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="Software Engineer"
                />
              </Stack>
            </Grid>

            {/* ------------------------- Identifican and Verification------------------------------ */}
          </Grid>

          <Typography
            variant="h6"
            fontSize={{ xs: "1.2rem", md: "1.8rem" }}
            my={{ xs: 2, md: 5 }}
            fontWeight={"700"}
          >
            {" "}
            Identification and Verifications
          </Typography>

          <Grid container spacing={{ xs: 1, md: 3 }}>
            <Grid item xs={12} md={12}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Identification Type
                </Typography>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                  size="small"
                  fullWidth
                  sx={{
                    border: "1px solid",
                    color: "white",
                    backgroundColor: theme.palette.background.default,
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //   value={}
                  label="Select Physician"
                  //   onChange={}
                >
                  <MenuItem value={""}>Birth Certificate</MenuItem>
                  <MenuItem value={10}>Aadhar Card</MenuItem>
                  <MenuItem value={20}>Passport</MenuItem>
                  <MenuItem value={30}>Driving Licence</MenuItem>
                </Select>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Identification Number
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  fullWidth
                  placeholder="ex:ABCD123456"
                />
              </Stack>
            </Grid>
            <Grid item md={12}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Scanned Copy of Identification Document
                </Typography>
                <FileUploader />
              </Stack>
            </Grid>
            {/* ------------------------- Consent and provicy--------------------------- */}
            <Grid item md={12}>
              <Typography
                variant="h6"
                fontSize={{ xs: "1.2rem", md: "1.8rem" }}
                my={{ xs: 2, md: 5 }}
                fontWeight={"700"}
              >
                {" "}
                Consent and Privacy
              </Typography>

              {privacyContents.map((ele, idx) => (
                <Stack
                  key={idx}
                  direction={"row"}
                  display={"flex"}
                  justifyContent={"start"}
                  alignItems={"center"}
                >
                  <Checkbox defaultChecked />
                  <Typography
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: { xs: "0.8rem", md: "1.2rem" },
                    }}
                  >
                    {ele}
                  </Typography>
                </Stack>
              ))}

              <Button
                variant="contained"
                type="submit"
                sx={{
                  my: 5,
                  textTransform: "none",
                  color: "#ffff",
                }}
                fullWidth
              >
                Submit and continue
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* ----------------------------------image------------------------------- */}

      <LeftImage image={pateintsImage} />
    </Stack>
  );
};

export default PatientsForm;
