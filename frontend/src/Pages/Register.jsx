import "./App.css";
import backgroundImage from "../assets/images/masala-4096891_1280.jpg";
import { useState } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const Register = () => {
  // Style pour l'arrière-plan de la section d'inscription
  const sectionStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  // State pour stocker les valeurs des champs de formulaire
  const [inputs, setInputs] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState();
  
  const navigate = useNavigate();

 // Gestionnaire de changement des valeurs des champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErr();
  };
  // Gestionnaire de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.userName.trim() === ""|| inputs.email.trim() === "" || inputs.password.trim() === "")
     {// message si l'utilisateur ne remplis pas tous les champs
      return toast.error("Veuillez remplir tous les champs");
    }
       // Vérification du mot de passe avec regex
   const checkPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/;
   if (!checkPasswordRegex.test(inputs.password)) {
       return toast.error("Le mot de passe doit contenir au moins 8 caractères!");
   }
    axios
    // Requête HTTP POST pour l'inscription
    .post("http://localhost:9001/register", inputs)
    .then((res) => {
      toast.success("Inscription réussie! Vous pouvez connecté maintenant.");
        setInputs({ userName: "", email: "", password: "" }); // Réinitialisation des champs après la connexion
        setTimeout(() => {
          navigate("/Login"); // Redirection vers la page d'accueil après un délai
        }, 2000);    
      }
    )
  .catch((res) => setErr(res.data));
  };

  return (
    <main className="container">
      <aside className="text">
        <h2 className="h2-register">
          <strong>Qu&rsquo;est-ce qu&rsquo;on mange ce soir ?</strong>
        </h2>
        <h5 className="clic">
          De l&rsquo;inspiration chaque jour avec des recettes faciles,
          gourmandes et de SAISON😉
        </h5>
      </aside>
      <section style={sectionStyle} className="subscribe">
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="userName" id="userName">
            Nom d&rsquo;utilisateur
          </label>
          <input
            onChange={handleChange}
            value={inputs.userName}
            name="userName"
            type="text"
            placeholder="nom d'utilisateur"
          />
          <label htmlFor="Email" id="email">
            Email
          </label>
          <input
            onChange={handleChange}
            value={inputs.email}
            name="email"
            type="email"
            placeholder="Email"
          />
          <label htmlFor="mot de passe" id="password">
            Mot de passe
          </label>
          <input
            onChange={handleChange}
            value={inputs.password}
            name="password"
            type="password"
            placeholder="password"
          />
          <span
            style={{
              fontSize: "0.5rem",
              background: "#FDA403",
              marginTop: "0.3rem",
              color: "white",
            }}
          >
            Le mot de passe doit contenir au moins un caractère spécial (exp: !,
            @, #, $, %)
          </span>
          <button type="submit" className="register">
            Inscription
          </button>
        </form>
      </section>
      <ToastContainer />
    </main>
  );
};

export default Register;
