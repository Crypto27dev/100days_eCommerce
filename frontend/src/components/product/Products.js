import './Products.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearErrors } from '../../redux/actions/productAction';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import ProductCard from '../home/ProductCard';
import { Slider } from '@mui/material';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { categories } from '../../assets/data/categoryData';


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
                    <Loader fullScreen />
                    :
                    <div className='custom-container'>

                        <MetaData title="Products -- Ecommerce" />
                        <h2 className="productsHeading">Products</h2>

                        <div className="custom-row">

                            <div className="filterBox">
                                <div className='typography'>
                                    Price Between
                                </div>
                                <Slider
                                    value={price}
                                    onChange={priceHandler}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={500000}
                                />

                                <div style={{
                                    marginTop: 20
                                }}>
                                    <div className='typography'
                                        style={{
                                            fontSize: 18,
                                            marginBottom: 10
                                        }}>
                                        Categories
                                    </div>
                                    <ul className="categoryBox">
                                        {categories.map((category) => (
                                            <li
                                                className="category-link"
                                                key={category.id}
                                                onClick={() => setCategory(category.name)}
                                            >
                                                {category.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{
                                    marginTop: 20
                                }}>
                                    <div className='typography'>
                                        Ratings Above
                                    </div>
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

                            <div className="products">
                                {products &&
                                    products.map((product) => (
                                        <ProductCard
                                            key={product._id}
                                            product={product} />
                                    ))}
                            </div>

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
