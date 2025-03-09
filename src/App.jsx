import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";
import UpdateRecipe from "./components/updateRecipe/UpdateRecipe";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/update-recipe/:id" element={<UpdateRecipe />} /> 
      </Routes>
    </Router>
  );
}

export default App;
