import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const LastRecipes = () => {
  // State pour stocker les recettes
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Appel à l'API pour récupérer les recettes
    axios.get("http://localhost:9001/recipes").then((res) => {
      // Inversion de l'ordre des recettes et sélection des 3 dernières
      let data = res.data.reverse();
      data = data.slice(0, 3);
      // Mise à jour du state avec les recettes récupérées
      setRecipes(data);
    });
  }, []);

  return (
    <article className="last-recipe">
      {/* Affichage des recettes */}
      {recipes.map((oneRecipe, i) => (
        // Utilisation de fragment pour éviter d'ajouter un élément HTML supplémentaire
        <React.Fragment key={i}>
          <aside  className="lastRecipe-aside">
            <NavLink to={`/recette/${oneRecipe._id}`}>
              <img
                src={`http://localhost:9001/assets/img/${oneRecipe.image.src}`}
                alt={oneRecipe.image.alt}
                className="image-item"
              />
              <h3 className="title-recipe">
                <span className="title-last-recipe">{oneRecipe.title}</span>
              </h3>
            </NavLink>
          </aside>
        </React.Fragment>
      ))}
    </article>
  );
};

export default LastRecipes;
