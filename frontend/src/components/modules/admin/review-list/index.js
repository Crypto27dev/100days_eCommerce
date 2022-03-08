import '../Dashboard.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import { MdStar } from 'react-icons/md';
import { DELETE_REVIEW_RESET } from "../../../../redux/constants/productConstants";
import {
    clearErrors,
    getAllReviews,
    deleteReviews
} from "../../../../redux/actions/productAction";
import MetaData from "../../../layout/MetaData";
import SideBar from "../sidebar";
import AppWrap from '../../../hoc/AppWrap';


function ProductReviewList() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.review
    );

    const { error, reviews, loading } = useSelector(
        (state) => state.productReviews
    );

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId));
    };

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    };

    const columns = [

        {
            field: "id",
            headerName: "Review ID",
            minWidth: 200,
            flex: 0.5
        },

        {
            field: "user",
            headerName: "User",
            minWidth: 200,
            flex: 0.6,
        },

        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1,
        },

        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 180,
            flex: 0.4,

            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3
                    ? "greenColor"
                    : "redColor";
            },
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <button
                            onClick={() =>
                                deleteReviewHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon />
                        </button>
                    </>
                );
            },
        },
    ];

    const rows = [];

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                user: item.name,
            });
        });

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Review Deleted Successfully");
            navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }

        return () => { }

    }, [
        dispatch, alert, error, deleteError,
        navigate, isDeleted, productId
    ]);

    return (
        <div className='app__top-margin'>

            <MetaData title={`Reviews - Admin Panel`} />

            <div className="app__dashboard">

                <SideBar active={"products"} />

                <div className="app__dashboard-container">

                    <div className='title'>
                        Reviews
                    </div>

                    <form
                        className="app__flex-card"
                        onSubmit={productReviewsSubmitHandler}
                    >
                        <div>
                            <MdStar />
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <button
                            id="createProductBtn"
                            type="submit"
                            disabled={
                                loading ? true : false || productId === "" ? true : false
                            }
                        >
                            Search
                        </button>
                    </form>

                    {reviews && reviews.length > 0 ? (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="custom-list-table"
                        />
                    ) : (
                        <h1>No Reviews Found</h1>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AppWrap(ProductReviewList);
