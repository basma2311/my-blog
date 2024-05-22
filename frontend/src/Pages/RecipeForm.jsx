import { useState } from "react";
import axios from "axios";
import { token } from "../context/Token";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


function RecipeForm() {
  // Déclaration d'un état initial pour les données du formulaire
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    category: "",
    area: "",
    author: "",
    steps: "",
    image: null,
    imageAlt: "",
    healthy: "",
    ingredients: [],
  });
const navigate = useNavigate ();

    // Fonction pour gérer le changement de valeur des champs de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Met à jour l'état du formulaire en conservant les valeurs précédentes et en mettant à jour la propriété modifiée
    setFormData({ ...formData, [name]: value });
  };
    // Fonction pour gérer le changement de l'image du formulaire
  const handleImageChange = (e) => {
    // Met à jour l'état du formulaire en conservant les valeurs précédentes et en remplaçant l'image par le fichier sélectionné
    setFormData({ ...formData, image: e.target.files[0] });
  };
   // Fonction pour ajouter un nouvel ingrédient au formulaire
  const handleAddIngredient = () => {
  // Crée un nouvel objet d'ingrédient avec des valeurs par défaut  
    const newIngredient = { ingName: "", quantity: "", unit: "" };
  // Met à jour l'état du formulaire en ajoutant le nouvel ingrédient à la liste des ingrédients
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, newIngredient],
    });
  };

  // Fonction pour gérer le changement de valeur d'un ingrédient dans la liste des ingrédients
  const handleIngredientChange = (e, index) => {
     // Crée une copie de la liste des ingrédients
    const updatedIngredients = [...formData.ingredients];
    // Met à jour la valeur de l'ingrédient spécifique à l'index fourni dans la liste copiée
    updatedIngredients[index][e.target.name] = e.target.value;
    // Met à jour l'état du formulaire en remplaçant la liste des ingrédients par la liste mise à jour
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

     // Fonction pour supprimer un ingrédient de la liste des ingrédients
  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...formData.ingredients];
    // Supprime l'ingrédient à l'index spécifié de la liste copiée
    updatedIngredients.splice(index, 1);
    // Met à jour l'état du formulaire en remplaçant la liste des ingrédients par la liste mise à jour
    setFormData({ ...formData, ingredients: updatedIngredients });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    //vérifier si l'utilisateur a remplir tout les champs
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
    // Crée un nouvel objet FormData pour envoyer les données du formulaire
    const form = new FormData();
    // Ajoute les champs du formulaire à l'objet FormData
    form.append("title", formData.title);
    form.append("author", formData.author);
    form.append("description", formData.description);
    form.append("nbrPerson", formData.nbrPerson);
    form.append("category", formData.category);
    form.append("difficulty", formData.difficulty);
    form.append("time", formData.time);
    form.append("steps", formData.steps);
    form.append("area", formData.area);
    form.append("healthy", formData.healthy);
    form.append("image", formData.image);

    for (const key in formData) {
      // Vérifie si la valeur de la propriété n'est pas nulle
      if (formData[key] !== null) {
      // Si la propriété est "ingredients"  
        if (key === "ingredients") {
      // Convertit la valeur de la propriété en chaîne JSON et l'ajoute à l'objet form
          form.append(key, JSON.stringify(formData[key]));
        }
      }
    }

  // Envoi de la requête POST avec les données du formulaire vers l'URL spécifiée
    try {
      const response = await axios.post(
        "http://localhost:9001/recipes/new", // URL de destination pour créer une nouvelle recette
        form,
        { headers: token() }
      );
        // Attente de la réponse de la requête
      const data = await response;
      toast.success("votre recette a été ajouter avec succès");
        // Réinitialisation des champs du formulaire à leurs valeurs par défaut
      setFormData({
        title: "",
        description: "",
        difficulty: "",
        category: "",
        area: "",
        author: "",
        steps: "",
        image: null,
        nbrPerson: "",
        imageAlt: "",
        healthy: "",
        time: "",
        ingredients: [],
      });
      setTimeout(() => {
        navigate("/gestion-recette");
      }, 2000);
        // Gestion des erreurs en cas d'échec de la requête
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <section className="add-recipe">
        <h2 className="addRecipe-title">Ajouter une recette</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="form-recipe"
        >
          <label htmlFor="name" className="label">
            Titre :
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />

          <label htmlFor="description" className="label">
            Description :
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />

          <label htmlFor="déficulté" className="label">
            Difficulté :
          </label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
            className="menu-select"
          >
            <option value=""></option>
            <option value="Facile">Facile</option>
            <option value="Moyen">Moyen</option>
            <option value="Difficile">Difficile</option>
          </select>

          <label htmlFor="cathegorie" className="label">
            Catégorie :
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="menu-select"
          >
            <option value=""></option>
            <option value="Entrée">Entrée</option>
            <option value="Plat">Plat</option>
            <option value="Dessert">Dessert</option>
          </select>

          <label htmlFor="nombre personne" className="label">
            Nombre des personnes :
          </label>
          <input
            type="number"
            name="nbrPerson"
            value={formData.nbrPerson}
            onChange={handleInputChange}
          />

          <label htmlFor="origine" className="label">
            Origine :
          </label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
          />

          <label htmlFor="name" className="label">
            Préparé par :
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />

          <label htmlFor="temp" className="label">
            Temps de préparation :
          </label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
          />
          <label htmlFor="image" className="label">
            Photo
          </label>
          <input type="file" name="image" onChange={handleImageChange} />

          <button
            type="button"
            onClick={handleAddIngredient}
            className="add-ingredient"
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
          <label htmlFor="etapes" className="label">
            Instructions
          </label>
          <textarea
            id="steps"
            type="text"
            name="steps"
            rows="6"
            value={formData.steps}
            onChange={handleInputChange}
          />
          <fieldset className="category">
            <legend>Healthy/Normal</legend>

            <label className="radio-btn">
              <input
                type="radio"
                name="healthy"
                value="true"
                checked={formData.healthy === true}
                onChange={handleInputChange}
                className="radio-btn"
              />
              Healthy
            </label>
            <label className="radio-btn">
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
          <button type="submit" className="save-recipe">
            Ajouter la recette
          </button>
        </form>
      </section>

      <ToastContainer />
    </>
  );
}

export default RecipeForm;
