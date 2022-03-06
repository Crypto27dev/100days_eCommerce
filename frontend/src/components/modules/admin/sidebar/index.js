import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";


function Sidebar({ active }) {

    const navigate = useNavigate();

    return (
        <div className="app__sidebar">

            <div className={active === "dashboard" ? "sidebar-item selected" : "sidebar-item"}
                onClick={
                    () => navigate("/admin/dashboard")
                }
            >
                <DashboardIcon /> Dashboard
            </div>

            <div className={active === "products" ? "sidebar-item selected" : "sidebar-item"}
                onClick={
                    () => navigate("/admin/products")
                }
            >
                <ImportExportIcon /> Products
            </div>

            <div className={active === "orders" ? "sidebar-item selected" : "sidebar-item"}
                onClick={
                    () => navigate("/admin/orders")
                }
            >
                <ListAltIcon /> Orders
            </div>

            <div className={active === "users" ? "sidebar-item selected" : "sidebar-item"}
                onClick={
                    () => navigate("/admin/users")
                }
            >
                <PeopleIcon /> Users
            </div>

            <div className={active === "reviews" ? "sidebar-item selected" : "sidebar-item"}
                onClick={
                    () => navigate("/admin/reviews")
                }
            >
                <RateReviewIcon /> Reviews
            </div>

        </div>
    )
}

export default Sidebar;
