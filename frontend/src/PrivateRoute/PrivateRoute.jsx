import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({roles}) => {
  
  const {user}= useAuth();
  //on va verifier si l'utilisateur est connecté 
  //récupérer son rôle
  const isAuthorized = user && roles.includes(user.role)

  if(!isAuthorized){
 //replace: quand il ya de redirection il va remplacer l'historique de le user
    return <Navigate to={"/"}  replace />
  }
  return <Outlet />

};

export default PrivateRoute;