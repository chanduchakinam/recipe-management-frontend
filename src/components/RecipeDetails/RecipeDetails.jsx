import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "../../api/api";
import "./RecipeDetails.css"; // Importing the CSS file

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getRecipeById(id);
      setRecipe(data);
    }
    fetchData();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-details">
      <h2>{recipe.title}</h2>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>

      <div className="button-container">
        <button onClick={() => navigate("/")}>Back</button>
        <button onClick={() => navigate(`/update-recipe/${id}`)}>Update</button>
      </div>
    </div>
  );
}

export default RecipeDetails;
