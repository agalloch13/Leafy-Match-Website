import React, { useState } from "react";
import axios from "axios";
import "../styles.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/signin", formData);
      if (res.data.Status === "Success") {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        alert(res.data.Message);
      }
    } catch (err) {
      console.error("Sign-in request failed:", err);
      alert("Sign-in request failed. Please try again later.");
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            {isSignIn ? (
              <>
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                </form>
                <p className="mt-3">
                  Don't have an account?{" "}
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={toggleForm}
                  >
                    Sign Up
                  </span>
                </p>
              </>
            ) : (
              <>
                <h2>Sign Up</h2>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </form>
                <p className="mt-3">
                  Already have an account?{" "}
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={toggleForm}
                  >
                    Log In
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
