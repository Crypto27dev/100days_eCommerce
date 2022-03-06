import './Home.css';
import { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { getProducts, clearErrors } from '../../../../redux/actions/productAction';
import Loader from '../../../layout/loader/Loader';
import MetaData from '../../../layout/MetaData';
import AppWrap from '../../../hoc/AppWrap';


function Home() {

    const dispatch = useDispatch();

    const alert = useAlert();

    const {
        loading, error, products
    } = useSelector(state => state.products);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProducts());
        return () => { }
    }, [
        dispatch, error, alert
    ])

    return (
        <div style={{
            marginTop: 80,
            marginBottom: 60
        }}>

            <MetaData title="Welcome to NixLab Shop" />

            {/* <div className="category-area">

                {
                    categories.map((cat, i) => (
                        <div key={i}
                            className='category-item'>
                            {cat.name}
                        </div>
                    ))
                }

            </div> */}

            <div className="homeHeading">
                Featured Products
            </div>

            <div className="customContainer"
            >
                {
                    loading ?
                        <Loader />
                        :
                        products.map((product, i) => {
                            return <ProductCard
                                key={i}
                                product={product}
                            />
                        })
                }
            </div>

            <Link style={{
                textAlign: "center",
                display: "block",
                margin: "20px auto",
                marginBottom: 0,
                fontWeight: 700
            }}
                to='/products'
            >
                View more
            </Link>

        </div>
    )
}

export default AppWrap(Home);
