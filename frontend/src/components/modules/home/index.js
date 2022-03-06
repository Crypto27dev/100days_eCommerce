import { TraverseRoutes } from "../../route";
import { lazy } from "react";

const Home = lazy(() => import('./Home'))

const routes = [
    {
        path: '',
        element: <Home />
    }
]

const HomeModule = () => <TraverseRoutes routes={routes} />;

export default HomeModule;