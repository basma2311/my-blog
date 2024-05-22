
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import RecipeForm from './Pages/RecipeForm'
import OneRecipe from './Pages/oneRecipe'
import Login from './Pages/Login'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import Admin from './Pages/Admin'
import Grecipe from './Pages/GRecipe'
import UpdateRecipe from './Pages/UpdateRecipe'
import Discover from './Pages/Discover'
import HealthyPage from './Pages/HealthyPage'
import Search from './Pages/Search'
import Sweets from './Pages/Sweets'
import HealthySweets from './Pages/HealthySweets'
import HealthyRecipes from './Pages/HealthyRecipes'
import AllRecipes from './Pages/AllRecipes'



function App() {

  return (
    
  <Routes>
  <Route path="/" element={<Home />} />
  {/* Routes d'authentification */}
  <Route path="/enregistrement" element={<Register />} />
  <Route path="/login" element={<Login />} />
  
  {/* Routes accessibles uniquement aux utilisateurs avec le rôle "admin" */}
  <Route path='/' element={<PrivateRoute roles={["admin"]}/>}>
  <Route path="/ajouter-recette" element={<RecipeForm />} />
  <Route path="/admin" element={<Admin />} />
  <Route path="/gestion-recette" element={<Grecipe />} />
  <Route path="/modifier-recette/:recipeId" element={<UpdateRecipe/>} />
  </Route>

  <Route path="/recette/:id" element={<OneRecipe/>} />

  <Route path="/recette-saine" element={<HealthyPage />} />
  <Route path="/dessert-sain" element={<HealthySweets/>} />
  <Route path="/plat-sain" element={<HealthyRecipes/>} />
  <Route path="/toute-recettes" element={<AllRecipes/>} />
  <Route path="/dessert" element={<Sweets />} />
  <Route path="/découvrir" element={<Discover/>} />
  <Route path="/recherche" element={<Search/>} />
  </Routes>
  
  )
}

export default App
