import '../Product.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '@mui/material';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import AppWrap from '../../../hoc/AppWrap';
import { getProducts, clearErrors } from '../../../../redux/actions/productAction';
import Loader from '../../../layout/loader/Loader';
import MetaData from '../../../layout/MetaData';
import ProductCard from '../../../common/product-card';


const categories = [
    "All",
    "Laptop",
    "Mobile Phone",
    "Men's Wear",
    "Women's Wear",
    "Accessories",
    "Camera"
];

const Products = () => {

    const dispatch = useDispatch();

    const {
        loading,
        error,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
    } = useSelector(state => state.products);

    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 500000]);
    const [category, setCategory] = useState(categories[0]);
    const [ratings, setRatings] = useState(0);

    const { keyword } = useParams();

    const setCurrentPageNo = (e, v) => {
        setCurrentPage(v);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    let count = filteredProductsCount;

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProducts(keyword, currentPage, price, category, ratings));
        return () => { }
    }, [
        dispatch, error, alert, keyword,
        currentPage, price, category, ratings
    ])

    return (
        <div className='app__top-margin'>

            <MetaData title="All Products - NixLab Shop" />

            <div className="flex-container">

                <div className='product-details-container'>

                    <div className="filter-box">

                        <div className="price-filter">

                            <h2>
                                Price Between
                            </h2>

                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={500000}
                            />

                        </div>

                        <div className='category-filter'>

                            <h2>
                                Categories
                            </h2>

                            <ul className="categoryBox">
                                {categories.map((category) => (
                                    <li
                                        className="category-link"
                                        key={category}
                                        onClick={() => setCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>

                        </div>

                        <div className='rating-filter'>

                            <h2>
                                Ratings Above
                            </h2>

                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />

                        </div>

                    </div>

                    <div className="product-list-container">
                        {
                            loading ?
                                <div style={{
                                    margin: "1rem"
                                }}>
                                    <Loader />
                                </div>
                                :
                                products &&
                                products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product} />
                                ))

                        }

                    </div>

                </div>

                {
                    (resultPerPage < count) &&
                    <Pagination
                        count={Math.ceil(productsCount / resultPerPage)}
                        onChange={setCurrentPageNo}
                    />
                }

            </div>

        </div>
    )
}

export default AppWrap(Products);
