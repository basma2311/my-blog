import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegHandPointRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const HealthyRecipes = () => {
 const [healthyRecipes, setHealthyRecipes]= useState([])

 useEffect(() => {

  axios.get("http://localhost:9001/recipes/healthy-Starter-dish").then((res) => {
    let data = res.data.reverse();
    data = data.slice(0, 6);
    setHealthyRecipes(data);
  });
}, []);
  return (
    <main>
      <article className="recipe-category">
        {healthyRecipes.map((recipe, i) => (
          <aside key={i}>
            <NavLink to={`/recette/${recipe._id}`}>
              <img
                src={`http://localhost:9001/assets/img/${recipe.image.src}`}
                alt={recipe.image.alt}
                className="img-sweets-page"
              />
              <h3 className="title">
                <span>{recipe.title}</span>
              </h3>

              <h6 className="description">
                <span>{recipe.description}</span>
              </h6>
              <h5>
                <FaRegHandPointRight /> Voir la recette
              </h5>
            </NavLink>
          </aside>
        ))}
      </article>
    </main>
  );
};

export default HealthyRecipes;
