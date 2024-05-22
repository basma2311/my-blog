import { useEffect, useState } from "react";
import axios from "axios";
import { token } from "../context/Token";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateRecipe() {
    // Déclaration du state pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    category: "",
    area: "",
    author: "",
    nbrPerson: "",
    steps: "",
    image: null,
    imageAlt: "",
    healthy: "",
    ingredients: [],
  });
  const navigate = useNavigate()
  //récupération des paramètres dynamique
  const { recipeId } = useParams();
  // récupérer les données de la recette à modifier lors du chargement initial
  useEffect(() => {
    axios.get(`http://localhost:9001/recipes/${recipeId}`).then((res) => {
      setFormData(res.data);
    });
  }, [recipeId]);
 //  Changement d'entrée de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
// Changement d'image
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleAddIngredient = () => {
    const newIngredient = { ingName: "", quantity: "", unit: "" };
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, newIngredient],
    });
  };

  const handleIngredientChange = (e, index) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][e.target.name] = e.target.value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients.splice(index, 1);
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      formData.title.trim() === "" ||
      formData.description.trim() === "" ||
      formData.author.trim() === "" ||
      formData.nbrPerson <= 0 ||
      formData.category.trim() === "" ||
      formData.difficulty.trim() === "" ||
      formData.time <= 0 ||
      formData.area.trim() === "" ||
      formData.steps.trim() === ""
    ) {
      return toast.error("Veuillez remplir tous les champs");
    }
    // Creer un objet FormData pour l'envoi des données du formulaire
    const form = new FormData();

    for (const key in formData) {
      // Vérifie si la valeur de l'élément n'est pas vide (différente de null)
      if (formData[key] !== null) {
         // Vérifie si l'élément est "ingrédients"
        if (key === "ingredients") {
           // Si c'est le cas, convertit la liste des ingrédients en une chaîne de texte JSON
           // puis ajoute cette chaîne à la nouvelle structure de données
          form.append(key, JSON.stringify(formData[key]));
        } else {
           // Si ce n'est pas la liste des ingrédients, ajoute la valeur directement
           // à la nouvelle structure de données
          form.append(key, formData[key]);
        }
      }
    }

    try {
      // Envoi de la requête POST pour mettre à jour la recette
      await axios.post(`http://localhost:9001/recipes/edit/${recipeId}`, form, {
        headers: token(),
      });
      toast.success("La recette a été mis a jour!", { autoClose: 2000 });
      setTimeout(() => {
        navigate("/gestion-recette");
      }, 2000);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <section className="section-update-recipe">
        <h2 className="updateRecipe-title">Modifier la recette</h2>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="update-recipe"
        >
          <label htmlFor="name" className="label-update">
            Titre :
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />

          <label htmlFor="description" className="label-update">
            Description :
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />

          <label htmlFor="déficulté" className="label-update">
            Difficulté :
          </label>
          <input
            type="text"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
          />

          <label htmlFor="cathegorie" className="label-update">
            Catégorie :
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />

          <label htmlFor="nombre personne" className="label-update">
            Nombre des personnes :
          </label>
          <input
            type="text"
            name="nbrPerson"
            value={formData.nbrPerson}
            onChange={handleInputChange}
          />

          <label htmlFor="origine" className="label-update">
            Origine :
          </label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
          />

          <label htmlFor="name" className="label-update">
            Préparé par :
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />

          <label htmlFor="temp" className="label-update">
            Temps de préparation :
          </label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
          />
          <label htmlFor="image" className="label-update">
            Image :
          </label>
          <input type="file" name="image" onChange={handleImageChange} />

          <button
            type="button"
            onClick={handleAddIngredient}
            className="add-ingredient-update"
          >
            Ajouter un ingrédient
          </button>
          <div>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index}>
                <input
                  className="ingredient-added"
                  type="text"
                  name="ingName"
                  placeholder="nom de l'ingredient"
                  value={ingredient.ingName}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
                <input
                  className="ingredient-added"
                  type="number"
                  name="quantity"
                  placeholder="Quantité"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
                <input
                  className="ingredient-added"
                  placeholder="unité"
                  type="text"
                  name="unit"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="delete-ingredient"
                >
                  Supprimer Ingredient
                </button>
              </div>
            ))}
          </div>

          <label htmlFor="etapes" className="label-update">
            Instructions:
          </label>

          <textarea
            type="text"
            name="steps"
            rows="10"
            value={formData.steps}
            onChange={handleInputChange}
            id="steps-update"
          />

          <fieldset className="category">
            <legend>Catégorie</legend>

            <label className="update">
              <input
                type="radio"
                name="healthy"
                value="true"
                checked={formData.healthy === true}
                onChange={handleInputChange}
              />
              Healthy
            </label>

            <label className="update">
              <input
                type="radio"
                name="healthy"
                value="false"
                checked={formData.healthy === false}
                onChange={handleInputChange}
              />
              Normal
            </label>
          </fieldset>
          <button type="submit" className="save-recipe-updated">
            Modifier la recette
          </button>
        </form>
      </section>
      <ToastContainer />
    </>
  );
}

export default UpdateRecipe;
