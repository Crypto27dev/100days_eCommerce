import "./Cart.css";
import CartItemCard from "../cart-item-card";
import { useSelector, useDispatch } from "react-redux";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import {
    addItemsToCart, removeItemsFromCart
} from "../../../../redux/actions/cartAction";
import MetaData from '../../../layout/MetaData';
import AppWrap from "../../../hoc/AppWrap";


function Cart() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    };

    return (
        <div className="app__top-margin">

            <MetaData title={`Cart - NixLab Shop`} />

            {
                cartItems.length === 0 ?
                    <div className="emptyCart">
                        <RemoveShoppingCartIcon />

                        <p style={{
                            marginTop: 10
                        }}>No Product in Your Cart</p>
                        <Link to="/products">View Products</Link>
                    </div>
                    :
                    <div className="flex-container">
                        <div className="app__cart-container">

                            <div className="cart-items">

                                <div className="box-header">
                                    <p>My Cart {`(${cartItems.length})`}</p>
                                </div>

                                {cartItems &&
                                    cartItems.map((item) => (
                                        <div key={item.product}
                                            className="item-container"
                                        >
                                            <CartItemCard
                                                item={item}
                                                deleteCartItems={deleteCartItems}
                                            />

                                            {/* <p className="cartSubtotal">
                                                {`₹${item.price * item.quantity}`}
                                            </p> */}

                                            {/* <div className="cartInput">
                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(item.product, item.quantity)
                                                    }
                                                >
                                                    -
                                                </button>
                                                <input type="number" value={item.quantity} readOnly />
                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(
                                                            item.product,
                                                            item.quantity,
                                                            item.stock
                                                        )
                                                    }>
                                                    +
                                                </button>
                                            </div> */}

                                        </div>
                                    ))}

                            </div>

                            <div className="cart-amount-box">

                                <div className="box-header">
                                    <p>Price Details</p>
                                </div>

                                <div className="">
                                    <p>Gross Total</p>
                                    <p>{`₹${cartItems.reduce(
                                        (acc, item) => acc + item.quantity * item.price,
                                        0
                                    )}`}</p>
                                </div>

                                <div style={{
                                    margin: "1rem"
                                }}>
                                    <button className="rounded-filled-btn"
                                        onClick={checkoutHandler}>
                                        Place Order
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>
            }

        </div>
    )
}

export default AppWrap(Cart);
