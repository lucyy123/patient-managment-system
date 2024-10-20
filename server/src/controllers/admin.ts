import jwt, { Secret } from "jsonwebtoken";
import { Admin } from "../models/admin.js";
import ErrorHanlder from "../utils/errorHandler.js";
import { TryCatch } from "../utils/tryCatch.js";



//*---------------------------------------- Admin Verification----------------------------------------------

export const adminAuthenticaton = TryCatch(async (req, res, next) => {
    const { passkeys } = req.body
    console.log('passkeys:', passkeys)

    if (!passkeys) return next(new ErrorHanlder("Enter Valid Passkey", 404));

    const isAdmin = await Admin.findOne({ passkey: passkeys })

    if (!isAdmin) return next(new ErrorHanlder("Permission Denied, Enter Valid Passkey", 401));

    // If user is verified, generate a new token
    const secret_key = process.env.SECRET_TOKEN_KEY as Secret;
    const token = jwt.sign({ adminId: isAdmin._id }, secret_key, {
        expiresIn: '3h', // token expiration in 3 hours
    });

    // Store the token in a cookie
    res.cookie('authAdminToken', token, {
        httpOnly: true,
         secure:true,
          sameSite: "lax",
        maxAge: 3 * 60 * 60 * 1000, // 3-hour expiration
        path: '/',
    });


    res.status(200).json({
        success: true,
        admin: isAdmin
    })

});

//*-----------------------------Admin logut-------------------------

export const logoutAdmin = TryCatch(async (req, res, next) => {
    res.clearCookie('authAdminToken', {
          sameSite: "lax",
        httpOnly: true,
       secure:true,
    });

    return res.status(200).json({
        success: true,
        message: 'logged out successfully',
    });

})


//*------------------------------ get All Admins---------------------


export const getAllAdmins = TryCatch(async (req, res, next) => {
    const admins = await Admin.find().select('name speciality');
    if (!admins) return next(new ErrorHanlder("No Doctors Are Registers", 404))
    res.status(200).json({
        success: true,
        admins
    })
})

//*--------------------------- All appointments ------------------------------

export const allAppointments = TryCatch(async (req, res, next,) => {

    const { id } = req.params

    if (!id) return next(new ErrorHanlder("Invalid Id", 404))
    const admin = await Admin.findById(id).populate({
        path: 'appointmentsOfUsers', populate: {
            path: 'appointmentId'
        }



    }).select('appointmentsOfUsers')
    if (!admin) return next(new ErrorHanlder("No Appointment is scheduled", 404))
    res.status(200).json({
        success: true,
        appointmentsOfUsers: admin.appointmentsOfUsers
    })



})