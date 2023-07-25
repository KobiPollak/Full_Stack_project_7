import { pool, con, pool1 } from "./connection.js";

async function managerLogIn(user) {
  console.log("in function managerLogIn");
  const sql = `SELECT * FROM managers where email="${user.email}" and password="${user.password}"`;
  const res = pool.query(sql);
  //   console.log(JSON.parse(res[0]));
  return res;
}

export { managerLogIn };
