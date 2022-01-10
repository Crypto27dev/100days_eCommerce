import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const location = useLocation();

    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    return (
        (isAuthenticated && !loading && user) ?
            children :
            <Navigate
                to="/login"
                replace
                state={{ path: location.pathname }}
            />

    )
}

export default ProtectedRoute;
