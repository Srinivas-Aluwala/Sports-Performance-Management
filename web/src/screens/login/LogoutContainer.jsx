import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/store";
import { pages } from "../../routes/pages";

const LogoutContainer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
  
    const navReff = useRef({ navigate });
  

    const logoutFunc = async () => {
        console.log("logout initiated ");
        
        const res  =await fetch('http://localhost:9000/logout', {
      method: 'POST',
      credentials: 'include', 
    });
  
            console.log(res);

        if(res.ok){
        console.log("logout sucess ");

        dispatch(logout());
           localStorage.removeItem("user")
        navReff.current.navigate(pages.root.children.home.path);
        }else{
            alert("logout failed")
                    navReff.current.navigate(pages.root.children.home.path);

        }
    }

    useEffect(()=>{
        logoutFunc();
    }, []);

    return (<>
    </>)
}
export default LogoutContainer;