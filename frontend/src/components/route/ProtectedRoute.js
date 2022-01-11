import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const location = useLocation();

    const { isAuthenticated } = useSelector((state) => state.user);

    return (
        (isAuthenticated === false) ?
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
            :
            children
    )
}

export default ProtectedRoute;
