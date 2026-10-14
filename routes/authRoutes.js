import { Router } from "express";
import {
  changePassword,
  loginUser,
  logout,
} from "../controllers/userController.js";
import { adminAccess } from "../middleware/authMiddleware.js";

const authRoute = Router();

authRoute.post("/login", loginUser);
authRoute.post("/logout", logout);
authRoute.patch("/cp", adminAccess, changePassword);

export default authRoute;
