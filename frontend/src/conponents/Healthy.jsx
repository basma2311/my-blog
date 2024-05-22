import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Healthy = () => {
  const [healthyRecipes, setHealthyRecipes] = useState([]);
//Récupérer les recettes saine
  useEffect(() => {
    axios.get("http://localhost:9001/recipes/healthy").then((res) => {
      let data = res.data.reverse();
      data = data.slice(0, 3);
      setHealthyRecipes(data);
    });
  }, []);

  return (
    <article className="last-recipe-healthy">
      {healthyRecipes.map((oneHealthy, i) => (
        <aside key={i} className="aside-compo-healthy">
          <NavLink to={`/recette/${oneHealthy._id}`}>
            <img
              style={{ width: "100%", height:"430px", borderRadius: '0.5rem' }}
              src={`http://localhost:9001/assets/img/${oneHealthy.image.src}`}
              alt={oneHealthy.image.alt}
              className="img-component-healthy"
            />
            <h3 className="title-h">
              <span>{oneHealthy.title}</span>
            </h3>
          </NavLink>
             
        </aside>
      ))}
    </article>
  );
};

export default Healthy