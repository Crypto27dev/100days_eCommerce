import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';

function ProductCard({ product }) {

    const navigate = useNavigate();

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <div className='product-card'
            onClick={() => navigate(`/products/${product._id}`)}
        >
            <img className='product-img'
                src={product.images[0].url}
                alt={product.name}
                loading="lazy"
            />

            <p>{product.name}</p>

            <Rating {...options} />

            <span className='price'
            >
                {`₹${product.price}`}
            </span>

        </div>
    )
}

export default ProductCard;
