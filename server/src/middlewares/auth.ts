import { config } from 'dotenv';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { User } from "../models/user.js";
import { AuthenticatedRequest } from '../types/types.js';
import ErrorHanlder from "../utils/errorHandler.js";
import { TryCatch } from "../utils/tryCatch.js";
config();

export const authenticated = TryCatch(async (req: AuthenticatedRequest, res, next) => {

  const token = req.cookies.authToken

  if (!token) return next(new ErrorHanlder("your session is expired,please re-login first", 404));

  const decode = jwt.verify(token, process.env.SECRET_TOKEN_KEY as Secret) as JwtPayload

  req.user = decode

  next()

})


export const AdminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHanlder("you don't have the permission ", 403));

  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHanlder("Invalid Id. not found", 404));
  }

  if (user?.role != "admin") {
    return next(
      new ErrorHanlder("You Don't have the permission,Forbidden", 403)
    );
  }
  next();
});



