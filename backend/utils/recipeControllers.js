import Recipe from "../models/recipeModels.js";

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Impossible de récupérer les recettes" });
  }
};

export const getOneRecipe = async (req, res) => {
  try {
    //récupérer le paramèttre dynamique de l'url
    const { id } = req.params;
    const recipe = await Recipe.findById(id);

    //si il n'y a pas d'article
    if (!recipe) {
      return res.status(404).json({ message: "Recette introuvable!" });
    }
    res.status(200).json(recipe);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
        message:
          "Une erreur s'est produite lors de la tentative de récupération de l'article.",
      });
  }
};

export const addRecipe = async (req, res) => {
  try {
    const {
      title,
      author,
      nbrPerson,
      description,
      category,
      difficulty,
      area,
      steps,
      time,
      healthy,
    } = req.body;
  

    const ingredients = JSON.parse(req.body.ingredients);

    const image = req.file;

    // Vérification si l'utilisateur a rempli tous les champs requis
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      author.trim() === "" ||
      nbrPerson <= 0 ||
      category.trim() === "" ||
      difficulty.trim() === "" ||
      time <= 0 ||
      area.trim() === "" ||
      steps.trim() === "" ||
      healthy.trim() === ""
    ) {
      return res
        .status(401)
        .json({ message: "Veuillez remplir tous les champs !" });
    }

    // Si aucune image n'est fournie

    if (!image) {
      return res.status(401).json({ message: "Veuillez ajouter une image !" });
    }
    // Création de l'objet Recipe avec les informations fournies
    const recipe = new Recipe({
      title,
      description,
      author,
      category,
      difficulty,
      nbrPerson,
      area,
      steps,
      healthy,
      time, // Ajout du temps de préparation
      image: {
        src: image.filename,
        alt: image.originalname,
      },
      ingredients,
    });
    await recipe.save();

    // Sauvegarde de la recette dans la base de données
    res.status(200).json({ message: "Recette bien créée 😃" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Impossible d'ajouter une recette😣" });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    // récupérer l'id du recipe
    const { id } = req.params;
    await Recipe.deleteOne({ _id: id });

    res.status(200).json({ message: "Bien supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Ipossible de supprimer cette recette" });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const {
      title,
      author,
      nbrPerson,
      description,
      category,
      healthy,
      difficulty,
      area,
      steps,
      time,
    } = req.body;
    
    const { id } = req.params;
    const ingredients = JSON.parse(req.body.ingredients);
    const image = req.file;

    const updateData = {
      title,
      description,
      author,
      category,
      difficulty,
      area,
      nbrPerson,
      steps,
      healthy,
      time, // Ajout du temps de préparation
      image: {
        src: req.file.filename,
        alt: req.file.originalname,
      },
      ingredients,
    };
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recette introuvable!🧐" });
    }

    res
      .status(200)
      .json({
        message: "Recette mise à jour avec succès😄",
        recipe: updatedRecipe,
      });
  } catch (err) {
    res.status(500).json({ message: "Impossible de mettre à jour la recette" });
  }
};

export const getRecipeByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const recipes = await Recipe.find({ category: category });

    if (!recipes) {
      return res
        .status(404)
        .json({ message: "Aucune recette trouvée pour la catégorie plat." });
    }

    res.status(200).json(recipes);
  } catch (err) {
    res
      .status(400)
      .json({
        message:
          "Une erreur s'est produite lors de la tentative de récupération de l'article.",
      });
  }
};

export const getHealthyRecipes = async (req, res) => {
  try {
    const healthyRecipes = await Recipe.find({ healthy: true });

    if (!healthyRecipes) {
      return res
        .status(404)
        .json({ message: "Aucune recette healthy trouvée!" });
    }

    res.status(200).json(healthyRecipes);
  } catch (err) {
    res
      .status(500)
      .json({
        message:
          "Une erreur s'est produite lors de la récupération des recettes healthy.",
      });
  }
};
