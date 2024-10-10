import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.js";
import ErrorHanlder from "../utils/errorHandler.js";
import { TryCatch } from "../utils/tryCatch.js";
//*---------------------------------------- Admin Verification----------------------------------------------
export const adminAuthenticaton = TryCatch(async (req, res, next) => {
    const { passkeys } = req.body;
    console.log('passkeys:', passkeys);
    if (!passkeys)
        return next(new ErrorHanlder("Enter Valid Passkey", 404));
    const isAdmin = await Admin.findOne({ passkey: passkeys });
    if (!isAdmin)
        return next(new ErrorHanlder("Permission Denied, Enter Valid Passkey", 401));
    // If user is verified, generate a new token
    const secret_key = process.env.SECRET_TOKEN_KEY;
    const token = jwt.sign({ adminId: isAdmin._id }, secret_key, {
        expiresIn: '3h', // token expiration in 3 hours
    });
    // Store the token in a cookie
    res.cookie('authAdminToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3 * 60 * 60 * 1000, // 3-hour expiration
        path: '/',
    });
    res.status(200).json({
        success: true,
        admin: isAdmin
    });
});
//*-----------------------------Admin logut-------------------------
export const logoutAdmin = TryCatch(async (req, res, next) => {
    res.clearCookie('authAdminToken', {
        sameSite: 'strict',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
    return res.status(200).json({
        success: true,
        message: 'logged out successfully',
    });
});
