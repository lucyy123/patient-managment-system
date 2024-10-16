import { config } from "dotenv";
import fs from "fs";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../middlewares/cloudinary.js";
import { User } from "../models/user.js";
import ErrorHanlder from "../utils/errorHandler.js";
import { generateOTP, sendOtp } from "../utils/OTP.js";
import { TryCatch } from "../utils/tryCatch.js";
config();
//*--------------------------------------- user registeration + OTP send----------------------------------
export const userRegister = TryCatch(async (req, res, next) => {
    const { email, name, phoneNumber, identification, medicalInfo, personalInfo, } = req.body;
    if (!name || !email || !phoneNumber)
        return next(new ErrorHanlder("Mandotory Fields are empty", 404));
    const existingUser = await User.findOne({ email, phoneNumber });
    if (existingUser)
        return next(new ErrorHanlder("User already exist", 404));
    const otp = generateOTP(); //*------------- generate OTP
    const otpExpires = Date.now() + 10 * 60 * 1000; //*---------------- expires in 10 minuts--------------
    const user = await User.create({
        name,
        email,
        phoneNumber,
        identification,
        medicalInfo,
        personalInfo,
        otp,
        otpExpires,
        isVerified: false,
    });
    await user.save();
    const message = `Your Care Plus verification code is: ${otp}. Please use this code to complete your registration. Do not share this code with anyone for security purposes.`;
    await sendOtp(user.phoneNumber, user.otp, message);
    res.status(201).json({
        success: true,
        message: "OTP sent to your mobile number for verification",
        user,
    });
});
//*---------------------------------------- OTP verification ---------------------------------------------
export const verifOTP = TryCatch(async (req, res, next) => {
    const { otp, phoneNumber } = req.body;
    if (!otp || !phoneNumber)
        return next(new ErrorHanlder("Phone Number and OTP is missing", 404));
    const user = await User.findOne({ phoneNumber });
    if (!user)
        return next(new ErrorHanlder("User not found", 404));
    if (user?.otp !== otp || Number(user?.otpExpires) < Date.now()) {
        return next(new ErrorHanlder("Invalid or Expired OTP", 404));
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    //* ----------- store the token in cookies-------------------
    const secret_key = process.env.SECRET_TOKEN_KEY;
    const token = jwt.sign({ userId: user._id }, secret_key, {
        expiresIn: "3h", //*---------- token expire in 3 hours----
    });
    res
        .cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 60 * 60 * 1000, // 2 hour expiration
        path: "/",
    })
        .status(200)
        .json({
        success: true,
        message: "User Verified Successfully",
        user,
    });
});
//*---------------------------------------  user update --------------------------------------------------
export const updateUser = TryCatch(async (req, res, next) => {
    const UserId = req.user.userId;
    //----------------file or image--------------
    const image = req.file;
    if (!UserId)
        return next(new ErrorHanlder("User Id not found", 404));
    const { email, name, phoneNumber, identification, medicalInfo, personalInfo, appointments, } = req.body;
    //---------------- upload the image if  already not
    const updatedImage = await uploadOnCloudinary(image?.path);
    const deletedOldImage = fs.unlinkSync(image?.path);
    const newUser = {
        email,
        name,
        phoneNumber,
        personalInfo,
        medicalInfo,
        identification,
        appointments,
        image: updatedImage?.url || "",
        imageName: updatedImage?.original_filename || "",
        isCompleted: true,
    };
    const updatedUser = await User.findByIdAndUpdate(UserId, {
        $set: newUser,
    }, {
        new: true,
        runValidators: true,
    });
    if (!updateUser)
        return next(new ErrorHanlder("User Not Found", 404));
    res.status(200).json({
        success: true,
        message: "Information Updated Successfully",
        user: updatedUser,
    });
});
//*--------------------------------------- get user ------------------------------------------------------
export const getUser = TryCatch(async (req, res, next) => {
    const UserId = req.user.userId;
    // const id = String(UserId?.userId)
    if (!UserId)
        return next(new ErrorHanlder("User Id Not Found ", 404));
    const user = await User.findById(UserId).populate("appointments");
    if (!user)
        return next(new ErrorHanlder("User Not Found", 404));
    res.status(200).json({
        success: true,
        user,
    });
});
//*--------------------------------------- login ---------------------------------------------------------
export const loginUser = TryCatch(async (req, res, next) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        return next(new ErrorHanlder("Phone number is required", 400));
    }
    const user = await User.findOne({ phoneNumber });
    if (!user) {
        return next(new ErrorHanlder("User not found", 404));
    }
    // If user is not verified, they need to verify through OTP
    if (!user.isVerified) {
        // reset the already filled value
        user.otp = undefined;
        user.otpExpires = undefined;
        const otp = generateOTP(); //*------------- generate OTP
        const otpExpires = Date.now() + 10 * 60 * 1000; //*---------------- expires in 10 minuts--------------
        user.otp = otp;
        user.otpExpires = String(otpExpires);
        await user.save();
        return next(new ErrorHanlder("Enter the OTP for verification", 404));
    }
    // If user is verified, generate a new token
    const secret_key = process.env.SECRET_TOKEN_KEY;
    const token = jwt.sign({ userId: user._id }, secret_key, {
        expiresIn: "3h", // token expiration in 3 hours
    });
    // Store the token in a cookie
    res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 60 * 60 * 1000, // 3-hour expiration
        path: "/",
    });
    res.status(200).json({
        success: true,
        redirect: false,
        message: "User logged in successfully",
        user,
    });
});
//*----------------------------------- user logout ++++++++++++++++++++++++
export const logoutUser = TryCatch(async (req, res, next) => {
    res.clearCookie("authToken", {
        sameSite: "strict",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
});
