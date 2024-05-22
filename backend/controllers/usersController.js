import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

export const register = async (req,res)=>{

try{
 //vérifier qu'il y a au moins: une majuscule, une minuscule, un chiffre et un caractère spéc
  const checkPassWord= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/
  
  const {userName,email,password}= req.body
  if(userName.trim()===""
  ||email.trim()===""
  ||password.trim()===""
  ){
   return res.status(400).json({message:"Veuillez remplir tous les champs!"})
  }
  // Permet de savoir si l'utilisateur est déjà inscrit
     const checkEmail = await User.findOne({email: req.body.email})
    if(checkEmail) {
      return res.status(401).json({message: "Cet email est déjà enregistré"})
    }

  // Vérification du mot de passe respectant la regex
   if(!checkPassWord.test(req.body.password)){
  return res.status(401).json({message: "Mot de passe incorrecte"})
}
  const newUser = new User({
  userName: req.body.userName,
  email: req.body.email,
  password: req.body.password
  })
//enregister le nouveau utilisateur
  await newUser.save();
  res.status(200).json({message: "L'enregistrement de votre compte a été effectué avec succès😄"})
  } 
  catch (error) {
      res.status(500).json({message: "Échec lors de la création du compte."})
  }

}

//controller pour se connecter
export const login = async(req, res) => {
try{
    const {email, password}= req.body
    const user = await User.findOne({"email":email})

    if(!user) {
        return res.status(404).json({message:"Aucun utilisateur n'a été trouvé avec cette adresse e-mail."})
    }
    //Je vais comparer le mot de passe inséré dans la req.body.password avec celui stocké en BDD
    
    const isValidPwd = bcrypt.compareSync(password, user.password)

    if(!isValidPwd) {
      return res.status(401).json({message: "Mot de passe incorrecte"})
      }

    // Je vais créer mon token, si le MDP est correcte
      const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_TOKEN })
      res.status(200).json({
        id: user._id,
        userName: user.userName,
        role: user.role,
        token:token
    })
} catch (error) {
    res.status(500).json({message: "Erreur lors de la connexion"})
}
}



export const  getAllUsers = async(req, res) =>{
try{
  const users= await User.find();
  res.status(200).json(users);
}

catch(err){
  res.status(500).json({message: "Impossible de récupérer les utilisateur"})}
}


export const getOneUser=async(req, res) =>{

try{

  const {id} = req.params
  const user = await User.findById(id)

    //si il n'y a pas d'utilisateur
    if (!user) {
      return res.status(404).json({message: "Utilisateur Introuvable 🧐!"});
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({message:"Une erreur s'est produite lors de la tentative de récupération de l'utilisateur."})
  }
};




export const deleteUser = async(req, res) => {
try{
  // récupérer l'id de l'utilisateur
 const {id}= req.params
 await User.deleteOne({_id:id});
 res.status(200).json({message:" utilisateur bien supprimé 😄"})
}

catch(err){
  res.status(500).json({message:"Ipossible de supprimer l'utilisateur"})
}

}



export const updateUserRole= async(req,res)=>{

 try{
   const{id}=req.params;
   const { role } = req.body;
  await User.findByIdAndUpdate(id, {role:role})
 res.status(200).json({message: "role mis à jour"})
 }


catch(err){

}


}
