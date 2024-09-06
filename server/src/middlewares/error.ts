import { NextFunction, Request, Response } from "express";
import ErrorHanlder from "../utils/errorHandler.js";

export const ErrorMiddleware = async (err:ErrorHanlder,req:Request,res:Response,next:NextFunction)=>{

    err.message = err.message || 'internal server error';
    err.statusCode = err.statusCode || 500


return res.status(err.statusCode).json({
    message:err.message,
    success:false
})
}


