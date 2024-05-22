import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext= createContext(null)


// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) =>{
        
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const login = (userData)=> {
       localStorage.setItem('user', JSON.stringify(userData))
       setUser(userData)         
    }


    const logout = ()=> {

      setUser(null);
      localStorage.removeItem('user');
    }
      

      // useEffect pour Initialiser l'état de la connexion à partir du localStorage
    useEffect(()=>{
      const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if(storedUser){
       setUser(storedUser)
    }
    },[])

    return (
      <AuthContext.Provider value={{login, logout, user}}>
          {children}
      </AuthContext.Provider>
  )
  }

  // eslint-disable-next-line react-refresh/only-export-components
  export const useAuth =()=> useContext (AuthContext)

  export default AuthProvider