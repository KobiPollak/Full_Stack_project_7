import { getUserEmail, getUserByEmail } from '../models/userDB.js';

async function doesUserExist(req, res, next) {
  console.log('in function doesUserExist');
  //   try {
  // console.log('hey beck');
  // console.log(req);

  // console.log(username);
  const user = await getUserEmail(req.body)
    .then((user) => {
      console.log(user[0]);
      if (user[0].length > 0) {
        return res.status(401).send({ error: 'user is exists.' });
      }
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
}
async function getUser(req, res, next) {
  console.log('in function getUser');
  //   try {
  // console.log('hey beck');
  // console.log(req);

  // console.log(username);
  const user = await getUserEmail(req.body)
    .then((user) => {
      console.log(user[0]);
      if (user[0].length > 0) {
        return res.status(401).send({ error: 'user is exists.' });
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
  const user = await getUserByEmail(userForDb);
}
export { doesUserExist, getUserByEmailAndPassword };
