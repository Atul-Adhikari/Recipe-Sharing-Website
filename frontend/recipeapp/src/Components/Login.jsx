import React, { useState } from "react";
import styles from "../Styles/login.module.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = { username, password };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("loggedInUser", username);
        setIsAuthenticated(true);
        navigate("/home");
      } else {
        setErrorMessage(data.error || "Login failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <div className={styles.formPart}>
          <div className={styles.logo}>
            <img src="/Images/oplogo.jpeg" alt="Logo" />
          </div>
          <p>Welcome to Flavor Finder</p>
          <p className={styles.signinText}>Sign into your account</p>
          <form className={styles.form} onSubmit={handleLogin}>
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
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
          <div className={styles.signupLink}>
            <p>
              Don't have an account? <a href="/register">Create one</a>
            </p>
          </div>
        </div>
        <div className={styles.imagePart}>
          <img src="/Images/login.png" alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
