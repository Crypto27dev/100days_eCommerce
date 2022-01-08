import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

function ProductCard({ product }) {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 768 ? 20 : 24,
        value: product.ratings,
        isHalf: true
    }

    return (
        <Link className='productCard' to={`/product/${product._id}`}>
            <img
                src={product.images[0].url}
                alt={product.name}
                loading="lazy"
            />

            <p>{product.name}</p>

            <ReactStars {...options} />

            <div>({product.numOfReviews} reviews)</div>

            <span>{`₹ ${product.price}`}</span>

        </Link>
    )
}

export default ProductCard;
