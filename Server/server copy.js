import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["input frontend url here"],
    methods: ["POST", "GET"], // Corrected the methods array
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "Please provide token. Login" });
  } else {
    jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentication Error." });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", name: req.name });
});

// Sign-up endpoint
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ Message: "Internal server error" });
    }

    // Insert user data into the database
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error inserting user into database:", err);
        return res.status(500).json({ Message: "Internal server error" });
      }

      // User successfully signed up
      return res.json({ Message: "User signed up successfully" });
    });
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
});

app.listen(8081, () => {
  console.log("Running");
});
