import { useState } from 'react';
import './App.css';
import backgroundImage from '../assets/images/bg-login.jpg'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
const [inputs, setInputs]= useState({
email: "",
password: "",
})
const [err,setErr]= useState()

const auth = useAuth();
const navigate = useNavigate();

const handleChange = (e) => {
  const {name, value} = e.target
  setInputs({...inputs,[name]:value})
  setErr();
}

const handleSubmit = (e) => {
  e.preventDefault();
  if(inputs.email.trim()==="" || inputs.password.trim()=="" ){
    return toast.error("Merci de remplir tous les champs!")
  }

 axios.post("http://localhost:9001/login", inputs)
 .then((res)=>{
  //pour géré si l'utilisateur se trompe de mot de passe

  if(res.data.token){
     auth.login(res.data)
      navigate("/")
   }
 })
 .catch(error => {
  if (error.response.status === 401) {
    toast.error("Email ou mot de passe incorrects. Veuillez réessayer.");
  } else {
    toast.error("Une erreur s'est produite. Veuillez réessayer plus tard.");
  }
});

}

const LoginStyle= {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};


  return (
    <main >
      <section className='login' style={LoginStyle}>
        
      <form onSubmit={handleSubmit}  className='login-form'>
      {
              err && <span className='err-msg-login'>{err}</span>
            }
            <label htmlFor="email" className='email-login'>Email</label>
            <input type="email" name='email'  id='email' placeholder='azerty@azerty.fr' onChange={handleChange} value={inputs.email}   />
            <label htmlFor="password" className='password-login'>Mot de passe</label>
            <input type="password" name='password' id='password' placeholder='Mot de passe' onChange={handleChange} value={inputs.password}  />
            <button className='btn-login'>Connexion</button>  
      </form>
      </section>
      <ToastContainer />
    </main>
  );
};

export default Login;