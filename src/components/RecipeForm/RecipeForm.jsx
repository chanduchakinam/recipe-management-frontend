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
    await createRecipe({ title, ingredients, instructions });
    setTitle("");
    setIngredients("");
    setInstructions("");
    alert("Recipe added successfully!");
    setToggle(!toggle);
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
