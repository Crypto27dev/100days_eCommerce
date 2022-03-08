import './ProductDetails.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { useAlert } from "react-alert";
import Rating from '@mui/material/Rating';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@mui/material';
import {
    getProductDetails, clearErrors, newReview
} from '../../../../redux/actions/productAction';
import {
    addItemsToCart
} from '../../../../redux/actions/cartAction';
import { NEW_REVIEW_RESET } from '../../../../redux/constants/productConstants';
import Loader from '../../../layout/loader/Loader';
import MetaData from '../../../layout/MetaData';
import ReviewCard from '../../../common/ReviewCard';
import AppWrap from '../../../hoc/AppWrap';


function ProductDetails() {

    const { token } = useSelector((state) => state.user);
    const { product, loading, error } = useSelector(state => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);

    const dispatch = useDispatch();
    const alert = useAlert();

    const { id } = useParams();

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity, token));
        alert.success("Item Added To Cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm, token));

        setOpen(false);
    };

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }

        if (id) {
            dispatch(getProductDetails(id));
        }

        return () => { }
    }, [
        dispatch, id, error, alert,
        reviewError, success
    ])

    return (
        <div className='app__top-margin'>
            {
                loading ?
                    <Loader fullScreen={true} />
                    :
                    <div>
                        <MetaData title={`${product.name} -- Ecommerce`} />

                        <div className="ProductDetails">
                            <div>
                                <Carousel
                                    stopAutoPlayOnHover
                                    interval={5000}
                                >
                                    {
                                        product.images &&
                                        product.images.map((item, i) => {

                                            return (
                                                <img
                                                    className='CarouselImage'
                                                    key={i}
                                                    src={item.url}
                                                    alt={`${i} Slide`}
                                                />
                                            )

                                        })
                                    }
                                </Carousel>
                            </div>

                            <div>
                                <div className="detailsBlock-1">
                                    <h2>{product.name}</h2>
                                    <p>Product # {product._id}</p>
                                </div>

                                <div className="detailsBlock-2">
                                    <Rating {...options} />
                                    <span className="detailsBlock-2-span">
                                        {" "}
                                        ({product.numOfReviews} Reviews)
                                    </span>
                                </div>

                                <div className="detailsBlock-3">
                                    <h1>{`₹${product.price}`}</h1>
                                    <div className="detailsBlock-3-1">
                                        <div className="detailsBlock-3-1-1">
                                            <button onClick={decreaseQuantity}>-</button>
                                            <input readOnly type="number" value={quantity} />
                                            <button onClick={increaseQuantity}>+</button>
                                        </div>
                                        <button
                                            disabled={product.Stock < 1 ? true : false}
                                            onClick={addToCartHandler}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>

                                    <p>
                                        Status:
                                        <b style={{
                                            color: product.Stock < 1 ? "red" : "green"
                                        }}>
                                            {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                        </b>
                                    </p>
                                </div>

                                <div className="detailsBlock-4">
                                    Description : <p>{product.description}</p>
                                </div>

                                <button
                                    onClick={submitReviewToggle}
                                    className="submitReview">
                                    Submit Review
                                </button>

                            </div>

                        </div>

                        <h3 className="reviewsHeading">REVIEWS</h3>

                        <Dialog
                            aria-labelledby="simple-dialog-title"
                            open={open}
                            onClose={submitReviewToggle}
                        >
                            <DialogTitle>Submit Review</DialogTitle>
                            <DialogContent className="submitDialog">
                                <Rating
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    size="large"
                                />

                                <textarea
                                    className="submitDialogTextArea"
                                    cols="30"
                                    rows="5"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitReviewToggle} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={reviewSubmitHandler} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {product.reviews && product.reviews[0] ? (
                            <div className="reviews">
                                {product.reviews &&
                                    product.reviews.map((review) => (
                                        <ReviewCard key={review._id} review={review} />
                                    ))}
                            </div>
                        ) : (
                            <p className="noReviews">No Reviews Yet</p>
                        )}

                    </div>
            }

        </div>
    )
}

export default AppWrap(ProductDetails);
