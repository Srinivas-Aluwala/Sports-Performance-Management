import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { pages } from './pages';
import PrivateRoute from './PrivateRoute';
import { Suspense } from 'react';


function generateRoutes(pagesObj) {

    return Object.values(pagesObj).map((page) => {

        const route = {
            path: page.path,
            element: page.private ? (
                <PrivateRoute component={page.element} accessibleRoles={page.roleId} />
            ) : (
                page.element
            )
        };

        if (page.children) {
            route.children = generateRoutes(page.children);
        }

        return route;
    })
}

console.log(generateRoutes(pages));

const router = createBrowserRouter(generateRoutes(pages));

const AppRoutes = () => {
    return    (<>
        <Suspense fallback={<div>Loading...</div>}>

        <RouterProvider router={router} />
        </Suspense>
    </>) 
;
}
export default AppRoutes;