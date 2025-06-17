import { Navigate, useLoaderData, useLocation } from "react-router-dom";
import { pages } from "./pages";
import { useSelector } from "react-redux";


const PrivateRoute = ({ accessibleRoles, component }) => {

    const location = useLocation();
    const loggedInUser = useSelector((state) => state.auth.loggedInUser);

    console.log(accessibleRoles, loggedInUser);
        console.log(location.pathname, loggedInUser);


    const hasAccess = (roles) => {
        return roles === loggedInUser;
    };

    const isUserValid = hasAccess(accessibleRoles);


    if (isUserValid) {
        return (<>
            <main>
                {component}
            </main>
        </>)
    } else {
        return (<>
            <Navigate to={pages.root.children.home.path} state={{ from: location }} replace />
        </>)
    }
}
export default PrivateRoute;
