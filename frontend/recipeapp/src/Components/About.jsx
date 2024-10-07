import React from "react";
import styles from "../Styles/aboutus.module.css";
import { FiBookOpen } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { PiForkKnifeFill } from "react-icons/pi";
import { HiUsers } from "react-icons/hi2";

export default function AboutUs() {
  return (
    <div className={styles.aboutUsContainer}>
      <header className={styles.header}>
        <img
          src="/Images/oplogo.jpeg"
          alt="Flavor Finder Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>Flavor Finder</h1>
      </header>

      <section className={styles.intro}>
        <p>
          Welcome to Flavor Finder! At Flavor Finder, we believe that every meal
          is an opportunity to create something extraordinary. Our mission is to
          bring joy, creativity, and deliciousness to your kitchen by making it
          easy for you to discover, share, and enjoy amazing recipes from around
          the world.
        </p>
      </section>

      <section className={styles.founder}>
        <h2 className={styles.subtitle}>Who We Are?</h2>
        <div className={styles.founderContent}>
          <img
            src="/Images/Atul Adhikari.jpeg"
            alt="Atul Adhikari"
            className={styles.founderImage}
          />
          <p>
            My name is Atul Adhikari, the creator and driving force behind
            Flavor Finder. With a passion for cooking and a love for exploring
            diverse cuisines, I set out to build a platform where food
            enthusiasts of all levels can find inspiration, learn new
            techniques, and connect with a community of like-minded culinary
            adventurers.
          </p>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.subtitle}>What We Offer</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureItem}>
            <PiForkKnifeFill size={30} />
            <h3>Diverse Recipes</h3>
            <p>
              From quick weeknight dinners to elaborate gourmet meals, our
              extensive collection of recipes caters to all tastes and dietary
              preferences.
            </p>
          </div>
          <div className={styles.featureItem}>
            <FiBookOpen size={30} />
            <h3>User-Friendly Interface</h3>
            <p>
              Our app is designed with you in mind. With easy navigation, clear
              instructions, and helpful tips, Flavor Finder makes cooking a
              breeze, even for the most complex dishes.
            </p>
          </div>
          <div className={styles.featureItem}>
            <HiUsers size={30} />
            <h3>Community Connection</h3>
            <p>
              Share your culinary creations, exchange tips, and connect with
              fellow food lovers. Our vibrant community is here to support and
              inspire you on your cooking journey.
            </p>
          </div>
          <div className={styles.featureItem}>
            <FaRegStar size={30} />
            <h3>Personalized Recommendations</h3>
            <p>
              Discover new recipes tailored to your tastes and preferences. Our
              smart algorithm learns what you love and suggests dishes that are
              perfect for you.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.vision}>
        <h2 className={styles.subtitle}>Our Vision</h2>
        <p>
          Flavor Finder aims to become your go-to resource for all things food.
          We envision a world where cooking is fun, accessible, and a source of
          joy for everyone. By fostering a supportive and creative community, we
          hope to inspire you to explore new flavors, experiment with
          ingredients, and create meals that bring happiness to your table.
        </p>
        <p>
          Join us on this delicious adventure and let Flavor Finder be your
          trusted companion in the kitchen. Together, let's make every meal a
          flavorful masterpiece!
        </p>
      </section>

      <footer className={styles.footer}>
        <div>
          <p>Happy Cooking!!</p>
          <p>Atul Adhikari</p>
          <p>Founder & Food Enthusiast</p>
          <p>Flavor Finder</p>
        </div>
        <div>
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
      </footer>
    </div>
  );
}
