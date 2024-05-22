import  express  from "express";
import { addRecipe, deleteRecipe, getAllRecipes, getHealthyDessertRecipes, getHealthyRecipes,  getHealthyStarterAndDishRecipes,  getOneRecipe,  getRecipeByCategory,  updateRecipe} from "../controllers/recipeController.js";
import upload from "../middlewares/multer.js";
import { isAuthorized, isLogged } from "../middlewares/auth.js";




const recipeRouter = express.Router();
//Route pour search bar
// recipeRouter.get('/recipestest/:title',searchOneRecipeByTitle)



// Route pour récupérer toutes les recettes d'une catégorie donnée
recipeRouter.get('/recipes/category/:category', getRecipeByCategory) 

// Route pour récupérer toutes les recettes saines
recipeRouter.get('/recipes/healthy/', getHealthyRecipes)
// Route pour récupérer toutes les recettes de dessert-sain
recipeRouter.get('/recipes/healthy-desserts', getHealthyDessertRecipes);
//Route pour récupérer toutes les recettes saines de category Plat/entréé 
recipeRouter.get('/recipes/healthy-Starter-dish', getHealthyStarterAndDishRecipes);

recipeRouter.get('/recipes/:id',getOneRecipe)
recipeRouter.post('/recipes/new',upload.single("image"),addRecipe) 
recipeRouter.delete('/recipes/:id',isLogged,isAuthorized(["admin"]),deleteRecipe)
recipeRouter.post('/recipes/edit/:id',isLogged,isAuthorized(["admin"]),upload.single("image"), updateRecipe)
recipeRouter.get('/recipes', getAllRecipes)


export default recipeRouter