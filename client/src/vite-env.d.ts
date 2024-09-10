import { SvgIconComponent } from '@mui/icons-material';
/// <reference types="vite/client" />

export type CardsContentsType = {
    icon:SvgIconComponent
    color:string
    subtitle:string

}

export type TableRowsType ={
    id: number;
    patient: string;
    date: string;
    status: string;
    doctor: string;
}


 interface ImportMetaEnv {
    readonly VITE_FIREBASE_APIKEY: string;
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
    dateofBirth?: Date;
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

export type UserTYPE={
    name: string,
    email: string,
    phoneNumber: string,
    personalInfo?: PersonalInfo,
    medicalInfo?: MedicalInfo,
    identification?: Identificatin,
    appointments?:string[],
}


  export type UserRegistrationResMsg={
    success: boolean,
    message: string,
    user?:UserTYPE
  }

  export type UserRegisterReqBody={
    name:string,
    email:string,
    phoneNumber:string,
  }

  export type UserVefiyReqBody ={
    phoneNumber:string ,
    otp:string
  }

  export type UserReducerInitialState={
    user: UserTYPE |null;
    loading:boolean
  }