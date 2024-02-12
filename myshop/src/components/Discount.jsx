import { useContext } from 'react';
import { useUser } from "../context/UserContext";
import './Discount.css';


const Discount = () => {
    const { user } = useUser();
    


    return (
        <div className="discount-block">
            {user ? 
                <p>¡{user.name} aprovéchate de tu 20 % de descuento!</p> 
                : <p>crea una cuenta para disfrutar de nuestros descuentos</p>}
        </div>
    );
}
export default Discount;