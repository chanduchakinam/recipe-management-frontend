import { useState } from "react";
import { createRecipe } from "../../api/api";
import './RecipeForm.css';

function RecipeForm(props) {
  const [title, setTitle] = useState("");
  const {toggle, setToggle} = props
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = { title, ingredients: ingredients.split("\n"), instructions, order: 0 };
    console.log("📤 Sending POST request:", newRecipe); // ✅ Log recipe data
    try {
      const response = await createRecipe(newRecipe);
      console.log("✅ Recipe Saved:", response); // ✅ Log saved recipe
      setTitle("");
      setIngredients("");
      setInstructions("");
      setToggle(!toggle);
    } catch (error) {
      console.error("❌ Error creating recipe:", error); // ✅ Log error details
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Ingredients" 
        value={ingredients} 
        onChange={(e) => setIngredients(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Instructions" 
        value={instructions} 
        onChange={(e) => setInstructions(e.target.value)} 
        required 
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default RecipeForm;
