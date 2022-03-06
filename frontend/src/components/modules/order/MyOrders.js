import './MyOrders.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import Loader from "../../layout/loader/Loader";
import LaunchIcon from "@mui/icons-material/Launch";
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from "@mui/material";
import { clearErrors, myOrders } from "../../../redux/actions/orderAction";

function MyOrders() {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
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
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>
                );
            },
        },
    ];
    const rows = [];

    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());

        return () => { }

    }, [dispatch, alert, error]);

    return (
        <div style={{
            marginTop: 80
        }}>

            <MetaData title={`${user.name} - Orders`} />

            {
                loading ?
                    <Loader fullScreen={true} /> :
                    <div className="myOrdersPage">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="myOrdersTable"
                            autoHeight
                        />

                        <Typography
                            id="myOrdersHeading">
                            {user.name}'s Orders
                        </Typography>
                    </div>
            }

        </div>
    )
}

export default MyOrders;
