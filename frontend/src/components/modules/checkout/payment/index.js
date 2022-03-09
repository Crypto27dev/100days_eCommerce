import './Payment.css';
import { useEffect, useRef, useState } from 'react';
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { createOrder, clearErrors } from '../../../../redux/actions/orderAction';
import CheckoutSteps from '../checkout-steps';
import MetaData from '../../../layout/MetaData';
import Loader from '../../../layout/loader/Loader';
import AppWrap from '../../../hoc/AppWrap';


function Payment() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const [loading, setLoading] = useState(false);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;
        setLoading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;
                setLoading(false);

                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(createOrder(order));

                    setLoading(false);

                    navigate("/success");

                } else {
                    setLoading(false);
                    alert.error("There's some issue while processing payment ");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            setLoading(false);
            alert.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        return () => { }

    }, [dispatch, error, alert]);

    return (
        <div className='app__top-margin'>

            <MetaData title="Payment - NixLab Shop" />

            <CheckoutSteps activeStep={2} />

            <div className="flex-container">

                <form className="app__flex-card"
                    onSubmit={(e) => submitHandler(e)}
                >

                    <div className='form-control'>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>

                    <div className='form-control'>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>

                    <div className='form-control'>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    {
                        loading ?
                            <Loader />
                            :
                            <input
                                type="submit"
                                value={`Pay ₹${orderInfo && orderInfo.totalPrice}`}
                                ref={payBtn}
                                className="paymentFormBtn"
                            />
                    }

                </form>
            </div>

        </div>
    )
}

export default AppWrap(Payment);
