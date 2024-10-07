import React, { useState } from "react";
import styles from "../Styles/login.module.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (username && password) {
      setErrorMessage("");
      try {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
          navigate("/login");
        } else {
          setErrorMessage(data.error || "Registration failed");
        }
      } catch (error) {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } else {
      setErrorMessage("Please fill in all fields");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <div className={styles.formPart}>
          <div className={styles.logo}>
            <img src="/Images/oplogo.jpeg" alt="Logo" />
          </div>
          <p>Create a new account</p>
          <form className={styles.form} onSubmit={handleRegister}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username here..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password here..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password here..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <br />
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
            <button type="submit" className={styles.loginButton}>
              Register
            </button>
          </form>
        </div>
        <div className={styles.imagePart}>
          <img src="/Images/registration.jpg" alt="Register Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Register;
