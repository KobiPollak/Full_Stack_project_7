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
  console.log(user.apartment);
  const sql = `SELECT * FROM tenants INNER JOIN passwords as p ON tenants.email = p.email where p.email="${user.email}" and password="${user.password}"`;
  const res = pool.query(sql);
  //   console.log(JSON.parse(res[0]));
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

async function getUserDetails(id) {
  console.log(id);
  console.log('in function getUserDetails');
  const sql = `SELECT fullName, phone, email, t.address, t.city, apartment, day_of_week, collection_time, base_payment_amount, extra_payment_amount, extra_payment_description FROM tenants as t JOIN properties as p ON t.address = p.address and t.city = p.city JOIN GarbageRemoval as g ON p.id=g.property_id JOIN basepayment as b ON p.id=b.property_id JOIN extrapayment as e ON p.id=e.property_id where t.id=${id}`;
  const res = pool.query(sql);
  //   console.log(JSON.parse(res[0]));
  return res;
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

async function insertNewReport(req) {
  // const image = req.files.image;
  const { id, location, description, image, type } = req.body;
  const imageBuffer = Buffer.from(image, "base64");
  const data = new Date();
  let property_id = await pool
    .query(
      `SELECT p.id FROM tenants as t JOIN properties as p ON t.address = p.address and t.city = p.city WHERE t.id=${id}`
    )
    .then((table) => {
      return table[0][0].id;
    });
  const sql = `INSERT INTO reports (property_id, description, date_reported, status, type, location, image)
    VALUES (${property_id}, '${description}', '${data}', 'Open', '${type}', '${location}', ${imageBuffer})`;
  const res = pool.query(sql);
  //   console.log(JSON.parse(res[0]));
  return res;
}

async function createPaymentTransactionDb(req) {
  console.log('in function createPaymentTransactionDb');

  const {
    id,
    cardNumber,
    cardType,
    cardHolderName,
    expirationYear,
    expirationMonth,
    reason,
    formattedMonth,
    amount,
  } = req.body;
  const [result] = await pool.query(
    `
    INSERT INTO payments (tenant_id, month, reason, card_type, card_number, card_holder_name,expiration_month,expiration_year,amount)
    VALUES (?,?,?,?, ?, ?, ?, ?, ?)`,
    [
      id,
      formattedMonth,
      reason,
      cardType,
      cardNumber,
      cardHolderName,
      expirationMonth,
      expirationYear,
      amount,
    ]
  );
  return result.insertId;
}
async function getPropertyIdByTenantId(tenantId) {
  console.log('in function getPropertyIdByTenantId');
  const sql1 = `SELECT address, city FROM tenants where id="${tenantId}" `;

  // Change 'result' to 'results'
  const [results] = await pool.query(sql1);
  console.log(results);

  const sql2 = `SELECT id FROM properties where address="${results[0].address}" and city="${results[0].city}"`;

  const [final] = await pool.query(sql2);

  console.log(final[0].id);

  return final[0].id;
}
async function depositDb(property_id, amount) {
  try {
    const sql = `UPDATE bankaccounts SET moneyamount = moneyamount + ? WHERE property_id = ?`;

    // Perform the UPDATE query to deposit the money
    const [result] = await pool.query(sql, [amount, property_id]);

    if (result.affectedRows === 0) {
      // If no rows were affected, it means the property_id was not found
      // You can handle this case according to your requirements (e.g., throw an error, return false, etc.)
      console.log(`Property with ID ${property_id} not found.`);
      return false;
    }
    console.log(
      `Successfully deposited ${amount} into Property ID ${property_id}.`
    );

    // Return true to indicate that the deposit was successful
    return true;
  } catch (error) {
    console.error('Error depositing money:', error);
    return false;
  }
}

export {
  createNewTenant,
  getUserEmail,
  getUserByEmail,
  getUserDetails,
  insertNewReport,
  createPaymentTransactionDb,
  getPropertyIdByTenantId,
  depositDb,
};
