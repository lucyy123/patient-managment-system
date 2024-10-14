
//*------------------------------- M O D E L --------------------------------------
// ----------------------------  user --------------------------------------

import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

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

export interface IUser extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    age: number;
    createdAt: Date;
    updatedAt: Date;
    personalInfo: PersonalInfo;
    medicalInfo: MedicalInfo;
    identification: Identificatin;
    appointments:string[];
    role:string
    otp:string | undefined;
    otpExpires:string  | undefined;
    isVerified:boolean;
}

export type OTPverificationReqBody = {
    phoneNumber:string;
    otp:string;
}



//*-------------------------------------  E R R O R  H A N D L I NG -------------------------------------
//----------------------------- try catch handler -------------------
// user type for prop OR functions
export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;


// authentications
export interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload; // 'user' can be string or JwtPayload based on token content
  }
  



//*-------------------------------------------- R O U T E S------------------------------------
//------------------------------- User------------------------------------

export type UserRegisterBody = {
    name: string;
    email: string;
    phoneNumber: string;
    personalInfo?: PersonalInfo;
    medicalInfo?: MedicalInfo;
    identification?: Identificatin
    appointments?:string []
    role?:string
}

//------------------------------Appointments------------------------------
export type AppointmentBody = {
    docId:string
    status?: string;
    user: string;
    physicianName: string;
    time: string
    date:Date,
    reason:string
    additionalInfo?:string

}


//*------------------------------------------- CACHING -------------------------------------------

export type InvalidateCacheType ={
    user:boolean,
    appointment:boolean
}