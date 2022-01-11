import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

function ProductCard({ product }) {

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <Link className='productCard' to={`/product/${product._id}`}>
            <img
                src={product.images[0].url}
                alt={product.name}
                loading="lazy"
            />

            <p>{product.name}</p>

            <Rating {...options} />

            <div>({product.numOfReviews} reviews)</div>

            <span>{`₹ ${product.price}`}</span>

        </Link>
    )
}

export default ProductCard;
