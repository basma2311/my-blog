import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import Video from "../conponents/Video";
import { FaWheatAwn } from "react-icons/fa6";


const HealthyPage = () => {
  const [healthyRecipes, setHealthyRecipes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9001/recipes/healthy").then((res) => {
      let data = res.data.reverse();
      data = data.slice(0, 6);
      setHealthyRecipes(data);
    });
  }, []);

  return (
    <main className="container-healthy">
        <h1 className="title-h1-healthy-page">Explorez des recettes saines et faites maison
         pour entretenir votre santé sur Home Made <FaWheatAwn style={{fontSize:"3rem", color:"darkgreen", opacity:"0.9"  }} /></h1>
      <article className="last-recipe-healthy-page">
        {healthyRecipes.map((oneHealthy, i) => (
          <aside key={i}>
            <NavLink to={`/recette/${oneHealthy._id}`}>
              <img
                className="img-healthy-page"
                style={{
                  borderRadius: "0.5rem",
                }}
                src={`http://localhost:9001/assets/img/${oneHealthy.image.src}`}
                alt={oneHealthy.image.alt}
              />
              <h3 className="title-healthy">
                <span className="title-healthy-span">{oneHealthy.title}</span>
              </h3>
              <aside className="healthyPage">
                <span className="healthy-span">{oneHealthy.description}</span>
                <span className="healthy-span">{oneHealthy.difficulty}</span>
                <span className="healthy-span">
                  <IoTimeOutline /> {oneHealthy.time}minutes
                </span>
              </aside>
            </NavLink>
          </aside>
        ))}
      </article>
      <section>
        <article className="intro-healthy">
          <h2 className="h2-intro-healthy">  Prioriser une alimentation saine est essentiel pour maintenir sa
              santé en favorisant les aliments frais et en évitant les produits
              transformés.</h2>
          <Video />
            <h2 className="h2-intro-healthy">
              Ces choix alimentaires maintiennent l'énergie, renforcent le
              système immunitaire et contribuent au bien-être général, un
              investissement pour une santé durable!
            </h2>
        
        </article>
      </section>
    </main>
  );
};

export default HealthyPage;
