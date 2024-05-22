/* eslint-disable no-unused-vars */
import { NavLink} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchContext } from "../context/SearchContext";


const Search = () => {
  
  const [recipes, setRecipes] = useState([]);
  const {searchResults} = useSearchContext();
// récupérer les recettes depuis l'API et mettre à jour l'état local "recipes"
  useEffect(() => {
    axios.get("http://localhost:9001/recipes").then((res) => {
      let data = res.data.reverse();
      setRecipes(data);
    });

  }, []);

  return (
    <section className="search-page" >
      
      {searchResults.map((oneRecipe, i) => (
        <React.Fragment key={i} >
          <article  className="recipe-search">
            <NavLink to={`/recette/${oneRecipe._id}`}>
            <img
                src={`http://localhost:9001/assets/img/${oneRecipe.image.src}`}
                alt={oneRecipe.image.alt}
                className="image-item-search"
              />
              </NavLink>
              <NavLink to={`/recette/${oneRecipe._id}`}>
            <h3 className="title-search">
                <span>{oneRecipe.title}</span>
              </h3>
              </NavLink>
              <h3 className="category-search">
                <span>{oneRecipe.category}</span>
              </h3>
          </article>
        
        </React.Fragment>
      ))}
    </section>
  );
};


export default Search;































// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { NavLink } from "react-router-dom";
// // import { token } from "../context/Token";

// const Search = () => {
//   // const [recipes, setRecipes] = useState([]);
//   // const [err, setErr] = useState("");
  
//   // useEffect(() => {
//   //   axios
//   //     .get("http://localhost:9001/recipes", { headers: token() })
//   //     .then((res) => {
//   //       setRecipes(res.data);
//   //     })
//   //     .catch((res) => {
//   //       setErr(res.data);
//   //     });
//   // }, []);
    

//   return (
//     <main className="container">
//       {/* <section >
//         {recipes.map((oneRecipe) => (
//           <>
//             <article key={oneRecipe._id} className="oneRecipeUpdate">
//               <aside>
//                 <NavLink to={`/recette/${oneRecipe._id}`} className="recipe-title">
//                   {oneRecipe.title}</NavLink>
              
//               </aside>
//             </article>
          
          
//           </>
        
//         ))}
//       </section> */}
      
//     </main>
//   );
// };


// export default Search;