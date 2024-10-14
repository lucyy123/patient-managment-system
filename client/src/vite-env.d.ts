import { SvgIconComponent } from '@mui/icons-material';
/// <reference types="vite/client" />

export type CardsContentsType = {
  icon: SvgIconComponent
  color: string
  subtitle: string

}

export type TableRowsType = {
  id: number;
  patient: string;
  date: string;
  status: string;
  doctor: string;
}


interface ImportMetaEnv {
  readonly VITE_FIREBASE_APIKEY: string;
  readonly VITE_SERVER_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

//*---------------------------- REDUX API ----------------------------------
//*------------ USER--------------

type MedicalInfo = {
  allergies: string[];
  primaryCarePhy?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  currentMedications?: string;
  familyMedicalHistory?: string;
  userPastMedicalHistory?: string;
}

type PersonalInfo = {
  dateofBirth?: Date | undefined;
  gender?: string;
  address?: string;
  occupation?: string;
  emergencyContName?: string;
  emergencyContNumber?: string
}

type Identificatin = {
  identificationType?: string;
  identificationNumber?: string;
  image?: string;
}

export type UserTYPE = {
  _id: string
  name: string,
  email: string,
  phoneNumber: string,
  personalInfo?: PersonalInfo,
  medicalInfo?: MedicalInfo,
  identification?: Identificatin,
  appointments?: string[],
  isVerified?: boolean,
  role?: string
  isCompleted?: boolean
}


export type UserRegistrationResMsg = {
  success: boolean,
  message: string,
  user?: UserTYPE
}

export type UserRegisterReqBody = {
  name: string,
  email: string,
  phoneNumber: string,
}

export type UserVefiyReqBody = {
  phoneNumber: string,
  otp: string
}

export type UserReducerInitialState = {
  user: UserTYPE | null;
  loading: boolean
}

export type UserUpdateReqBody = {
  formdata: FormData
}


export type AppointReqBodyType = {
  status?: string;
  user: string | undefined;
  physicianName: string;
  docId: string;
  time: string
  date: Date | undefined,
  reason: string
  additionalInfo?: string
}
export type AppointResBodyType = {
  success: boolean;
  message: string
  appointment: AppointmentType
}

export type AppointmentType = {

  _id: string
  user: string
  physicianName: string
  time: string;
  docId: string;
  reason: string
  additionalInfo: string
  date: Date | undefined
  status: string
}

export type AppointReducerInitStateType = {
  appointment: AppointmentType | null,
  loading: boolean
}

export type LoginUserResType = {
  success: boolean;
  redirect: boolean;
  message: string;
  user?: UserTYPE
}

export type LoginUserReqBodyType = {
  phoneNumber: string
}

type AdminType = {
  _id: string;
  name: string;
  email: string;
  passkeys: string;
  discription: string;
  speciality: string

}

export type AdminResMes = {
  success: boolean;
  admin: AdminType
}

export type AdminReqbodyType = {
  passkeys
}

export type AdminInitStateType = {
  admin: AdminType | null
  loading: boolean
}

export type AdminsType = {
  admins: AdminItemType[]
}
type AdminItemType = {
  name: string;
  speciality: string;
  _id: string
}

type userAppointDisplayOnDashboardType = {
  patientPhone: string;
  patientEmail: string;
  patientName: string;
  appointmentId: AppointmentType
  _id:string

}