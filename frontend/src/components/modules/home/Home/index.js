import './Home.css';
import { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
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
        <div className='app__top-margin'>

            <MetaData title="Welcome to NixLab Shop" />

            <div className="flex-container">

                <div className="head-text">
                    Featured Products
                </div>

                <div className="product-list-container"
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

            </div>

        </div>
    )
}

export default AppWrap(Home);
