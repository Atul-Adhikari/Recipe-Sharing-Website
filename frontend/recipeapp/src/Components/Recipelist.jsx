import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/recipelist.module.css";
import { fetchData } from "./Service";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { IoIosShareAlt } from "react-icons/io";

const Recipelist = ({
  query,
  setQuery,
  data,
  setData,
  searchedTerm,
  setSearchedTerm,
  searchrecipe,
}) => {
  const [showIngredientsIndex, setShowIngredientsIndex] = useState(null);
  const [showInstructionsIndex, setShowInstructionsIndex] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData(query).then((response) => {
      setData(response);
      console.log(response);
    });
  }, [query]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleToggleIngredients = (index) => {
    setShowIngredientsIndex(showIngredientsIndex === index ? null : index);
  };

  const handleToggleInstructions = (index) => {
    setShowInstructionsIndex(showInstructionsIndex === index ? null : index);
  };

  const handleHideIngredients = () => {
    setShowIngredientsIndex(null);
  };

  const handleToggleFavorite = (recipe) => {
    const recipeUri = recipe.uri;
    let updatedFavorites;

    if (favorites.includes(recipeUri)) {
      updatedFavorites = favorites.filter((fav) => fav !== recipeUri);
    } else {
      updatedFavorites = [...favorites, recipeUri];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleShare = (recipe) => {
    if (navigator.share) {
      navigator
        .share({
          title: recipe.label,
          text: `Check out this amazing recipe: ${recipe.label}`,
          url: recipe.url,
        })
        .then(() => console.log("Recipe shared successfully"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      alert("Share feature is not supported on this browser.");
    }
  };

  const handleAddToShoppingList = (recipe) => {
    alert(recipe.label + " added successfully to shopping list.");
    setShoppingList((prev) => {
      const existingItem = prev.find((item) => item.uri === recipe.uri);
      if (existingItem) {
        return prev.filter((item) => item.uri !== recipe.uri); // Remove if already exists
      } else {
        return [
          ...prev,
          {
            uri: recipe.uri,
            title: recipe.label,
            ingredients: recipe.ingredientLines,
          },
        ];
      }
    });
  };

  const toggleShowFavoritesOnly = () => {
    setFavoritesOnly(!favoritesOnly);
  };

  const navigateToShoppingList = () => {
    navigate("/shoppinglist", { state: { shoppingList } });
  };

  const displayedData = favoritesOnly
    ? data.hits.filter((item) => favorites.includes(item.recipe.uri))
    : data.hits;

  return (
    <div className={styles.recipelistcontainer}>
      <div className={styles.upperpart}>
        <div className={styles.searcharea}>
          <input
            className={styles.inputbox}
            type="text"
            placeholder="Search your recipe here..."
            onChange={(e) => setSearchedTerm(e.target.value)}
            value={searchedTerm}
          />
          <img
            className={styles.searchimage}
            src="https://raw.githubusercontent.com/ayushkul/react-recipe-finder/3e782083c58c0d3f6993dedeaab401b303353a00/public/search-icon.svg"
            alt="Search Icon"
            onClick={() => searchrecipe(searchedTerm)}
          />
        </div>

        <div className={styles.favoritesbutton}>
          <button
            className={styles.toggleFavorites}
            onClick={toggleShowFavoritesOnly}
          >
            {favoritesOnly ? "Show All Recipes" : "Show Favorites Only"}
          </button>
          <button
            className={styles.showShoppingListButton}
            onClick={navigateToShoppingList}
          >
            Show Shopping List
          </button>
        </div>
      </div>

      {/* Display a message if no favorites are available */}
      {favoritesOnly && displayedData.length === 0 && (
        <div className={styles.noFavoritesMessage}>
          <h3>You have no favorite recipes yet!</h3>
          <p>Add some recipes to your favorites to see them here.</p>
        </div>
      )}

      {/* Render recipe cards */}
      {displayedData &&
        displayedData.map((item, index) => (
          <div className={styles.recipecard} key={index}>
            <div className={styles.favorites}>
              <span onClick={() => handleToggleFavorite(item.recipe)}>
                {favorites.includes(item.recipe.uri) ? (
                  <GoHeartFill />
                ) : (
                  <FaRegHeart />
                )}
              </span>

              <IoIosShareAlt
                size={20}
                className={styles.shareicon}
                onClick={() => handleShare(item.recipe)}
              />

              <FaShoppingCart
                size={18}
                className={styles.shoppingCartIcon}
                onClick={() => handleAddToShoppingList(item.recipe)}
              />
            </div>
            <div className={styles.content}>
              <img
                src={item.recipe.image}
                className={styles.foodimage}
                alt={item.recipe.label}
              />
              <h2 className={styles.foodname}>{item.recipe.label}</h2>
              {showIngredientsIndex === index ? (
                <div className={styles.ingredients}>
                  <button
                    className={styles.closeButton}
                    onClick={handleHideIngredients}
                  >
                    &times;
                  </button>
                  <h3>Ingredients</h3>
                  <ul>
                    {item.recipe.ingredientLines.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className={styles.buttoncontainer}>
                  <button
                    className={styles.recipebutton}
                    onClick={() => handleToggleIngredients(index)}
                  >
                    Show Ingredients
                  </button>
                  <button
                    className={styles.recipebutton}
                    onClick={() => handleToggleInstructions(index)}
                  >
                    {showInstructionsIndex === index
                      ? "Hide Instructions"
                      : "Complete Recipe"}
                  </button>
                </div>
              )}

              {showInstructionsIndex === index && (
                <div className={styles.instructions}>
                  <h3>Instructions</h3>
                  {item.recipe.instructions ? (
                    <ul>
                      {item.recipe.instructions.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>
                      Full instructions can be found{" "}
                      <a
                        href={item.recipe.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        here
                      </a>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Recipelist;
