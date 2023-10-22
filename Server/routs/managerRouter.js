import express from "express";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();

import {
  checkReqLogInData,
  authenticateToken,
} from "../midddleware/midddleware.js";
import { checkManagerLogIn, managerDetails } from "../control/Manager.js";
import {
  getFualtByType,
  getAllProperties,
  updateReportStatus,
  getPayments,
  addNewTenant,
} from "../models/managerDB.js";
router.post("/login", checkReqLogInData, checkManagerLogIn);
router.get(`/reportsData/:id`, getFualtByType);
router.get(`/:id/allProperties`, getAllProperties);
router.get("/reportsPayment/:id", getPayments);
router.get("/:id/managerDetails", authenticateToken, managerDetails);
router.put("/updateReportStatus/:reportId", updateReportStatus);
router.post("/logUpNew", authenticateToken, addNewTenant);
// router.delete("/:id/:property_id", authenticateToken, deleteTenant);
export default router;
