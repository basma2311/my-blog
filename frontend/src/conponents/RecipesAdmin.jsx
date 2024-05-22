/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "../Pages/App.css"
import axios from "axios";
import { NavLink } from "react-router-dom";
import { token } from "../context/Token";
import { HiPencilSquare } from "react-icons/hi2";
import { RiDeleteBin4Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { BiLogIn } from "react-icons/bi";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



// Composant ConfirmBox : boîte de confirmation avec un message et des boutons de confirmation et d'annulation
const ConfirmBox = ({message,onConfirm,onCancel}) => {
  return (
    <section style={{
      position:"fixed",
      top:"0",
      left:"0",
      right:"0",
      bottom:"0",
      backgroundColor:"rgba(0,0,0,0.01)",
      zIndex:"2"
    }} className="confirmBox-section">
      <article style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        position:"absolute",
        top:"40%",
        left:"-50%",
        transform: "translate(100%,30%)",
        backgroundColor:"white",
        padding: "1rem",
        ...(window.innerWidth > 769 && {  
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        })
      }} className="confirm-box">
        <h3 style={{color:"#111"}}>{message}</h3>
         <aside style={{
           display:"flex",
           alignItems:"center",
           color:"white",
         }}>
          <button onClick={onConfirm} style={{background:"green", padding:"0.5rem",marginRight:"4px", cursor:"pointer"}}>Confirmer</button>
          <button onClick={onCancel}  style={{background:"red",padding:"0.5rem", marginLeft:"4px", cursor:"pointer"}}>Annuler</button>
         </aside>
      </article>  
    </section>
  );
};

// Composant GetAllRecipes : récupère et affiche toutes les recettes avec la possibilité de les supprimer
const RecipesAdmin = () => {
  const [recipes, setRecipes] = useState([]);
  const [err, setErr] = useState("");
  const [showModal, setShowModal]= useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  
  //récupérer toutes les recettes
  useEffect(() => {
    axios
      .get("http://localhost:9001/recipes", { headers: token() })
      .then((res) => {
        let data = res.data.reverse();
        setRecipes(data);
      })
      .catch((res) => {
        setErr(res.data);
      });

  }, [showModal]);

    //Afficher la boîte de confirmation et stocker l'identifiant de la recette sélectionnée
  const handleClick= (e,recipeId) => {
  setSelectedRecipe(recipeId);
      setShowModal(true);
  }
  //confirmer la suppression de la recette sélectionnée
  const handleConfirm= () => {
    axios.delete(`http://localhost:9001/recipes/${selectedRecipe}`, { headers: token() })
     .then((res) => {
      //Afficher le message de succès
      toast.success("Recette supprimée avec succès!");
      // Masquer la boîte de confirmation après la confirmation de suppression
    setShowModal(false);
     })
    .catch(error => {
      // Gérer les erreurs de suppression de recette
      toast.error("Erreur lors de la suppression de la recette!");
      // Masquer la boîte de confirmation après la confirmation de suppression
      setShowModal(false);
    });
}
  
  
  //Annuler la suppression
  const handleCancel= () => {
    setShowModal(false);
  }
  

  return (
    <main className="container">
      <section className="getAll">
        {recipes.map((oneRecipe) => (
          <React.Fragment key={oneRecipe._id} >
            <article  className="oneRecipeUpdate">
              <aside>
                <NavLink to={`/recette/${oneRecipe._id}`} className="recipe-title">
                  {oneRecipe.title}{" "}
                </NavLink>
              </aside>
              <aside>
                <NavLink to={`/modifier-recette/${oneRecipe._id}`}>
                  <HiPencilSquare  className="update-icon"/>
                </NavLink>
                <RiDeleteBin4Line onClick={(e)=> handleClick(e,oneRecipe._id) }  className="delete-icon"/>
              </aside>
            </article>

            {
            showModal && (<ConfirmBox  message="Confirmez-vous la suppression?"
             onConfirm={handleConfirm} onCancel={handleCancel}/>)
          }
          </React.Fragment>
        
        ))}
      </section>
      <ToastContainer />
    </main>
  );
};

export default RecipesAdmin;

