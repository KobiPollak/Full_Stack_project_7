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
  host: "localhost",
  user: "root",
  password: "Kobi09pollak",
  database: "project7",
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

    const sql = `SELECT * FROM passwords as p join tenants as t ON p.email = t.email where p.email='${email}' and p.password='${password}'`;

    con.query(sql, function (err, results, fields) {
      if (err) throw err;
      console.log("query done");

      if (results.length === 0) {
        res.status(401).json({ error: "Invalid email or password" });
      } else {
        console.log(results[0].id);
        const user = { id: results[0].id };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        res.statusCode = 200;
        res.status(200).json({ accessToken: accessToken, id: results[0].id });
      }
    });
  });
});

const port = 3100; // or any port number you prefer
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
