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

export const uploadToCloud = async ({ filePath, filename }) => {
  const isDocument =
    filename.endsWith(".pdf") ||
    filename.endsWith(".doc") ||
    filename.endsWith(".docx");

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "SMs",
        resource_type: isDocument ? "raw" : "image",
        public_id: filename,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed:", error);
          return reject(
            createError(error.message || "Upload to cloud error", 500),
          );
        }
        resolve(result);
      },
    );

    uploadStream.end(filePath);
  });
};

export const compareDate = (a, b) =>
  new Date(a).toISOString().split("T")[0] ===
  new Date(b).toISOString().split("T")[0];
