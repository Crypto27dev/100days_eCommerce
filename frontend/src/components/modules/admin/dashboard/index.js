import '../Dashboard.css';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
} from 'chart.js';
import { getAdminProduct } from '../../../../redux/actions/productAction';
import { getAllOrders } from '../../../../redux/actions/orderAction';
import { getAllUsers } from '../../../../redux/actions/userAction';
import Sidebar from '../sidebar';
import MetaData from '../../../layout/MetaData';
import AppWrap from '../../../hoc/AppWrap';


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
);

function Dashboard() {

    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    const { orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);

    let outOfStock = 0;

    const options = {
        responsive: true,
    };

    products &&
        products.forEach((item) => {
            if (item.Stock === 0) {
                outOfStock += 1;
            }
        });

    let totalAmount = 0;
    orders &&
        orders.forEach((item) => {
            totalAmount += item.totalPrice;
        });

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmount],
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };

    useEffect(() => {

        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());

        return () => { }

    }, [
        dispatch
    ]);

    return (
        <div className='app__top-margin'>

            <div className="app__dashboard">

                <MetaData title="Admin Panel - Nixlab Shop" />

                <Sidebar />

                <div className="app__dashboard-container">

                    <div className="title">
                        Dashboard
                    </div>

                    <div className="dashboardSummary">
                        <div>
                            <p>
                                Total Amount <br /> ₹{totalAmount}
                            </p>
                        </div>
                        <div className="dashboardSummaryBox2">
                            <Link to="/admin/products">
                                <p>Product</p>
                                <p>{products && products.length}</p>
                            </Link>
                            <Link to="/admin/orders">
                                <p>Orders</p>
                                <p>{orders && orders.length}</p>
                            </Link>
                            <Link to="/admin/users">
                                <p>Users</p>
                                <p>{users && users.length}</p>
                            </Link>
                        </div>
                    </div>

                    <div className="lineChart">
                        <Line options={options} data={lineState} />
                    </div>

                    <div className="doughnutChart">
                        <Doughnut data={doughnutState} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AppWrap(Dashboard);
