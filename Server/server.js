import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import userRouter from './routs/userRouter.js';
import managerRouter from './routs/managerRouter.js';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);

app.use('/manager', managerRouter);

const port = 3100; // or any port number you prefer
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
