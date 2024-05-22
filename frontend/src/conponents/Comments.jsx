import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { token } from "../context/Token";
import Rating from "./Rating"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// eslint-disable-next-line react/prop-types
const Comments = ({addComment}) => {
  const [inputs, setInputs] = useState({
    recipeId: "",
    content: "",
    rating: 0
  });

  const {id} = useParams();
  const auth = useAuth();
  const [err, setErr] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value }); //destrecturer (name:name,value:value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
  
      inputs.content.trim() === "" ||
      inputs.rating < 0 ||
      inputs.rating > 5
    ) {
      return toast.error("Veuillez remplir tous les champs");
    }
    axios
      .post(`http://localhost:9001/comments/new/${id}/${auth.user.id}`,inputs, {headers: token()})
      .then((res) => {
        toast.success("Commentaire ajouté avec succès!😃", {
          autoClose: 1000 // Durée en millisecondes, ici 3000 pour 3 secondes
        });
        setInputs({ content: "", rating: 0 });
      })
      .catch((res) =>{setErr(res.data)} )
  };

  return (
    <section className="comments-section">
      
      <form onSubmit={handleSubmit}
      className="comments-form">
        <article className="stars"><label htmlFor="note" className="label-star">Evaluer cette recette</label>
         <aside>
         <Rating  rating={inputs.rating} setRating={(rating) => setInputs({...inputs, rating})}  />
        </aside>
         </article>
         <article className="comment"><label htmlFor="commentaire" className="comment-label">Commentaire</label>
        <textarea
          name="content"
          id="content"
          cols="40"
          rows="5"
          value={inputs.content}
          onChange={handleChange}
        ></textarea>
        </article>
        <aside className="btn-add-comment"><button >Ajouter</button></aside>
      </form>
        
      <ToastContainer />
    </section>
  );
};

export default Comments;
