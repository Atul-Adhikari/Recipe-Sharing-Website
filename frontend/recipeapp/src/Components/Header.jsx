import React from "react";
import styles from "../Styles/header.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Log the user out
    setIsAuthenticated(false);
    // Redirect to login page after logout
    navigate("/login"); 
  };

  const navigateToHome = () => {
    navigate("/home");
  };
  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.appname}>
        <img
          onClick={navigateToHome}
          className={styles.appicon}
          src="/Images/image 65.png"
          alt="App Icon"
        />
        <p onClick={navigateToHome}>Flavor Finder</p>
      </div>
      <div className={styles.others}>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/recipe">Recipes</Link>
        <Link to="/myrecipes">My Recipes</Link>
      </div>
      {/* Conditionally render login or logout button */}
      {isAuthenticated ? (
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      ) : (
        <CgProfile className={styles.profileicon} onClick={navigateToLogin} />
      )}
    </div>
  );
};

export default Header;
