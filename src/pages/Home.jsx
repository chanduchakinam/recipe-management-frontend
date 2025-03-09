import RecipeList from "../components/RecipeList/RecipeList"; 
import RecipeForm from "../components/RecipeForm/RecipeForm"; 
import { useState } from "react";

function Home() {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <h1>Recipe Management</h1>
      <RecipeForm toggle={toggle} setToggle={setToggle} />
      <RecipeList toggle={toggle} setToggle={setToggle} />
    </div>
  );
}

export default Home;
