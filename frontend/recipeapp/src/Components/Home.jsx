import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import styles from "../Styles/home.module.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const navigateToRecipes = () => {
    navigate("/recipe");
  };
  return (
    <div className={styles.outer}>
      <div className={styles.home}>
        <img
          className={styles.image1}
          src="/Images/foods.png"
          alt="No image found"
        />
        <div className={styles.card}>
          <p className={styles.paragraph}>
            Welcome to Flavor Finder! Explore a world of mouthwatering, healthy
            recipes that cater to your unique nutritional needs. Whether you're
            looking for quick weeknight dinners or gourmet meals, our app
            provides easy-to-follow recipes that will delight your taste buds
            and nourish your body. Cook with confidence, enjoy delicious
            flavors, and make every meal a satisfying experience.
          </p>
          <button className={styles.explorebutton} onClick={navigateToRecipes}>
            Explore more <span>&#8594;</span>
          </button>
        </div>
      </div>
      <div className={styles.footer}>
        <a
          href="https://www.facebook.com/atul.adhikari.9619"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://www.instagram.com/atuladhikari4/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/atul-adhikari-833945285/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
};

export default Home;
