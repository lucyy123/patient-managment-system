import { NextFunction, Request, Response } from "express";
import { Appointment } from "../models/appointment.js";
import { User } from '../models/user.js';
import { AppointmentBody } from "../types/types.js";
import ErrorHanlder from "../utils/errorHandler.js";
import { TryCatch } from "../utils/tryCatch.js";

//*------------------------------------------------  new appointment----------------------------------------------

export const newAppointment = TryCatch(
    async (
        req: Request<{}, {}, AppointmentBody>,
        res: Response,
        next: NextFunction
    ) => {
        const { physicianName, status, time, user, date, discriptions } = req.body;

        if (!physicianName || !time || !user)
            return next(new ErrorHanlder("All Fields are mandotory", 404));

        const newAppoint = await Appointment.create({
            physicianName,
            status,
            user,
            time,
            date,
            discriptions
        });


        const userfor = await User.findById(user)
        userfor?.appointments.push(String(newAppoint._id))
        userfor?.save()

        res.status(201).json({
            success: true,
            message: "You Make a new Appointment"
        })

    });

    //*--------------------------------------------- get All Appointments---------------------------------------------------------

    // export const getAllAppointments  = TryCatch(async (req,res,next )=>{
        
    // })


    //*----------------------------------------------- update Appointment [A D M I N   O N L Y]-------------------------------------------------
    
export const updateAppointment = TryCatch(async (req, res, next) => {
    
        // admin Id (throug reuest)
        const { id } = req.params;
        
        if (!id) return next(new ErrorHanlder(
            "Invalid Appointment Id", 404
        ));
    
        let { status } = req.body
    
        if(!status) return next (new ErrorHanlder("Provide Status Value",404))
    
    
        const appointment = await Appointment.findById(id)
        if (!appointment) return next(new ErrorHanlder("appointment not found", 404));
    
        switch (String(status).toLowerCase()) {
            case 'pending':
                appointment.status = status
                break;
            case 'cancelled':
                appointment.status = status
    
            default:
                appointment.status = status
                break;
        }
        await appointment.save()
    
        res.status(200).json({
            success:true,
            message:"Appointment Status Updated",
            updatedAppointment: appointment
    
        })
    
    
    });