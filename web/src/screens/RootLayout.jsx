import { Outlet, replace, useLocation, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import { Suspense, useEffect, useRef } from "react";
import { pages } from "../routes/pages";

const RootLayout = () => {
      const location = useLocation();
      const navigate = useNavigate();

      const navReff = useRef({ navigate });

      useEffect(() => {
            if (
                  location.pathname === pages.root.path ) {
                  navReff.current.navigate(pages.root.children.home.path);
            }
      }, [location.pathname]);



      return (<>
            <div className="flex flex-col min-h-screen">

                  <Header />
                  <Suspense fallback={<div>Loading...</div>}>

                        <Outlet />
                  </Suspense>
            </div>
      </>)
}
export default RootLayout;