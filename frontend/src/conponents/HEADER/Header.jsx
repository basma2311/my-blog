import './Header.css';
import { useState } from 'react';
import logo from '../../assets/images/logo.png'
import { Link, NavLink } from 'react-router-dom';


const Header = () => {
   const [showModal, setShowModal] = useState(false);

  return (
    <>
    <header>
      <img src={logo} alt="logo"/>
      <h1>Home Made</h1>
      <button
          onClick={() => setShowModal(true)}
          style={{ fontSize: '2rem' }}
          className={`menu icon-menu1 ${window.innerWidth >= 768 ? 'hidden' : ''}`}
        />

    {showModal &&(
        <nav className='fixed'>
        <ul className='modal'>
          <li>
            <button className='icon-remove'  onClick={()=>{setShowModal(false)}}/>
          </li>
          <li><a href='#'>Accueil</a></li>
          <li><a href='#'>Discover</a></li>
          <li><a href='#'>Recette du monde</a></li>
          <li><a href='#'>Healthy</a></li>
          <li><a href='#'>Videos</a></li>
        </ul>
      </nav>
    )}
    </header>
      
    </>
  );
};

export default Header;



