import express from "express";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();

import { checkReqLogInData } from "../midddleware/midddleware.js";
import { checkManagerLogIn } from "../control/Manager.js";
import { getFualtByType, getAllProperties } from '../models/managerDB.js';

router.post("/login", checkReqLogInData, checkManagerLogIn);

router.get(`report/:selectedOption`, getFualtByType);

router.get(`/allProperties`, getAllProperties);

export default router;
