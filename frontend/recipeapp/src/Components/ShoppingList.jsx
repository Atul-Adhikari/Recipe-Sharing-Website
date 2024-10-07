import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Styles/shoppinglist.module.css";

const ShoppingList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { shoppingList } = location.state || { shoppingList: [] };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className={styles.shoppinglistcontainer}>
      <button className={styles.backButton} onClick={handleBack}>
        Back
      </button>
      <h1>Shopping List</h1>
      {shoppingList.length === 0 ? (
        <p>Your shopping list is empty.</p>
      ) : (
        <ul>
          {shoppingList.map((item, index) => (
            <li key={index}>
              <h2>{item.title}</h2>
              <ul>
                {item.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingList;
