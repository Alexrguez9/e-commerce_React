import React, {useState} from 'react';
import './Header.css';
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoPersonOutline  } from "react-icons/io5";
import { FaRegHeart  } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { VscColorMode } from "react-icons/vsc";

const Header = ({onSearchInputChange, onClickInicio, onClickCart, onClickProfile, cartItems}) => {
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
                <h1 onClick={onClickInicio}>MiTienda</h1>
            </div>

            <div id="menu-container" className={isMenuOpen ? "open" : ""}>
            <IoMdClose id="close-menu" onClick={toggleMenu}/>
                <a onClick={onClickInicio}>INICIO</a>
                <a>CATEGORÍAS</a>
                <a>OFERTAS</a>
                <a>CONTACTO</a>
                
                <div id="search-bar" className={isMenuOpen ? "mobile-search-bar" : ""}>
                    <input type="text" onChange={inputHandler} placeholder="Buscar..."/>
                </div>
                <div id="nav-icons" className={isMenuOpen ? "mobile-icons" : ""}>
                    <FaRegHeart />
                    <IoPersonOutline onClick={onClickProfile}/>
                    <VscColorMode />
                    <MdOutlineShoppingCart onClick={onClickCart}/>
                    {cartItems >= 0 && <span className="item-count">{cartItems}</span>}
                </div>
            </div>

            <div id="nav-links">
                <a onClick={onClickInicio}>INICIO</a>
                <a>CATEGORÍAS</a>
                <a>OFERTAS</a>
                <a>CONTACTO</a>
            </div>

            <div id="search-bar">
                <input type="text" onChange={inputHandler} placeholder="Buscar..."/>
            </div>

            <div id="nav-icons">
                <FaRegHeart />
                <IoPersonOutline onClick={onClickProfile}/>
                <VscColorMode />
                <MdOutlineShoppingCart onClick={onClickCart}/>
                {cartItems >= 0 && <span className="item-count">{cartItems}</span>}
            </div>

            <IoMdMenu  id="menu-toggle" onClick={toggleMenu}/>
        </header>
    )
}
export default Header;