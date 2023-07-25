import express from "express";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();

import { checkReqLogInData } from "../midddleware/midddleware.js";
import { checkManagerLogIn } from "../control/Manager.js";

router.post("/login", checkReqLogInData, checkManagerLogIn);

export default router;
