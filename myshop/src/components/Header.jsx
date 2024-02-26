import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoPersonOutline  } from "react-icons/io5";
import { FaRegHeart  } from "react-icons/fa";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { VscColorMode } from "react-icons/vsc";
import { ThemeContext } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';


const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { totalItems } = useContext(CartContext);
    const { searchText, toggleText } = useSearch();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    
    const handleInputChange = (e) => {
        console.log(e.target.value)
        toggleText(e.target.value);
    };
    
    // destructuring from ThemeContext
    const { theme, toggleTheme } = useContext(ThemeContext);


    const styles = {
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
    }
    const linkStyles = {
        color: theme === 'light' ? 'black' : 'white',
    }

    return (
        <header style={styles}>
            <div id="header-logo">
                <Link to="/" >MiTienda</Link>
            </div>

            <div id="menu-container" className={isMenuOpen ? "open" : ""} style={styles}>
                <IoMdClose id="close-menu" onClick={toggleMenu} style={linkStyles}/>
                <a style={linkStyles}>CATEGORÍAS</a>
                <a style={linkStyles}>OFERTAS</a>
                <a style={linkStyles}>CONTACTO</a>
                
                <div id="search-bar">
                    <input type="text" value={searchText} placeholder="Buscar..." onChange={handleInputChange}/>
                </div>
                
                <div id="nav-icons" className={isMenuOpen ? "mobile-icons" : ""}>
                    <FaRegHeart />
                    <Link to="/login"><IoPersonOutline/></Link>
                    <VscColorMode onClick={toggleTheme}/>
                    <Link to="/cart"> <MdOutlineShoppingCart/></Link>
                    {totalItems > 0 && <span className="item-count">{totalItems}</span>}
                </div>
            </div>

            <div id="nav-links">
                <a>CATEGORÍAS</a>
                <a>OFERTAS</a>
                <a>CONTACTO</a>
            </div>

            <div id="search-bar">
                <input type="text" value={searchText} placeholder="Buscar..." onChange={handleInputChange}/>
            </div>

            <div id="nav-icons">
                <FaRegHeart />
                <Link to="/login"><IoPersonOutline/></Link>
                <VscColorMode onClick={toggleTheme}/>
                <Link to="/cart"> <MdOutlineShoppingCart/></Link>
                {totalItems > 0 && <span className="item-count">{totalItems}</span>}
            </div>

            <IoMdMenu  id="menu-toggle" onClick={toggleMenu}/>
        </header>
    )
}
export default Header;