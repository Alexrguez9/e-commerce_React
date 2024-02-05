import './Header.css';
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoPersonOutline  } from "react-icons/io5";
import { FaRegHeart  } from "react-icons/fa";
import React, {useState} from 'react';
import { IoMdClose } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";

const Header = ({onSearchInputChange}) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const inputHandler = (e) => {
        onSearchInputChange(e.target.value);
      };
    return (
        <header>
            <div id="header-logo">
                <h1>MiTienda</h1>
            </div>

            <div id="menu-container" className={isMenuOpen ? "open" : ""}>
            <IoMdClose id="close-menu" onClick={toggleMenu}/>
                <a>INICIO</a>
                <a>CATEGORÍAS</a>
                <a>OFERTAS</a>
                <a>CONTACTO</a>
                
                <div id="search-bar" className={isMenuOpen ? "mobile-search-bar" : ""}>
                    <input type="text" onChange={inputHandler} placeholder="Buscar..."/>
                </div>
                <div id="nav-icons" className={isMenuOpen ? "mobile-icons" : ""}>
                    <MdOutlineShoppingCart />
                    <FaRegHeart />
                    <IoPersonOutline />
                </div>
            </div>

            <div id="nav-links">
                <a>INICIO</a>
                <a>CATEGORÍAS</a>
                <a>OFERTAS</a>
                <a>CONTACTO</a>
            </div>

            <div id="search-bar">
                <input type="text" onChange={inputHandler} placeholder="Buscar..."/>
            </div>

            <div id="nav-icons">
                <MdOutlineShoppingCart />
                <FaRegHeart />
                <IoPersonOutline />
            </div>

            <IoMdMenu  id="menu-toggle" onClick={toggleMenu}/>
        </header>
    )
}
export default Header;