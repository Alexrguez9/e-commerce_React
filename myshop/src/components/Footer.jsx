import "./Footer.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const styles = {
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
    }
    const textStyles = {
        color: theme === 'light' ? 'black' : 'white',
    }

    return (
        <footer style={styles}>
            <div id="content">
                <div id="contact" style={textStyles}>
                    <h2>Contacto</h2>
                    <a href="" style={textStyles}>Email: info@mitienda.com</a>
                    <a href="" style={textStyles}>Teléfono: +34 123 456 789</a>
                </div>
                <div id="social" style={textStyles}>
                    <h2>Redes Sociales</h2>
                    <a href="" style={textStyles}>Facebook</a>
                    <a href="" style={textStyles}>Twitter</a>
                    <a href="" style={textStyles}>Instagram</a>
                </div>
                <div id="location" style={textStyles}>
                    <h2>Dirección</h2>
                    <a href="" style={textStyles}>Calle Falsa, 123</a>
                    <a href="" style={textStyles}>Código Postal: 12345</a>
                    <a href="" style={textStyles}>Ciudad, País</a>
                </div>
            </div>
        <p>© Alejandro Rodríguez 2024</p>
        </footer>
    );
}
export default Footer;