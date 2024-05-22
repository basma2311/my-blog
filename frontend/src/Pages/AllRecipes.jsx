import { NavLink} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { GiNetworkBars } from "react-icons/gi";


const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  

  useEffect(() => {
    axios.get("http://localhost:9001/recipes").then((res) => {
      let data = res.data.reverse();
      // data = data.slice(0, 5);
      setRecipes(data);
    });
  }, []);


  return (
    <main>
      {recipes.map((recipe, i) => (
        <>
          <article key={i} className="All-recipes-article">
          
            <NavLink to={`/recette/${recipe._id}`}>
            <h3 className="title-All-Recipes-page">
                <span>{recipe.title}</span>
              </h3>
              </NavLink>
            
              <h4 className="description-all-recipes">{recipe.description}</h4>
              <h4 className="h4-difficulty-all-recipes"><GiNetworkBars className="difficulty-icon-allRecipe" /> Difficulté :{" "}
              <span className="difficulty-all-recipes">{recipe.difficulty}</span></h4>
            
              <img
              src={`http://localhost:9001/assets/img/${recipe.image.src}`}
              alt={recipe.image.alt}
              className="img-AllRecipes-page"
            />
             
          </article>
        
        </>
      ))}
  

    </main>
  );
};

export default AllRecipes;