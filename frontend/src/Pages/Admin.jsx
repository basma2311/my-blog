import { NavLink } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";



const Admin = () => {
  return (
    <main className="container">
      <section className="Admin-space">
        <article className="admin-space">
          <h1>Espace Admin<RiAdminLine  className="admin-icon"/></h1>
          </article>
       <ul className="manage-ul">
      <NavLink to={"/gestion-recette"} ><li><button className="manag-recipe-button">Gestion des recettes</button></li></NavLink>  
        <li><button className="manag-users-button">Gestion des utilisateurs</button></li>
       </ul>
      </section>
    </main>
  );
};

export default Admin;