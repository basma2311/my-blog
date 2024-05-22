
import { NavLink } from "react-router-dom";
import { BiSolidAddToQueue } from "react-icons/bi";
import RecipesAdmin from "../conponents/RecipesAdmin";

const Grecipe = () => {
  return (
    <main >
      <section className="section-manager-recipe">
       <h1 className="title-manage">Gérer les recettes</h1>
        <article className="add-recipe-title">
        <NavLink to={"/ajouter-recette"} className='add-link'>
          <h2 className="h2-add">Ajouter une recette</h2>
          <BiSolidAddToQueue  className="addIcon"/>
          </NavLink>
        </article>
        <article className="update-recipe-title">
        <h2 className="h2-update">Modifier/Supprimer </h2>
        <RecipesAdmin />
        </article>
      </section>
    </main>
  );
};

export default Grecipe;
