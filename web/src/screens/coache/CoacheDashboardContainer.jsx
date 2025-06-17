import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { pages } from "../../routes/pages";

const CoacheDashboardContainer = () => {
    
     const location = useLocation();
     const navigate = useNavigate();
   
     const navReff = useRef({ navigate });
   
     useEffect(() => {            
       if (
         location.pathname === (pages.root.children.coache.path ||
         pages.root.children.coache.path + "/" + pages.root.children.coache.children.dashboard.path)
       ) {
         navReff.current.navigate(pages.root.children.coache.children.dashboard.path);
       }
     }, [location.pathname]);
   
       return (<>
           <h1>Coache Dashboard Container</h1>
           <Outlet />
       </>
       )
}
export default CoacheDashboardContainer;