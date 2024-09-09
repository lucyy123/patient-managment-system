import { config } from 'dotenv';
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { User } from '../models/user.js';
import { AuthenticatedRequest, OTPverificationReqBody, UserRegisterBody } from "../types/types.js";
import ErrorHanlder from "../utils/errorHandler.js";
import { generateOTP, sendOtp } from "../utils/OTP.js";
import { TryCatch } from "../utils/tryCatch.js";
config()



//*--------------------------------------- user registeration + OTP send----------------------------------

export const userRegister = TryCatch(async (req: Request<{}, {}, UserRegisterBody>, res: Response, next: NextFunction) => {

    const { email, name, phoneNumber, identification, medicalInfo, personalInfo } = req.body

    if (!name || !email || !phoneNumber) return next(new ErrorHanlder('Mandotory Fields are empty', 404))

    const existingUser = await User.findOne({ email, phoneNumber });
    if (existingUser) return next(new ErrorHanlder("User already exist", 404));


    //*------------- generate OTP

    const otp = generateOTP()
    const otpExpires = Date.now() + 10 * 60 * 1000;   //*---------------- expires in 10 minuts--------------




    const user = await User.create({
        name,
        email,
        phoneNumber,
        identification,
        medicalInfo,
        personalInfo,
        otp,
        otpExpires,
        isVerified: false
    })


    await user.save()

    await sendOtp(user.phoneNumber, user.otp as string)

    res.status(201).json({
        success: true,
        message: 'OTP sent to your mobile number for verification',
        user
    })
});


//*---------------------------------------- OTP verification ---------------------------------------------

export const verifOTP = TryCatch(async (req: Request<{}, {}, OTPverificationReqBody>, res: Response, next: NextFunction) => {
    const { otp, phoneNumber } = req.body
    if (!otp || !phoneNumber) return next(new ErrorHanlder('Phone Number and OTP is missing', 404));

    const user = await User.findOne({ phoneNumber })
    if (!user) return next(new ErrorHanlder("User not found", 404));

    console.log('Number(user?.otpExpires) < Date.now():', Number(user?.otpExpires), Date.now())
    if (user?.otp !== otp || Number(user?.otpExpires) < Date.now()) {
        return next(new ErrorHanlder("Invalid or Expired OTP", 404))
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined

    await user.save()

    //* ----------- store the token in cookies-------------------

    const secret_key = process.env.SECRET_TOKEN_KEY as Secret
    const token = jwt.sign({ userId: user._id }, secret_key, {
        expiresIn: '3h'   //*---------- token expire in 3 hours----

    });


    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3 * 60 * 60 * 1000, // 2 hour expiration
        path: '/'
    }).status(200).json({
        success: true,
        message: 'User Verified Successfully'
    })


})


//*---------------------------------------  user update --------------------------------------------------

export const updateUser = TryCatch(async (req:AuthenticatedRequest, res, next) => {
    const UserId  = (req.user as JwtPayload).userId;

    if (!UserId) return next(new ErrorHanlder('User Id not found', 404))
    const { email, name, phoneNumber, identification, medicalInfo, personalInfo, appointments } = req.body

    const newAllergies = medicalInfo.allergies.split(',')


    const newUser = {
        email,
        name,
        phoneNumber,
        personalInfo,
        medicalInfo: {
            allergies: newAllergies
        },
        identification,
        appointments
    }

    const updatedUser = await User.findByIdAndUpdate(UserId, {
        $set: newUser
    }, {
        new: true, runValidators: true
    })

    if (!updateUser) return next(new ErrorHanlder("User Not Found", 404));

    res.status(200).json({
        success: true,
        message: 'Information Updated Successfully'
    })
})


//*--------------------------------------- get user ------------------------------------------------------

export const getUser = TryCatch(async (req:AuthenticatedRequest, res, next) => {
    const UserId  = (req.user as JwtPayload).userId;
    // const id = String(UserId?.userId)

    if (!UserId) return next(new ErrorHanlder(
        "User Id Not Found ", 404
    ))

    const user = await User.findById(UserId).populate('appointments')

    if (!user) return next(new ErrorHanlder('User Not Found', 404))

    res.status(200).json({
        success: true,
        user
    })


})



