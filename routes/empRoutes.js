import { Router } from "express";
import { attendenceAssign, getAttendence, markAttendence } from "../controllers/empController.js";

const empRouter = Router();

empRouter.post("/mark", markAttendence);
empRouter.post("/attendence/assign", attendenceAssign);
empRouter.get("/attendence", getAttendence);

export default empRouter;
