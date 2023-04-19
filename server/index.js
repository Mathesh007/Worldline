const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();

app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "employee",
  password: "Nirmala@0071",
  port: 5432,
});

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

app.post("/", async (req, res) => {
  const {name,email,mobile,gender,dob,qualification,experience,doj} =
    req.body;
  if (!validateEmail(email)) {
    res.json({ error: "Invalid Email" });
    return;
  }
  try {
    await pool.query(
        "INSERT INTO EMPLOYEE VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
        [name,email,mobile,gender,dob,qualification,experience,doj]
    );
    res.json({ success: "Inserted Successfully" });
  } catch (err) {
    console.error(err.message);
    res.json({ error: err.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const allForms = await pool.query(
      "select email, name, mobile , gender, dob, qualification,extract('year' from current_date)- extract('year' from dob) as age, extract('year' from current_date) - extract('year' from doj) as currExp, experience- extract('year' from current_date) + extract('year' from doj) as pastExp, doj from employee;"
    );
    console.log(allForms);
    res.json(allForms.rows);
  } catch (err) {
    console.error(err.message);
    res.json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
