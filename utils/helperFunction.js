import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { createError } from "../middleware/errorMiddleware.js";

export const createToken = async (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY },
  );

  return token;
};

export const uploadToCloud = async ({ filePath }) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "SMs",
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error("error is just ", error);
    throw createError(error?.message || "Upload to cloud error", 500);
  }
};

export const compareDate = (a, b) =>
  new Date(a).toISOString().split("T")[0] ===
  new Date(b).toISOString().split("T")[0];
