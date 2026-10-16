import jwt from "jsonwebtoken";
import { createError } from "./errorMiddleware.js";

export const authentication = async (req, res, next) => {
  const token = req.cookies.EMS_token;
  try {
    if (!token) throw createError("Yout are not authorised", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const operatorAccess = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(new createError("Yout are not authorised", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!["operator", "admin"].includes(decoded.role)) {
    return next(new createError("Yout dont have permission", 401));
  }

  req.user = decoded;
  next();
};
export const empAccess = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(new createError("Yout are not authorised", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!["operator", "admin", "employee"].includes(decoded.role)) {
    return next(new createError("Yout dont have permission", 401));
  }

  req.user = decoded;
  next();
};
