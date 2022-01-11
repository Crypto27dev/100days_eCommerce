import './Home.css';
import { useEffect } from 'react';
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearErrors } from '../../redux/actions/productAction';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';

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
            paddingBottom: 60
        }}>

            <MetaData title="Ecommerce" />

            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href='#container'>
                    <button>
                        Scroll
                    </button>
                </a>
            </div>

            <div className="homeHeading">
                Featured Products
            </div>

            <div className="container" id='container'>
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

        </div>
    )
}

export default Home;
