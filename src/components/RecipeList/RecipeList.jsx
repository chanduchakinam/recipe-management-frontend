import { useEffect, useState } from "react";
import { getRecipes, updateRecipeOrder } from "../../api/api"; // Import API function
import { Link } from "react-router-dom";
import DragAndDropList from "../DragAndDropList/DragAndDropList";
import "./RecipeList.css"; // Import CSS

function RecipeList(props) {
  const [recipes, setRecipes] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);
  const { toggle } = props;

  useEffect(() => {
    async function fetchData() {
      const data = await getRecipes();
      setRecipes(data);
    }
    fetchData();
  }, [toggle]);

  // Function to fetch and set a random recipe
  const fetchRandomRecipe = () => {
    if (recipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * recipes.length);
      setRandomRecipe(recipes[randomIndex]);
    }
  };

  // Function to update order in backend
  const updateOrderOnServer = async (newOrder) => {
    try {
      await updateRecipeOrder(newOrder); // Send updated order to backend
      console.log("Updated order saved successfully!");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="recipe-list">
      <h2>Recipe List</h2>
      <button className="surprise-btn" onClick={fetchRandomRecipe}>Surprise Me!</button>

      {randomRecipe && (
        <div className="random-recipe">
          <h3>{randomRecipe.title}</h3>
          <p><strong>Ingredients:</strong> {randomRecipe.ingredients}</p>
          <p><strong>Instructions:</strong> {randomRecipe.instructions}</p>
          <Link to={`/recipe/${randomRecipe._id}`} className="view-recipe">View Recipe</Link>
        </div>
      )}

      {/* Updated to use DragAndDropList with updateOrderOnServer */}
      <DragAndDropList items={recipes} setItems={setRecipes} updateOrderOnServer={updateOrderOnServer} />
    </div>
  );
}

export default RecipeList;
