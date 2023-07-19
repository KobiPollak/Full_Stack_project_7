require("dotenv").config();

var mysql = require("mysql2");
var express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

var poll = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
    if (err) return res.status(403);
    req.id = id;
    next();
  });
}

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, "fffff");
  if (!email || !password) {
    res.status(400).json({ error: "userName and password are required" });
    return;
  }
  con.connect(function (err) {
    if (err) throw err;
    // console.log(userName, password);
    console.log("Connected!");

    const sql = `SELECT * FROM passwords  where email="${email}" and password="${password}"`;

    con.query(sql, function (err, results, fields) {
      if (err) throw err;
      console.log("query done");
      console.log(results);
      if (results.length === 0) {
        res.status(401).json({ error: "Invalid email or password" });
      } else {
        console.log(results[0].email);
        const user = { email: email };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        res.statusCode = 200;
        res.status(200).json({ accessToken: accessToken, email: email });
      }
    });
  });
});

app.post("/logUp", (req, res) => {
  const { email, password, fullName, address, city, phoneNumber, apartment } =
    req.body;
  console.log(email, password, "fffff");
  if (
    !email ||
    !password ||
    !fullName ||
    !address ||
    !city ||
    !phoneNumber ||
    !apartment
  ) {
    res.status(400).json({ error: "not all the data were submitted" });
    return;
  }
  poll.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from con:", err);
      return;
    }

    // Begin the transaction
    connection.beginTransaction((err) => {
      if (err) {
        console.error("Error starting transaction:", err);
        connection.release();
        return;
      }

      const tenantsInsert =
        "INSERT INTO tenants (fullName, phone, email, address, city, apartment) VALUES (?, ?, ?, ?, ?, ?)";
      // Perform the first SQL query
      connection.query(
        tenantsInsert,
        [fullName, phoneNumber, email, address, city, apartment],
        (err, results) => {
          if (err) {
            console.error("Error executing first query:", err);
            connection.rollback(() => {
              connection.release();
            });
            return;
          }

          const passwordInsert =
            "INSERT INTO passwords (email, password) VALUES (?, ?)";
          // Perform the second SQL query
          connection.query(
            passwordInsert,
            [email, password],
            (err, results) => {
              if (err) {
                console.error("Error executing second query:", err);
                connection.rollback(() => {
                  connection.release();
                });
                return;
              }

              // Commit the transaction if both queries were successful
              connection.commit((err) => {
                if (err) {
                  console.error("Error committing transaction:", err);
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
                  .json({ accessToken: accessToken, email: email });
                // Both queries were successful and the transaction was committed
                connection.release();
                console.log("Transaction completed successfully.");
              });
            }
          );
        }
      );
    });
  });
});

const port = 3100; // or any port number you prefer
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
