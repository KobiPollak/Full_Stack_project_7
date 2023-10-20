import { pool, con, pool1 } from "./connection.js";

async function managerLogIn(user) {
  console.log("in function managerLogIn");
  const sql = `SELECT * FROM managers where email="${user.email}" and password="${user.password}"`;
  const res = pool.query(sql);
  //   console.log(JSON.parse(res[0]));
  return res;
}

async function getFualtByType(req, res) {
  console.log('in function getFualtByType');
  const sql = `SELECT * FROM reports where type="${req.params.selectedOption}" `;
  const result = pool.query(sql);
  console.log(result[0]);
}
async function getAllProperties(req, res) {
  console.log('in function getAllPropertiesNumbers');
  const sql = `SELECT id,city,address FROM properties  `;
  const result = pool.query(sql);
  console.log(result[0]);
}
export { managerLogIn, getFualtByType, getAllProperties };
