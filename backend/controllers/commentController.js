import Comment from "../models/commentModel.js";
 // Ajouter un commentaire sur une recette
export const addNewComment = async (req, res) => {
  try {
    const { content, rating } = req.body;
    const { recipeId, userId } = req.params;
    if (content.trim ===""||
        rating< 0||
        rating >5
    ) {
      return res
        .status(401)
        .json({ message: "Ajouter un commentaire s'il vous plait" });
    }
    const newComment = new Comment({
      recipeId,
      userId,
      content,
      rating
    });

    await newComment.save();
    res.status(200).json({ message: "Commentaire bien ajouté😄" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Il y a une erreur lors de l'ajout d'un commentaire!" });
  }
};

//Récupérer toutes les commentaires par recettes
export const getAllCommentsByRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const comments = await Comment.find({
      recipeId: req.params.recipeId,
    }).populate("userId", "-password"); // l'utilisateur associé à chaque commentaire, en excluant le mot de passe




    res.status(200).json(comments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Impossible de récupérer tous les commentaires" });
  }
};

// //Ajouter une réponse sur un commentaire
// export const addAnswer = async (req, res) => {
//   try {
//     const { recipeId, commentId } = req.params;
//     const { content } = req.body;
//     const newAnswer = {
//       content,
//       userId: req.userId,
//       date: new Date()
//     };
//     //vérifier si l'utilisateur envoie un champ vide
//     if (content === "") {
//       return res
//         .status(401)
//         .json({ message: "Ajouter une reponse s'il vous plait" });
//     }
//     const comment = await Comment.updateOne(
//       { _id: commentId },
//       { $push: { answers: newAnswer } }
//     );
//     res.status(200).json({ message: "Reponse bien ajouté😄" });
  
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Il y a une erreur lors de l'ajout d'une réponse!" });
//   }
// };

// //récupérer tous les reponses par commentaire

// export const getAllAnswersByComment = async (req, res) => {
//   try {
//     const { commentId } = req.params;

//     const comment = await Comment.findById(commentId).populate(
//       "answers.userId",
//       "-password"
//     );

//     res.json({ answers: comment.answers });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Impossible de récupérer tous les réponse" });
//   }
// };
