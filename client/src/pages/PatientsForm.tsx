import { CallOutlined, MailOutline, PersonOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FileUploader from "../Components/FileUploader";
import Loader from "../Components/Loader";
import Heading from "../Components/shared/Heading";
import LeftImage from "../Components/shared/LeftImage";
import SubHeading from "../Components/shared/SubHeading";
import useGetUser from "../hooks/useGetUser";
import { useUpdateUserMutation } from "../redux/apis/userApi";
import { userExist } from "../redux/reducers/user";
import {
  formatedDate,
  getAllDoctorsList,
  privacyContents,
} from "../utils/constants";
import {
  AdminItemType,
  AdminsType,
  UserReducerInitialState,
  UserRegistrationResMsg,
} from "../vite-env";

const PatientsForm = () => {
  useGetUser()
  const navigate = useNavigate();

  const { loading, user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [checkedList, setCheckedList] = useState<boolean[]>([true, true, true]);

  const userDetails = {
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  };

  const [personalInfo, setPersonalInfo] = useState({
    address: "",
    dateofBirth: "",
    occupation: "",
    emergencyContName: "",
    emergencyContNumber: "",
    gender: "",
  });

  const [medicalInfo, setMedicalInfo] = useState({
    allergies: [''] ,
    currentMedications: "",
    familyMedicalHistory: "",
    insurancePolicyNumber: "",
    insuranceProvider: "",
    primaryCarePhy: "",
    userPastMedicalHistory: "",
  });

  const [identificationInfo, setIdentificationInfo] = useState({
    identificationNumber: "",
    identificationType: "",
  });

  const [file, setFile] = useState<File | undefined>();

  const dispatch = useDispatch();

  const dateValue = dayjs(formatedDate);

  const [doclist, setDoclist] = useState<AdminsType | []>();
  useEffect(() => {
    getAllDoctorsList().then((data) => setDoclist(data));
  }, []);

  //*------------------- HANDLERS-----------------
  //*1. FOR SUBMITTING--------\
  const hanldeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('medical info',medicalInfo)
    try {
      const formdata = new FormData();
      formdata.append("email", String(user?.email));
      formdata.append("name", String(user?.name));
      formdata.append("phoneNumber", String(user?.phoneNumber));
      formdata.append("personalInfo", JSON.stringify(personalInfo));
      formdata.append("medicalInfo", JSON.stringify(medicalInfo));
      formdata.append("identification", JSON.stringify(identificationInfo));
      formdata.append("image", file as Blob);
      const response = await updateUser({ formdata }).unwrap();
      if (response.success) {
        toast.success(response.message);
        dispatch(userExist(response.user!));
        navigate("/appointment");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log("error:", error);
      const err = error as FetchBaseQueryError;
      const dataMes = err.data as UserRegistrationResMsg;
      toast.error(dataMes.message);
      if (dataMes.message.includes("session")) {
        navigate("/");
      }
    }
  };

  //* .2--------------------------- USER INFORMATION

  const hanldePersonalInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setPersonalInfo((pre) => ({ ...pre, [name]: value }));
  };

  //* 3.-------------------------- Medical Information

  const hanldeMedicalInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name == "allergies" && value != "") {
      const newAllergies = value.split(",");
      setMedicalInfo((pre) => ({ ...pre, allergies: newAllergies }));
    }

    setMedicalInfo((pre) => ({ ...pre, [name]: value }));
  };

  //*4.--------------------------- Terms and Privacy Checklist

  const handlecheckbox = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newList = [...checkedList];
    newList[index] = e.target.checked;
    setCheckedList(newList);
  };

  const theme = useTheme();

  if (loading) return <Loader></Loader>;

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
        <Heading showLogout = {true} />

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
                  name="name"
                  value={userDetails.name}
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
                  name="email"
                  value={userDetails.email}
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
                  name="phoneNumber"
                  value={userDetails.phoneNumber}
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

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{
                      border: "1px solid",
                      borderRadius: "8px",
                    }}
                    value={dateValue}
                    name="dateofBirth"
                    onChange={(newDate) =>
                      setPersonalInfo({
                        ...personalInfo,
                        dateofBirth: String(newDate),
                      })
                    }
                    defaultValue={dayjs(formatedDate)}
                    slotProps={{
                      openPickerButton: { color: "secondary" },
                      textField: {
                        name: "dateofBirth",
                        size: "small",
                      },
                      popper: {
                        sx: {
                          "& .MuiPaper-root": {
                            backgroundColor: theme.palette.primary.main, // Ensures your background color
                            color: theme.palette.primary.contrastText,   // If you want to ensure text color matches
                          },
                          "& .MuiPickersDay-root": {
                            backgroundColor: theme.palette.primary.main, // Ensures days inside the calendar also match
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
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
                    onChange={(e) => hanldePersonalInfo(e)}
                    name="gender"
                    value={personalInfo.gender}
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
                  onChange={hanldePersonalInfo}
                  value={personalInfo.address}
                  name="address"
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
                  value={personalInfo.occupation}
                  onChange={hanldePersonalInfo}
                  name="occupation"
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
                  value={personalInfo.emergencyContName}
                  name="emergencyContName"
                  onChange={hanldePersonalInfo}
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
                  Emergency Contact Number
                </Typography>
                <TextField
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  fullWidth
                  value={personalInfo.emergencyContNumber}
                  name="emergencyContNumber"
                  onChange={hanldePersonalInfo}
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
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: theme.palette.background.default, // Change dropdown list background color
                        border: "1px solid #bdbdbd", // Optional: Add border to the dropdown
                        "& .MuiMenuItem-root": {},
                      },
                    },
                  }}
                  sx={{
                    border: "1px solid",
                    "& .MuiSelect-icon": {
                      color: "white",

                      // Dropdown arrow color
                    },
                  }}
                  displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={medicalInfo.primaryCarePhy}
                  onChange={(e) =>
                    setMedicalInfo({
                      ...medicalInfo,
                      primaryCarePhy: e.target.value,
                    })
                  }
                >
                  <MenuItem value="">
                    <em>Select Physician</em> {/* Placeholder */}
                  </MenuItem>
                  {doclist?.map((ele: AdminItemType) => (
                    <MenuItem value={ele.name} key={ele._id}>
                      <Box
                        display="flex"
                        flexDirection="row"
                        sx={{ width: "100%" }}
                      >
                        <Typography> {ele.name}</Typography>
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
                  value={medicalInfo.insuranceProvider}
                  name="insuranceProvider"
                  onChange={hanldeMedicalInfo}
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
                  value={medicalInfo.insurancePolicyNumber}
                  name="insurancePolicyNumber"
                  onChange={hanldeMedicalInfo}
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
                  value={medicalInfo.allergies}
                  name="allergies"
                  onChange={hanldeMedicalInfo}
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
                  value={medicalInfo.currentMedications}
                  name="currentMedications"
                  onChange={hanldeMedicalInfo}
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
                  value={medicalInfo.familyMedicalHistory}
                  name="familyMedicalHistory"
                  onChange={hanldeMedicalInfo}
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
                  value={medicalInfo.userPastMedicalHistory}
                  name="userPastMedicalHistory"
                  onChange={hanldeMedicalInfo}
                  size="small"
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                  }}
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="cough and headache"
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
                    "& .MuiOutlinedInput-notchedOutline": {},
                    "& .MuiSelect-icon": {
                      color: "white", // Dropdown arrow color
                    },
                  }}
                  displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={identificationInfo.identificationType}
                  label="Select Physician"
                  onChange={(e) =>
                    setIdentificationInfo({
                      ...identificationInfo,
                      identificationType: e.target.value,
                    })
                  }
                >
                  <MenuItem value="">
                    <em>Select Document Type</em> {/* Placeholder */}
                  </MenuItem>
                  <MenuItem value={"Birth Certificate"}>
                    Birth Certificate
                  </MenuItem>
                  <MenuItem value={"Aadhar"}>Aadhar Card</MenuItem>
                  <MenuItem value={"Passport"}>Passport</MenuItem>
                  <MenuItem value={"Driving Lisence"}>Driving Lisence</MenuItem>
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
                  value={identificationInfo.identificationNumber}
                  onChange={(e) =>
                    setIdentificationInfo({
                      ...identificationInfo,
                      identificationNumber: e.target.value,
                    })
                  }
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
            {/* -------------------------  documents uploads----------------------------- */}
            <Grid
              item
              md={12}
              sx={{
                cursor: "pointer",
              }}
            >
              <Stack gap={1}>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  Scanned Copy of Identification Document
                </Typography>
                <FileUploader file={file} setFile={setFile} />
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
                  <Checkbox
                    defaultChecked
                    value={checkedList[idx]}
                    onChange={(e) => handlecheckbox(e, idx)}
                  />
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
                disabled={!checkedList[0] || !checkedList[1] || !checkedList[2]}
                variant="contained"
                type="submit"
                sx={{
                  my: 5,
                  textTransform: "none",
                  color: "#ffff",
                  "&.MuiButtonBase-root:disabled": {
                    backgroundColor: theme.palette.primary.main,
                    opacity: "40%",
                    color: "darkgray",
                    cursor: "not-allowed",
                    pointerEvents: "auto",
                  },
                }}
                fullWidth
              >
                {isLoading ? (
                  <CircularProgress
                    size={27}
                    sx={{
                      color: "#fff",
                    }}
                  />
                ) : (
                  "Submit and Continue"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* ----------------------------------image------------------------------- */}

      <LeftImage image={"/patients_page_image.png"} />
    </Stack>
  );
};

export default PatientsForm;
