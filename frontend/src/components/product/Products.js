import './Products.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearErrors } from '../../redux/actions/productAction';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import ProductCard from '../home/ProductCard';
import { Typography, Slider } from '@mui/material';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';

const categories = [
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
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");

    const [ratings, setRatings] = useState(0);

    const { keyword } = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
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
        <div style={{
            marginTop: 80
        }}>

            {
                loading ?
                    <Loader />
                    :
                    <div>

                        <MetaData title="Products -- Ecommerce" />
                        <h2 className="productsHeading">Products</h2>

                        <div className="products">
                            {products &&
                                products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product} />
                                ))}
                        </div>

                        <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={25000}
                            />

                            <Typography>Categories</Typography>
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

                            <fieldset>
                                <Typography component="legend">Ratings Above</Typography>
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
                            </fieldset>
                        </div>

                        {resultPerPage < count && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )}

                    </div>
            }

        </div>
    )
}

export default Products;
