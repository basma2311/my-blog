import LastRecipes from "../conponents/LastRecipes";
import { motion } from "framer-motion";
import images from "../conponents/images";
import { useRef, useEffect, useState } from "react";
import Healthy from "../conponents/Healthy";
import { NavLink } from "react-router-dom";
import { GiReturnArrow } from "react-icons/gi";

const Home = () => {
  // Utilisation de useRef pour créer une référence au carousel
  const carouselRef = useRef();
  // Utilisation de useState pour gérer la largeur du carousel
  const [width, setWidth] = useState(0);
  // Utilisation de useEffect pour mettre à jour la largeur du carousel lorsque le composant est monté
  useEffect(() => {
  // Calcul de la largeur du carousel en soustrayant la largeur visible du carousel à sa largeur totale
    setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
  }, []); // Le tableau de dépendances vide indique que ce code ne s'exécute qu'une seule fois après le montage initial du composant

  return (
    <main className="container">
      <section className="first-section">
        <h2 className="divider lastRecipe">
          <span>DERNIÈRES RECETTES</span>
        </h2>
       {/* Composant LastRecipes pour afficher les dernières recettes */}
        <LastRecipes />

        <article className="choice">
          <aside>
            <h2>
              Jetez un œil et découvrez nos recettes!
            </h2>
            {/* Carousel des images */}
            <motion.aside className="carousel" ref={carouselRef}>
              <motion.aside
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className="inner-carousel"
              >
            {/* Boucle à travers les images pour les afficher dans le carousel */}
                {images.map((image) => (
                  <motion.aside className="item" key={image}>
                    <img src={image} alt="carousel-image" />
                  </motion.aside>
                ))}
              </motion.aside>
            </motion.aside>
          </aside>
           {/* Lien vers toutes les recettes */}
          <NavLink to={"/toute-recettes"} className="container-text-link">
            <span className="linkAllRecipes-text">
              Cliquez ici pour consulter toutes les recettes{" "}
              <GiReturnArrow className="blinking-icon" />
            </span>
          </NavLink>
        </article>
      </section>
         {/* Section pour les recettes healthy */}
      <section className="second-section">
        <article>
          <h2 className="divider">
        {/* Composant Healthy pour afficher les recettes healthy */}
            <span>RECETTE HEALTHY</span>
          </h2>
          <Healthy />
        </article>
      </section>
    </main>
  );
};

export default Home;
