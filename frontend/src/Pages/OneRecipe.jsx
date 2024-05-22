/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GiNetworkBars } from "react-icons/gi";
import { IoTimeOutline } from "react-icons/io5";
import { FaGripLinesVertical } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import Comments from "../conponents/Comments";
import StarRating from "../conponents/StarRating";
import { CiCalendarDate } from "react-icons/ci";
// import { token } from "../context/Token";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const OneRecipe = () => {
  // State pour stocker les données de la recette
  const [recipe, setRecipe] = useState();
  //State pour stocker les commentaires
  const [comments, setComments] = useState([]);
  // recupérer les parametres dynamique 
  const { id } = useParams();
  // Récupération des informations de l'utilisateur connecté depuis le contexte d'authentification
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:9001/recipes/${id}`)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((res) => {});

  // Appel à l'API pour récupérer les commentaires de la recette actuelle
    axios
      .get(`http://localhost:9001/comments/${id}`)
      .then((res) => {
        setComments(res.data);
        //setComments(res.data.comments)
      })
      .catch((res) => {
         toast.err(res.data);
      });
  }, [comments]);

  return (
    <main>
      <section className="oneRecipe">
        {/* Vérification de l'existence de la recette */}
        {recipe && (
          <>
          {/* Contenu de la recette */}
            <article className="content-recipe">
              <h2 className="one-recipe-title">
                <span className="h2-title-one-recipe">{recipe.title}</span>
              </h2>

              <img
                style={{ maxWidth: "100%", height: "", padding: "10px" }}
                src={`http://localhost:9001/assets/img/${recipe.image.src}`}
                alt={recipe.image.alt}
                className="img-one-recipe"
              />
              <aside className="one-recipe-time">
                <h4>
                  <CiCalendarDate className="vertical-line" />
                  <span className="one-recipe-h4">
                    {new Date(recipe.createdAt).toLocaleDateString()}
                  </span>
                </h4>
                <h4 className="one-recipe">
                  <GiNetworkBars className="difficulty-icon" /> Difficulté :{" "}
                  <span className="one-recipe-h4">{recipe.difficulty}</span>
                </h4>
                <FaGripLinesVertical className="vertical-line" />
                <h4 className="one-recipe">
                  <IoTimeOutline className="time-icon" /> Temps Total :{" "}
                  <span className="one-recipe-h4">{recipe.time} minutes</span>{" "}
                </h4>
                <FaGripLinesVertical className="vertical-line" />
                <h4 className="one-recipe nbrPerson">
                  <IoPersonSharp className="nbr-person-icon" />
                  <span className="one-recipe-h4"> {recipe.nbrPerson}</span>
                </h4>
              </aside>
              <h4 className="one-recipe-description">{recipe.description}</h4>
            </article>

            <article className="ctt-recipe">
              <aside className="introRecipe">
                <h4 className="one-recipe-h4">
                  Catégorie:{" "}
                  <span className="cat-orig-auth">{recipe.category}</span>
                </h4>
                <h4 className="one-recipe-h4">
                  Origine: <span className="cat-orig-auth">{recipe.area}</span>
                </h4>
                <h4 className="one-recipe-h4">
                  Préparer par:{" "}
                  <span className="cat-orig-auth">{recipe.author}</span>
                </h4>
              </aside>

              <aside className="ingredients">
                <h3 className="ingredients">Ingrédient</h3>
                {/* Mapping sur la liste des ingrédients de la recette */}
                {recipe.ingredients.map((ingredient, i) => (
                  <h4 key={i} className="one-recipe-h4">
                    <VscDebugBreakpointLog />
                    <span> {ingredient.quantity}</span>
                    <span> {ingredient.unit}</span>
                    <span> {ingredient.ingName}</span>
                  </h4>
                ))}
              </aside>
              <aside className="stepsRecipe">
                <h3 className="one-recipe">Instruction :</h3>
                <h4 className="one-recipe-h4-steps">{recipe.steps}</h4>
              </aside>
            </article>
          </>
        )}
      </section>
      <aside className="Comments-Rating">
        <hr style={{ border: "2px solid #E78895" }} />
        {/* Affichage des commentaires uniquement si un utilisateur est connecté */}
        {user && <Comments />}

        <hr style={{ border: "2px solid #E78895" }} />
        {/* afficher les commentaires */}
        {comments.map((OneComment, i) => (
          <React.Fragment key={i}  >
            <aside className="allComments">
              <h4>{OneComment.userId.userName} :</h4>
              <StarRating rating={OneComment.rating} />
              <p>{OneComment.content}</p>
              <em style={{ fontSize: "0.5rem" }}>
                {new Date(OneComment.createdAt).toLocaleDateString()}
              </em>
            </aside>
          </React.Fragment>
        ))}
      </aside>
      <ToastContainer />
    </main>
  );
};
export default OneRecipe;
