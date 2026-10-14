import { Router } from "express";
import { getAttendence, markAttendence } from "../controllers/empController.js";

const empRouter = Router();

empRouter.post("/mark", markAttendence);
empRouter.get("/attendence/:id", getAttendence);

export default empRouter;
