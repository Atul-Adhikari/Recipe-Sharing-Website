import React, { useState } from "react";
import axios from "axios";
import styles from "../Styles/addrecipeform.module.css";

const AddRecipeForm = ({ onRecipeAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/recipes/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onRecipeAdded(response.data);
      // Reset the form fields after successful submission
      setTitle("");
      setDescription("");
      setIngredients("");
      setInstructions("");
      setImage(null);
    } catch (error) {
      console.error(
        "There was an error adding the recipe!",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.recipeform}>
        <div className="form-group">
          <label htmlFor="title" className={styles.formlabel}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            className={styles.forminput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="formgroup">
          <label htmlFor="description" className={styles.formlabel}>
            Description:
          </label>
          <textarea
            id="description"
            className={styles.formtextarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="ingredients" className={styles.formlabel}>
            Ingredients (comma-separated):
          </label>
          <textarea
            id="ingredients"
            className={styles.formtextarea}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="instructions" className={styles.formlabel}>
            Instructions:
          </label>
          <textarea
            id="instructions"
            className={styles.formtextarea}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="image" className={styles.formlabel}>
            Image:
          </label>
          <input
            type="file"
            id="image"
            className={styles.formfile}
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button type="submit" className={styles.formbutton}>
          Add Recipe
        </button>
      </form>
    </>
  );
};

export default AddRecipeForm;
