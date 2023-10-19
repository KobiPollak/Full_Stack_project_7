import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

import {
  doesUserExist,
  getUserByEmailAndPassword,
  usersDetails,
  addReport,
  createPaymentTransaction,
  deposit,
} from "../control/User.js";
import {
  checkReqUserLogUpData,
  checkReqLogInData,
  checkInput,
  checkReqPaymentData,
  authenticateToken,
} from "../midddleware/midddleware.js";
import { createNewTenant } from "../models/userDB.js";
const router = express.Router();
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

router.use(express.json());

// const app = express();
// app.use(urlencoded({ extended: false }));
// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());
router.post("/payment", checkReqPaymentData, createPaymentTransaction, deposit);

router.post("/logUp", checkReqUserLogUpData, doesUserExist, createNewTenant);

router.post("/logIn", checkReqLogInData, getUserByEmailAndPassword);

router.get("/userDetails/:userId", usersDetails);

router.post(
  "/report",
  authenticateToken,
  async (req, res, next) => {
    try {
      await upload(req, res, next);
      // The file upload is done, now you can access req.file.path
      const imagePath = req.file.path;
      req.imagePath = imagePath;
      console.log("image is uploaded");
    } catch (err) {
      // Handle any errors that occurred during file upload
      console.error("Error uploading file:", err);
      res.status(500).json({ error: "Error uploading file" });
    }
  },
  addReport
);

export default router;
