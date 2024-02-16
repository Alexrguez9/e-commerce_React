import { useContext } from 'react';
import { useAuth } from "../context/AuthContext";
import './Discount.css';


const Discount = () => {
    const { user } = useAuth();
    


    return (
        <div className="discount-block">
            {user ? 
                <p>¡{user.name} aprovéchate de tu 20 % de descuento!</p> 
                : <p>crea una cuenta para disfrutar de nuestros descuentos</p>}
        </div>
    );
}
export default Discount;