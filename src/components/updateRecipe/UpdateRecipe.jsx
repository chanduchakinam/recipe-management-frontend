import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById, updateRecipe } from "../../api/api";
import "./UpdateRecipe.css"; // Import CSS

function UpdateRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    isMounted.current = true;

    async function fetchRecipe() {
      try {
        const data = await getRecipeById(id);
        if (isMounted.current && data) {
          setFormData({
            title: data.title || "",
            ingredients: data.ingredients || "",
            instructions: data.instructions || "",
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to load recipe.");
        setLoading(false);
      }
    }

    fetchRecipe();

    return () => {
      isMounted.current = false;
    };
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRecipe(id, formData);
      alert("Recipe updated successfully!");
      navigate(`/recipe/${id}`, { replace: true });
    } catch (error) {
      console.error("Error updating recipe:", error);
      setError("Failed to update recipe.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="update-recipe">
      <h2>Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Ingredients:</label>
        <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} required />

        <label>Instructions:</label>
        <textarea name="instructions" value={formData.instructions} onChange={handleChange} required />

        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate(-1)}>Back</button>
      </form>
    </div>
  );
}

export default UpdateRecipe;
