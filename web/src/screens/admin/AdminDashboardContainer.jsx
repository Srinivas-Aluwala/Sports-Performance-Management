import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { pages } from "../../routes/pages";

const AdminDashboardContainer = () => {
    
    const location = useLocation();
  const navigate = useNavigate();

  const navReff = useRef({ navigate });

  useEffect(() => {    
    if (
      location.pathname === (pages.root.children.admin.path ||
      pages.root.children.admin.path + "/" + pages.root.children.admin.children.dashboard.path)
    ) {
      console.log(pages.root.children.admin.path + "/" + pages.root.children.admin.children.dashboard.path);
      console.log(location.pathname);
      console.log(
      location.pathname === pages.root.children.admin.path ||
      pages.root.children.admin.path + "/" + pages.root.children.admin.children.dashboard.path
   );
      navReff.current.navigate(pages.root.children.admin.children.dashboard.path);
    }
  }, [location.pathname]);

    return (<>
    <Outlet />
    </>)
}
export default AdminDashboardContainer;