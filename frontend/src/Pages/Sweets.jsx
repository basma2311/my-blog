// Dessert.js
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaRegHandPointRight } from "react-icons/fa";


const Sweets = () => {
  const [dessertRecipes, setDessertRecipes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9001/recipes/category/Dessert").then((res) => {
      let data = res.data.reverse();
      setDessertRecipes(data);
    });
  }, []);

  return (
    <section className="sweets-page">
    <article className="recipe-category">
      {dessertRecipes.map((recipe, i) => (
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
            <h5><FaRegHandPointRight /> Voir la recette</h5>
            </NavLink>  
        </aside>
        
      ))}
    </article>
    </section>
  );
};

export default Sweets ;
