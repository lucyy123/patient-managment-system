import { NextFunction, Request, Response } from "express";
import { User } from '../models/user.js';
import { UserRegisterBody } from "../types/types.js";
import ErrorHanlder from "../utils/errorHandler.js";
import { TryCatch } from "../utils/tryCatch.js";


//*--------------------------------------- user registeration---------------------------------------------

export const userRegister = TryCatch(async (req: Request<{}, {}, UserRegisterBody>, res: Response, next: NextFunction) => {

    const { email, name, phoneNumber, identification, medicalInfo, personalInfo } = req.body

    if (!name || !email || !phoneNumber) return next(new ErrorHanlder('Mandotory Fields are empty', 404))



    const user = await User.create({
        name,
        email,
        phoneNumber,
        identification,
        medicalInfo,
        personalInfo

    })

    res.status(201).json({
        success: true,
        message: 'Registration Completed Successfully',
        user
    })
});


//*--------------------------------------- get user ------------------------------------------------------

export const getUser = TryCatch(async (req, res, next) => {
    const { id: UserId } = req.params;

    if (!UserId) return next(new ErrorHanlder(
        "User Id Not Found ", 404
    ))

    const user = await User.findById(UserId)

    if (!user) return next(new ErrorHanlder('User Not Found', 404))

    res.status(200).json({
        success: true,
        user
    })


})


//*---------------------------------------  user update --------------------------------------------------

export const updateUser = TryCatch(async (req, res, next) => {
    const { id: UserId } = req.params

    if (!UserId) return next(new ErrorHanlder('User Id not found', 404))
    const { email, name, phoneNumber, identification, medicalInfo, personalInfo } = req.body

    const newAllergies = medicalInfo.allergies.split(',')


    const newUser = {
        email,
        name,
        phoneNumber,
        identification,
        medicalInfo: {
            allergies: newAllergies
        },
        personalInfo
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

