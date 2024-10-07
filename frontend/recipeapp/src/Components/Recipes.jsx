import React, { useState, useEffect } from "react";
import styles from "../Styles/recipelist.module.css";
import AddRecipeForm from "../Components/AddRecipeForm";
import { FaRegHeart } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { IoIosShareAlt } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [expandedState, setExpandedState] = useState({});
  const [showAddRecipeForm, setShowAddRecipeForm] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [editMode, setEditMode] = useState(null); // Track current recipe being edited
  const [editRecipeData, setEditRecipeData] = useState({}); // Store the edited recipe data

  // Get the logged-in user's username from localStorage
  const loggedInUser = localStorage.getItem("loggedInUser");

  useEffect(() => {
    if (loggedInUser) {
      const savedRecipes =
        JSON.parse(localStorage.getItem(`recipes_${loggedInUser}`)) || [];
      setRecipes(savedRecipes);

      const savedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(savedFavorites);
    }
  }, [loggedInUser]);

  const handleToggleIngredients = (id) => {
    setExpandedState((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        showIngredients: !prevState[id]?.showIngredients,
        showInstructions: false,
      },
    }));
  };

  const handleToggleInstructions = (id) => {
    setExpandedState((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        showInstructions: !prevState[id]?.showInstructions,
        showIngredients: false,
      },
    }));
  };

  const handleHideAll = () => {
    setExpandedState({});
  };

  const handleRecipeAdded = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);

    localStorage.setItem(
      `recipes_${loggedInUser}`,
      JSON.stringify(updatedRecipes)
    );

    setShowAddRecipeForm(false);
  };

  const toggleShowFavoritesOnly = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  const displayedRecipes = showFavoritesOnly
    ? recipes.filter((recipe) => favorites.includes(recipe.id))
    : recipes;

  const handleToggleFavorite = (recipe) => {
    const recipeId = recipe.id;
    let updatedFavorites;

    if (favorites.includes(recipeId)) {
      updatedFavorites = favorites.filter((fav) => fav !== recipeId);
    } else {
      updatedFavorites = [...favorites, recipeId];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleShare = (recipe) => {
    if (navigator.share) {
      navigator
        .share({
          title: recipe.title,
          text: `Check out this amazing recipe: ${recipe.title}`,
          url: recipe.url,
        })
        .then(() => console.log("Recipe shared successfully"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      alert("Share feature is not supported on this browser.");
    }
  };

  // Edit Recipe Functionality
  const handleEditRecipe = (recipe) => {
    setEditMode(recipe.id); // Enter edit mode for the selected recipe
    setEditRecipeData(recipe); // Pre-fill the form with the recipe data
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditRecipeData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = () => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === editMode ? editRecipeData : recipe
    );
    setRecipes(updatedRecipes);

    localStorage.setItem(
      `recipes_${loggedInUser}`,
      JSON.stringify(updatedRecipes)
    );

    setEditMode(null); // Exit edit mode
  };

  const handleDeleteRecipe = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
      setRecipes(updatedRecipes);

      localStorage.setItem(
        `recipes_${loggedInUser}`,
        JSON.stringify(updatedRecipes)
      );
    }
  };

  return (
    <>
      <h1>{loggedInUser}'s Recipes</h1>
      <button
        className={styles.addrecipe}
        onClick={() => setShowAddRecipeForm(!showAddRecipeForm)}
      >
        {showAddRecipeForm ? "Cancel" : "Add Recipe"}
      </button>

      <div className={styles.favoritesbutton}>
        <button
          className={styles.toggleFavorites}
          onClick={toggleShowFavoritesOnly}
        >
          {showFavoritesOnly ? "Show All Recipes" : "Show Favorites Only"}
        </button>
      </div>

      {showAddRecipeForm && <AddRecipeForm onRecipeAdded={handleRecipeAdded} />}

      <div className={styles.recipelistcontainer}>
        {showFavoritesOnly && displayedRecipes.length === 0 && (
          <p>No favorites found! Add some to your favorites.</p>
        )}

        {displayedRecipes.map((recipe) => (
          <div className={styles.recipecard} key={recipe.id}>
            <div className={styles.favorites}>
              <span onClick={() => handleToggleFavorite(recipe)}>
                {favorites.includes(recipe.id) ? (
                  <GoHeartFill />
                ) : (
                  <FaRegHeart />
                )}
              </span>

              <IoIosShareAlt
                size={20}
                className={styles.shareicon}
                onClick={() => handleShare(recipe)}
              />

              <AiOutlineEdit
                size={20}
                className={styles.editicon}
                onClick={() => handleEditRecipe(recipe)}
              />
              <MdDelete
                size={20}
                className={styles.deleteicon}
                onClick={() => handleDeleteRecipe(recipe.id)}
              />
            </div>

            {editMode === recipe.id ? (
              <div className={styles.editform}>
                <h2>Edit Recipe</h2>
                <input
                  type="text"
                  name="title"
                  value={editRecipeData.title}
                  onChange={handleEditChange}
                  placeholder="Recipe Title"
                />
                <textarea
                  name="ingredients"
                  value={editRecipeData.ingredients}
                  onChange={handleEditChange}
                  placeholder="Ingredients"
                />
                <textarea
                  name="instructions"
                  value={editRecipeData.instructions}
                  onChange={handleEditChange}
                  placeholder="Instructions"
                />

                <label htmlFor="image">Change Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <img
                  src={editRecipeData.image}
                  className={styles.previewimage}
                  alt="Preview"
                />
                <button className={styles.savebutton} onClick={handleSaveEdit}>
                  Save Changes
                </button>
              </div>
            ) : (
              <div className={styles.content}>
                <img
                  src={recipe.image}
                  className={styles.foodimage}
                  alt={recipe.title}
                />
                <h2 className={styles.foodname}>{recipe.title}</h2>
                {expandedState[recipe.id]?.showIngredients && (
                  <div className={styles.ingredients}>
                    <button
                      className={styles.closeButton}
                      onClick={handleHideAll}
                    >
                      &times;
                    </button>
                    <h3>Ingredients</h3>
                    <ul>
                      {recipe.ingredients.split(",").map((ingredient, i) => (
                        <li key={i}>{ingredient.trim()}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {expandedState[recipe.id]?.showInstructions && (
                  <div className={styles.instructions}>
                    <button
                      className={styles.closeButton}
                      onClick={handleHideAll}
                    >
                      &times;
                    </button>
                    <h3>Instructions</h3>
                    <p>{recipe.instructions}</p>
                  </div>
                )}
                {!expandedState[recipe.id]?.showIngredients &&
                  !expandedState[recipe.id]?.showInstructions && (
                    <div className={styles.buttoncontainer}>
                      <button
                        className={styles.recipebutton}
                        onClick={() => handleToggleIngredients(recipe.id)}
                      >
                        Show Ingredients
                      </button>
                      <button
                        className={styles.recipebutton}
                        onClick={() => handleToggleInstructions(recipe.id)}
                      >
                        Show Instructions
                      </button>
                    </div>
                  )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Recipes;
