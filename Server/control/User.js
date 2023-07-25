import {
  getUserEmail,
  getUserByEmail,
  getUserDetails,
} from "../models/userDB.js";
import jwt from "jsonwebtoken";

async function doesUserExist(req, res, next) {
  console.log("in function doesUserExist");
  //   try {
  // console.log('hey beck');
  // console.log(req);

  // console.log(username);
  const user = await getUserEmail(req.body)
    .then((user) => {
      console.log(user[0]);
      if (user[0].length > 0) {
        return res.status(401).send({ error: "user is exists." });
      }
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
}
async function getUser(req, res, next) {
  console.log("in function getUser");
  //   try {
  // console.log('hey beck');
  // console.log(req);

  // console.log(username);
  const user = await getUserEmail(req.body)
    .then((user) => {
      console.log(user[0]);
      if (user[0].length > 0) {
        return res.status(401).send({ error: "user is exists." });
      }
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
}
async function getUserByEmailAndPassword(req, res) {
  const userForDb = req.body;
  const user = await getUserByEmail(userForDb)
    .then((table) => {
      if (table[0].length === 0) {
        return res.status(401).send({ error: "user doesn't exists." });
      }
      const user = { email: userForDb.email };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

      res.statusCode = 200;
      return res.status(200).json({
        accessToken: accessToken,
        email: userForDb.email,
        id: table[0][0].id,
      });
    })
    .catch((err) => console.log(err));
}

async function usersDetails(req, res) {
  const userId = req.params.userId;
  await getUserDetails(userId).then((data) => {
    console.log(data[0]);
    if (data[0].length === 0) {
      return res.status(401).send({ error: "user doesn't exists." });
    }
    return res.status(200).json(data[0][0]);
  });
}

export { doesUserExist, getUserByEmailAndPassword, usersDetails };
