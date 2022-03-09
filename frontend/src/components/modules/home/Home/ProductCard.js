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
        <Link className='product-card'
            to={`/products/${product._id}`}
        >
            <img className='product-img'
                src={product.images[0].url}
                alt={product.name}
                loading="lazy"
            />

            <p>{product.name}</p>

            <Rating {...options} />

            <span>{`₹${product.price}`}</span>

        </Link>
    )
}

export default ProductCard;
