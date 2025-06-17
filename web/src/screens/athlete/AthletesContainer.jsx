import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { pages } from "../../routes/pages";
import { useEffect, useRef } from "react";

const AthletesContainer = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const navReff = useRef({navigate});

   useEffect(()=>{

    if(location.pathname === pages.root.children.athletes.path){
        navReff.current.navigate(pages.root.children.athletes.children.home.path)
    }
   },[location.pathname])


    return (<>
   <Outlet />
    </>)
}
export default AthletesContainer;