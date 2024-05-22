/* eslint-disable react/no-unescaped-entities */
import "./Footer.css";
import { RiFacebookCircleLine } from "react-icons/ri";
import { LuInstagram } from "react-icons/lu";
import { FaPinterestP } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import logo from "../../assets/images/LOGO/LOGO-nav .png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <aside className="social-media">
        <h1 className="h1-social-media">Suivez-nous</h1>
        <RiFacebookCircleLine className="facebook" />
        <LuInstagram className="instagram" />
        <FaPinterestP className="pinterest" />
        <FaTiktok className="tiktok" />
      </aside>
      <aside className="register-footer">
        <h1 >Ne manquez aucune recette - inscrivez-vous pour rester à jour !</h1>
        <NavLink
          to={"/enregistrement"}
          className="sign-in-footer"
          onClick={() => window.scrollTo(0, 0)}
        >
          je m'inscris
        </NavLink>
      </aside>

      <aside className="logo-footer-aside">
        <NavLink to={"/#top"} onClick={() => window.scrollTo(0, 0)}>
          <img src={logo} alt="logo-blog-home-made" className="logo-footer" />
        </NavLink>
      </aside>
    </footer>
  );
};

export default Footer;
