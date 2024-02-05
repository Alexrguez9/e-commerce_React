import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div id="content">
                <div id="contact">
                    <h2>Contacto</h2>
                    <a href="">Email: info@mitienda.com</a>
                    <a href="">Teléfono: +34 123 456 789</a>
                </div>
                <div id="social">
                    <h2>Redes Sociales</h2>
                    <a href="">Facebook</a>
                    <a href="">Twitter</a>
                    <a href="">Instagram</a>
                </div>
                <div id="location">
                    <h2>Dirección</h2>
                    <a href="">Calle Falsa, 123</a>
                    <a href="">Código Postal: 12345</a>
                    <a href="">Ciudad, País</a>
                </div>
            </div>
        <p>© Alejandro Rodríguez 2024</p>
        </footer>
    );
}
export default Footer;