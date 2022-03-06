import "./OrderSuccess.css";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

function OrderSuccess() {
    return (
        <div className="orderSuccess">
            <CheckCircleIcon />

            <p>Your Order has been Placed successfully </p>
            <Link to="/orders">View Orders</Link>
        </div>
    );
};

export default OrderSuccess;