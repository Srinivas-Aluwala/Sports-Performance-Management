import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { pages } from "../../routes/pages";

const AthleteDashboardContainer = () => {
  
    
  const location = useLocation();
  const navigate = useNavigate();

  const navReff = useRef({ navigate });

  useEffect(() => {    
    if (
      location.pathname === (pages.root.children.athlete.path ||
      pages.root.children.athlete.path + "/" + pages.root.children.athlete.children.dashboard.path)
    ) {
      navReff.current.navigate(pages.root.children.athlete.children.dashboard.path);
    }
  }, [location.pathname]);

    return (<>
        <h1>Athlete Dashboard Container</h1>
        <Outlet />
    </>
    )
}
export default AthleteDashboardContainer;