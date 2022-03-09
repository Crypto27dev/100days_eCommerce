import { Link } from "react-router-dom";

function CartItemCard({ item, deleteCartItems }) {
    return (
        <div className="cart-item-card">

            <div className="item-img">
                <img src={item.image} alt="img" />
            </div>

            <div className="details">
                <Link to={`/products/${item.product}`}>{item.name}</Link>
                <span>{`₹${item.price * item.quantity}`}</span>
                <p onClick={() => deleteCartItems(item.product)}>Remove</p>
            </div>

        </div>
    )
}

export default CartItemCard;
