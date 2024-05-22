import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModels.js";

dotenv.config();
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {func} next 
 * @returns Fonction qui marche bien
 */
export const isLogged = (req, res, next) => {
  let authToken = req.headers.authorization;

  //j'extrai le token du headers de la requête
  let token = authToken && authToken.split(" ")[1];

  //si on n'as pas récupérer le token du front
  if (!token) {
    return res.status(401).json({ message: "vous n'êtes pas aythentifié" });
  }

  //déchifer le token

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log(err);
    if (err) {
      return res.status(403).json({ message: "session expirée" });
    }
    req.userId = decoded.id;
    next();
  });
};

//géer le rôle
export const isAuthorized = (roles) => {
  return async (req, res, next) => {
  
    const user =await User.findById(req.userId)

    if(!user){
      return res.status(404).json({message:"Utilisateur introuvable"})
    }
    //gestion des différents rôles d'un utilisateur
      if(!roles.includes(user.role)){
        return res.status(403).json({message: "Vos permissions ne vous permettent pas d'accéder à la page!"}) 
      }
     next();
  };
};
