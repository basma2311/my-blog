import './Header.css';
import { useState } from 'react';
import  logo from '../../assets/logo.png';
import { Link, NavLink } from 'react-router-dom';


const Header = () => {
   const [showModal, setShowModal] = useState(false);

  return (
    <>
    <header>
      <img src={logo} alt="logo"/>
      <h1>Home Made</h1>
      <button onClick={()=>{setShowModal(true)} } style={{fontSize:'2rem'}} className='menu icon-menu1'/>
    

    {showModal &&(
        <section className='fixed'>
        <ul className='modal'>
          <li>
            <button className='icon-remove' style={{fontSize:'2rem', color:'#ebe6e4c8'}}  onClick={()=>{setShowModal(false)}}/>
          </li>
          <li><a href='#'>Accueil</a></li>
          <li><a href='#'>Discover</a></li>
          <li><a href='#'>Recette du monde</a></li>
          <li><a href='#'>Healthy</a></li>
          <li><a href='#'>Videos</a></li>
        </ul>
      </section>
    )}
    </header>
      
    </>
  );
};

export default Header;