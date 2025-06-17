import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/store";
import { pages } from "../../routes/pages";

const LogoutContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
  
    const navReff = useRef({ navigate });
  
    useEffect(() => {
           dispatch(logout());
           localStorage.removeItem("user")
        navReff.current.navigate(pages.root.children.home.path);
      
    }, []);

    return (<>
    </>)
}
export default LogoutContainer;