import { pool, con, pool1 } from './connection.js';
import jwt from 'jsonwebtoken';

async function getUserEmail(user) {
  console.log('in function getUserEmail');
  console.log(user.apartment);
  const sql = `SELECT * FROM tenants where email="${user.email}" or (address="${user.address}" and apartment="${user.apartment}" and city="${user.city}")`;
  const res = pool.query(sql);
  //   console.log(JSON.parse(res[0]));
  return res;
}
async function getUserByEmail(user) {
  console.log('in function getUserByEmail');
  console.log(user);
  const sql = `SELECT * FROM tenants INNER JOIN passwords ON tenants.email = passwords.email where passwords.email=? and password=?`;
  const res = pool.query(sql, [user.email, user.password]);
  console.log('ggggggggggggggg');

  res
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
  return res;
}
function createNewTenant(req, res) {
  console.log('in function createNewTenant');
  const { email, password, fullName, address, city, phoneNumber, apartment } =
    req.body;
  pool1.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from con:', err);
      return;
    }

    // Begin the transaction
    connection.beginTransaction((err) => {
      if (err) {
        console.error('Error starting transaction:', err);
        connection.release();
        return;
      }
      const tenantsInsert =
        'INSERT INTO tenants (fullName, phone, email, address, city, apartment) VALUES (?, ?, ?, ?, ?, ?)';
      // Perform the first SQL query
      connection.query(
        tenantsInsert,
        [fullName, phoneNumber, email, address, city, apartment],
        (err, results) => {
          if (err) {
            console.error('Error executing first query:', err);
            connection.rollback(() => {
              connection.release();
            });
            return;
          }
          const id = results.insertId;
          const passwordInsert =
            'INSERT INTO passwords (email, password) VALUES (?, ?)';
          // Perform the second SQL query
          connection.query(
            passwordInsert,
            [email, password],
            (err, results) => {
              if (err) {
                console.error('Error executing second query:', err);
                connection.rollback(() => {
                  connection.release();
                });
                return;
              }

              // Commit the transaction if both queries were successful
              connection.commit((err) => {
                if (err) {
                  console.error('Error committing transaction:', err);
                  connection.rollback(() => {
                    connection.release();
                  });
                  return;
                }
                const user = { email: email };
                const accessToken = jwt.sign(
                  user,
                  process.env.ACCESS_TOKEN_SECRET
                );

                res.statusCode = 200;
                res
                  .status(200)
                  .json({ accessToken: accessToken, email: email, id: id });
                // Both queries were successful and the transaction was committed
                connection.release();
                console.log('Transaction completed successfully.');
              });
            }
          );
        }
      );
    });
  });
}

function checkUser(req, res) {
  const { email, password } = req.body;
  console.log('Connected!');

  const sql = `SELECT * FROM passwords  where email="${email}" and password="${password}"`;

  con.query(sql, function (err, results, fields) {
    if (err) throw err;
    console.log('query done');
    console.log(results);
    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid email or password' });
    } else {
      console.log(results[0].email);
      const user = { email: email };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

      res.statusCode = 200;
      res.status(200).json({ accessToken: accessToken, email: email });
    }
  });
}

export { createNewTenant, getUserEmail, getUserByEmail };
