import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { doesUserExist, getUserByEmailAndPassword } from '../control/User.js';
import {
  checkReqUserLogUpData,
  checkReqUserLogInData,
} from '../midddleware/midddleware.js';
import { createNewTenant } from '../models/userDB.js';
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();

// const app = express();
// app.use(urlencoded({ extended: false }));
// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());

router.post('/logUp', checkReqUserLogUpData, doesUserExist, createNewTenant);

router.post('/logIn', checkReqUserLogInData, getUserByEmailAndPassword);
// (req, res) => {
//   con.connect(function (err) {
//     if (err) throw err;
//     // console.log(userName, password);
//   });
// };

export default router;
