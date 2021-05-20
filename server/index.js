const express = require("express");
const mysql = require("mysql");
var cors = require("cors");
const app = express();
const port = 5001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "DBMSproject",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Server!");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  let statement =
    "Insert into libraby (student_id, student_name, year, book_id, book_name, author, publisher, cost, booking_date, renewal_date) VALUES ('" +
    req.body.studentId +
    "', '" +
    req.body.studentName +
    "', '" +
    req.body.year +
    "', '" +
    req.body.bookId +
    "', '" +
    req.body.bookName +
    "','" +
    req.body.author +
    "','" +
    req.body.publisher +
    "','" +
    req.body.cost +
    "','" +
    req.body.bookingDate +
    "','" +
    req.body.renewalDate +
    "');";

  connection.query(statement, (err, rows) => {
    if (err) {
      res.Status(404).json({ error: err });
      connection.end();
    }
    console.log("The data from users table are: \n", rows);
  });
  res.send("data recieved");
});

app.get("/display", (req, res) => {
  connection.query("SELECT * from libraby", (err, rows) => {
    if (err) {
      res.Status(404).json({ error: err });
      connection.end();
    }
    console.log("The data from libraby table are: \n", rows);
    res.send(rows);
  });
});
app.listen(port, () => console.log(`connected to port ${port}`));
