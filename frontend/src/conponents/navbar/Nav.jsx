import "./Nav.css";
import { useState } from "react";
import logo from "../../assets/images/LOGO/LOGO-nav .png"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import { MdAdminPanelSettings } from "react-icons/md";
import image from "../../assets/images/image-nav.png";
import { useSearchContext } from "../../context/SearchContext";



const Nav = () => {
  const [showLinks, setShowLinks] = useState(false);
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const searchNavigate = useNavigate();
  const {handleSearch} = useSearchContext()

  // Fonction appelée à chaque changement dans la barre de recherche
  const handleChange = (e) => {
  // Mettre à jour le terme de recherche à chaque changement dans la barre de recherche
    const term = e.target.value;
    // Appel de la fonction de recherche avec le terme actuel
     handleSearch(term)
    // Mise à jour du terme de recherche dans l'état local
     setSearchTerm(term);
    
    // Rediriger l'utilisateur vers la page de résultats de recherche avec le terme de recherche 
    searchNavigate(`/recherche`);
  };

// Fonction pour afficher ou masquer le nav-links
  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

// Fonction pour masquer le nav-links quand je clique sur le lien
  const closeNavbar = () => {
    setShowLinks(false);
  };
  //Récupération de l'authentification depuis le contexte
  const auth = useAuth();
  // Hook de navigation pour naviguer vers une autre page
  const navigate = useNavigate();
// Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <section>
      <header className="mobile-header">
        <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
          <Link to="/">
            {" "}
            <img src={logo} alt="logo-Home-Made" className="logo" />
          </Link>
          <Link to="/">
            <h1 className="brand">Home-Made</h1>
          </Link>
          <ul className="navbar_links">
            <li className="navbar_item slideInDown-1">
              <NavLink to={"/"} className="navbar_link" onClick={closeNavbar}>
                Accueil
              </NavLink>
            </li>
            <li className="navbar_item slideInDown-2">
              <NavLink to={"/découvrir"} className="navbar_link" onClick={closeNavbar}>
                Decouvrir
              </NavLink>
            </li>
            <li className="navbar_item slideInDown-3">
              <NavLink to={"/recette-saine"} className="navbar_link" onClick={closeNavbar}>
                Healthy
              </NavLink>
            </li>
            <li className="navbar_item slideInDown-4">
              <NavLink to={"/dessert"} className="navbar_link" onClick={closeNavbar}>
                Dessert
              </NavLink>
            </li>
            {user && user.role === "admin" && (
              <li className="navbar_item slideInDown-4">
                <NavLink to={"/admin"} className="navbar_link" onClick={closeNavbar}><MdAdminPanelSettings /> 
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <button className="navbar_burger" onClick={handleShowLinks}>
            <span className="burger-bar"></span>
          </button>
        </nav>
        <article className="article-search-mobile">
             <aside className="search-bar-mobile">
              <input type="text"  
              className="input-search-mobile"
              placeholder="Recherche"
              onChange={handleChange}
              value={searchTerm}
              />
              <IoSearch
                className="search-icon-mobile"
              />
            </aside>
            </article>
        <article className="register">
          <aside className="nav-text">
            <p className="mobile-nav-text">Recevez les dernières recettes</p>
            <p className="mobile-nav-text">en un clic!</p>
          </aside>
          <aside className="nav-form">
            {auth.user ? (
              <button className="connexion" onClick={handleLogout}>
                Déconnexion
              </button>
            ) : (
              <NavLink to="/login">
                <button className="connexion">Connexion</button>
              </NavLink>
            )}
            {!auth.user && (
          <NavLink to="/enregistrement">
          <button className="sign-up">S&rsquo;inscrire</button>
           </NavLink>
            )}
          </aside>
        </article>
      </header>

      <header className="desktop-header">
        <nav className="navbar-desktop">
          <Link to="/">
            <img src={logo} alt="logo-Home-Made" className="logo-desktop" />
          </Link>
          <article className="register-desktop">
            <aside className="nav-text-desktop">
              <div className="box">
              <h1>Découvrez les Saveurs et les Secrets Culinaires! </h1></div>
              <img src={image} alt="icon-materiels-cuisine"  width={'180px'} height={"180px"} className="img-tools"/>
            </aside>
            <aside className="nav-form-desktop">
              {auth.user ? (
               <>
               <h2 className="user-name">hello {auth.user.userName} !</h2>
               <button className="connexion-desktop" onClick={handleLogout}>
               Déconnexion
             </button>
             </>
                  
              ) : (
                <NavLink to="/login">
                <button className="connexion-desktop">Connexion</button>
              </NavLink>
              )}

              {!auth.user && (<NavLink to="/enregistrement">
                <button className="sign-up-desktop">S&rsquo;inscrire</button>
              </NavLink>)}
              
            </aside>
          </article>
        </nav>
        <article className="menu">
          <ul className="links-desktop">
            <li>
              <NavLink to={"/"} className="nav-link-desktop">
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to={"/découvrir"} className="nav-link-desktop">
                Decouvrir
              </NavLink>
            </li>
            <li className="healthy">
              <NavLink to={"/recette-saine"} className="nav-link-desktop">
                Healthy
              </NavLink>
              <ul className="sub-ul">
                <li className="sub-li">
                  <NavLink to={"/plat-sain"} className="sub-title">
                    Entrée/Plat
                  </NavLink>
                </li>
                <li className="sub-li">
                  <NavLink to={"/dessert-sain"} className="sub-title">
                    Dessert
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to={"/dessert"} className="nav-link-desktop">
                Dessert
              </NavLink>
            </li>
        
            {user && user.role === "admin" && (
              <li>
                <NavLink to={"/admin"} className="nav-link-desktop admin-link"><MdAdminPanelSettings style={{fontSize:"1rem"}} /> 
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
        
            <aside className="search-bar-desk">
              <input type="text"  
              className="input-search-desk"
              placeholder="Recherche"
              onChange={handleChange}
              value={searchTerm}
              
              />
              <IoSearch
                className="search-icon-desktop"
              />
            </aside>
          
        </article>
      </header>
    </section>
  );
};

export default Nav;

