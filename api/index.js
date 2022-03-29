const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require("crypto");
const app = express();
const mysql = require("mysql");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");

const db = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password",
  database: "IMDB",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/getAll", (req, res) => {
  const getAll = `
    SELECT * FROM imdb_data
    ORDER BY RAND() LIMIT 1001`;
  db.query(getAll, (err, result) => {
    res.send(result);
  });
});

app.get("/api/getTwo", (req, res) => {
    const getAll = `
      SELECT * FROM imdb_data
      ORDER BY RAND() LIMIT 2`;
    db.query(getAll, (err, result) => {
      res.send(result);
    });
  });

app.listen(3001, () => {
  console.log("Frain: Running on port 3001");
});
