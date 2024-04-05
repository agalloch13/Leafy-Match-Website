const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", (req, res) => {
  // Get the email and password from the request body
  const { email, password } = req.body;

  // Validate the user's credentials (e.g., check against a database)
  if (email === "user@example.com" && password === "password") {
    // If the credentials are valid, generate a token
    const token = jwt.sign({ email }, "your_secret_key", { expiresIn: "1h" });

    // Send the token in the response
    res.json({ token });
  } else {
    // If the credentials are invalid, send an error response
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
