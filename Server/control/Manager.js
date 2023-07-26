import jwt from "jsonwebtoken";

import { managerLogIn } from "../models/managerDB.js";

async function checkManagerLogIn(req, res) {
  const managerForDb = req.body;
  await managerLogIn(managerForDb)
    .then((table) => {
      if (table[0].length === 0) {
        return res.status(401).send({ error: "manager doesn't exist." });
      }
      const user = { email: managerForDb.email };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

      res.statusCode = 200;
      return res.status(200).json({
        accessToken: accessToken,
        email: managerForDb.email,
        id: table[0][0].id,
      });
    })
    .catch((err) => console.log(err));
}

async function getProperties(){
  const id = req.params.id;
  await 
}

export { checkManagerLogIn };
