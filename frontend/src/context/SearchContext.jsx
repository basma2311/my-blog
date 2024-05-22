/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// Création du contexte de recherche
const SearchContext = createContext();
// Gestionnaire de contexte de recherche
export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [recipes, setRecipes] = useState([]);
// Récupérer les recettes depuis l'API
  useEffect(() => {
    axios.get("http://localhost:9001/recipes").then((res) => {
      let data = res.data.reverse();
  // Mise à jour de l'état local des recettes
      setRecipes(data);
    });
  }, []); // Le tableau vide [] en tant que dépendance signifie que l'effet ne sera exécuté qu'une seule fois 

  // Fonction pour filtrer les recettes en fonction de la recherche
  const handleSearch = (search) => {
    const filteredRecipes = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.category.toLowerCase().includes(search.toLowerCase())
    );
     // Mise à jour des résultats de recherche
    setSearchResults(filteredRecipes);
  };

  // Rendu du composant de contexte avec les enfants enveloppés dans le contexte de recherche
  return (
    <SearchContext.Provider value={{ searchResults, handleSearch, recipes }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
