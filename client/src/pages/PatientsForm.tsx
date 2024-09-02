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
import pateintsImage from "../assets/patients_page_image.png";
import FileUploader from "../Components/FileUploader";
import Heading from "../Components/shared/Heading";
import { privacyContents } from "../utils/constants";

const PatientsForm = () => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      {/* ----------------------------- Patients form---------------------------- */}
      <Box width={"75%"} padding={"2rem 6rem"}>
        {/* ------------------------ logo + heading--------------------------- */}
        <Heading />

        {/* ---------------welcome----------------------- */}

        <Box marginTop={8}>
          <Typography variant="h4" fontSize={"2.3rem"} fontWeight={"700"}>
            {" "}
            Welcome 👋{" "}
          </Typography>
          {/* ---------------------------- sub title---------------------- */}
          <Typography
            variant="subtitle2"
            fontSize={"1rem"}
            sx={{
              color: theme.palette.text.secondary,
              mt: "0.5rem",
            }}
          >
            {" "}
            Let us know more about yourself{" "}
          </Typography>
        </Box>

        {/* ----------------- content   + form -------------------------- */}
        <form
          style={{
            marginTop: "2.4rem",
          }}
        >
          {/* ---------------------------------------- P E R S O N A L  I N F O R M A T I O N------------------------------------ */}
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
            {/* ------------------------- full name------------------------------ */}
            <Grid item md={12}>
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
            <Grid item md={6}>
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

            <Grid item md={6}>
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
            <Grid item md={6}>
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

            <Grid item md={6}>
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

            <Grid item md={6}>
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
            <Grid item md={6}>
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

            <Grid item md={6}>
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
            fontSize={"1.8rem"}
            my={5}
            fontWeight={"700"}
          >
            {" "}
            Medical Information
          </Typography>

          <Grid container spacing={3}>
            {/* ------------------------- primay care physician------------------------------ */}
            <Grid item md={12}>
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
            <Grid item md={6}>
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

            <Grid item md={6}>
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
            <Grid item md={6}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Allergies (if any)
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                    height: "95px",
                  }}
                  fullWidth
                  placeholder="ex:peanuts, tree and grass pollen, house dust mites"
                />
              </Stack>
            </Grid>
            {/* ------------------------- Current Medications------------------------------ */}

            <Grid item md={6}>
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
                    height: "95px",
                  }}
                  fullWidth
                  placeholder="ex:Ketoconazole, Saridon"
                />
              </Stack>
            </Grid>
            {/* ------------------------- Family Medical history------------------------------ */}

            <Grid item md={6}>
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
                    height: "95px",
                  }}
                  fullWidth
                  placeholder="ex:Father had dust allergy"
                />
              </Stack>
            </Grid>
            {/* ------------------------- past medical history------------------------------ */}

            <Grid item md={6}>
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
                    height: "95px",
                  }}
                  fullWidth
                  placeholder="Software Engineer"
                />
              </Stack>
            </Grid>

            {/* ------------------------- Identifican and Verification------------------------------ */}
          </Grid>

          <Typography
            variant="h6"
            fontSize={"1.8rem"}
            my={5}
            fontWeight={"700"}
          >
            {" "}
            Identification and Verifications
          </Typography>

          <Grid container spacing={3}>
            <Grid item md={12}>
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
            <Grid item md={12}>
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
                fontSize={"1.8rem"}
                my={4}
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
                      fontSize: "1.2rem",
                    }}
                  >
                    {ele}
                  </Typography>
                </Stack>
              ))}

              <Button variant="contained" sx={{
                my:5,
                textTransform:'none',
                color:'#ffff'
              }} fullWidth>
                Submit and continue
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* ----------------------------------image------------------------------- */}

      <Box flex={1}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={pateintsImage}
            alt="patients_image"
            style={{
              height: "99%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default PatientsForm;
