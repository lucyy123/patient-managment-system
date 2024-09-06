import { NextFunction, Request, Response } from "express"
import { ControllerType } from "../types/types.js"

export const TryCatch = (fun: ControllerType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(fun(req, res, next)).catch((next))
    }
}
