import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Specify the allowed origin
    methods: ["POST", "GET"],
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Mock sign-in endpoint for testing
app.post("/signin", (req, res) => {
  // Mock user credentials
  const mockEmail = "test@example.com";
  const mockPassword = "password";

  // Check if email and password match mock credentials
  if (req.body.email === mockEmail && req.body.password === mockPassword) {
    // Generate mock token
    const token = jwt.sign(
      { email: req.body.email },
      "our-jsonwebtoken-secret-key",
      {
        expiresIn: "1d",
      }
    );

    // Set token as cookie
    res.cookie("token", token, { httpOnly: true });

    // Send success response
    return res.json({ Status: "Success", token: token });
  } else {
    // Send failure response
    return res.status(401).json({ Message: "Invalid credentials" });
  }
});

// Mock sign-up endpoint for testing
app.post("/signup", (req, res) => {
  // Your sign-up logic here
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
