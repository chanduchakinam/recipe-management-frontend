import axios from "axios";

const API_URL = "https://recipe-management-app-xdja.onrender.com"; // Change this if deployed

export const getRecipes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createRecipe = async (recipe) => {
  const response = await axios.post(API_URL, recipe);
  return response.data;
};

export const updateRecipe = async (id, recipe) => {
  const response = await axios.put(`${API_URL}/${id}`, recipe);
  return response.data;
};

export const updateRecipeOrder = async (newOrder) => {
  const response = await axios.put(`${API_URL}/order`, newOrder);
  return response.data;
}