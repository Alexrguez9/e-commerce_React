import './Discount.css';

const Discount = () => {
    const discount = 20;

    return (
        <div className="discount-block">
            <p>¡{discount}% de descuento para nuevos clientes!</p>
        </div>
    );
}
export default Discount;