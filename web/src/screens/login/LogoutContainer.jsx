import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/store";
import { pages } from "../../routes/pages";
import { useMutation } from "@tanstack/react-query";
import { logoutRequest } from "../../api/authApis";

const LogoutContainer = () => {
    
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const navReff = useRef({ navigate });

    const {mutate } = useMutation({
        mutationFn : logoutRequest,
        onSuccess :  () => {
            dispatch(logout());   
                     
            navReff.current.navigate(pages.root.children.home.path);
        },
        onError : () => {
            alert("logout failed")
            navReff.current.navigate(pages.root.children.home.path);
        }
    })

    useEffect(() => {
        mutate();
    }, []);

    
    // const logoutFunc = async () => {
    //     console.log("logout initiated ");

    //     const res = await fetch('http://localhost:9000/logout', {
    //         method: 'POST',
    //         credentials: 'include',
    //     });

    //     console.log(res);

    //     if (res.ok) {
    //         dispatch(logout());
    //         navReff.current.navigate(pages.root.children.home.path);

    //     } else {
    //         alert("logout failed")
    //         navReff.current.navigate(pages.root.children.home.path);

    //     }
    // }

    // useEffect(() => {
    //     logoutFunc();
    // }, []);


    return (<>
    </>)
}
export default LogoutContainer;