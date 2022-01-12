import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import Loader from "../layout/loader/Loader";

function ProtectedRoute({ children, isAdmin }) {

    const location = useLocation();

    const { isAuthenticated, loading, user } = useSelector((state) => state.user);


    if (loading === false) {
        if (isAuthenticated === false) {
            return (
                <Navigate
                    to="/login"
                    replace
                    state={{ from: location }}
                />
            )
        }

        if (isAuthenticated === true && isAdmin === true && user.role !== "admin") {
            return (
                <Navigate
                    to="/login"
                    replace
                />
            )
        }

        return (children)
    }

    return <Loader fullScreen={true} />;

}

export default ProtectedRoute;
