import { User } from "../models/user.js";
import ErrorHanlder from "../utils/errorHandler.js";
import { TryCatch } from "../utils/tryCatch.js";

export const AdminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHanlder("Please verify first", 404));

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



