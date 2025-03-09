import axios from "axios";

const API_URL = "http://localhost:5000/api/recipes" // Change this if deployed

export const getRecipes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createRecipe = async (recipe) => {
  console.log("📤 Sending POST request:", recipe); // ✅ Log recipe data
  const response = await axios.post(API_URL, recipe);
  console.log("✅ Recipe Saved:", response.data); // ✅ Log saved recipe
  return response.data;
}

export const updateRecipe = async (id, recipe) => {
  const response = await axios.put(`${API_URL}/${id}`, recipe);
  return response.data;
};

export const updateRecipeOrder = async (newOrder) => {
  const response = await axios.put(`${API_URL}/order`, newOrder);
  return response.data;
}