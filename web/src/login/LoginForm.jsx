import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, FormRadio, Input, Select } from "semantic-ui-react";
import { pages } from "../routes/pages";
import { useDispatch } from "react-redux";
import { login } from "../store/store";
import { roleIds } from "../util/roles";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/apis";



function LoginForm() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [userType, setUserType] = useState("");


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const UsernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const PasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const {
    data: loginData,
    error: loginError,
    isError: isLoginError,
    isPending: isLoginPending,
    isSuccess: isLoginSuccess,
    failureReason: loginFailureReason,
    mutate: loginMutate,
  } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data, variables, context) => {

      const roleId = data.roles[0].roleId;

      console.log(data.roles);

      switch (roleId) {

        case roleIds.ADMIN: {
          dispatch(login({ roleId: roleIds.ADMIN }));

          localStorage.setItem("user", JSON.stringify({
            isUserLoggedIn: true,
            loggedInUser: roleIds.ADMIN
          }))
          navigate(pages.root.children.admin.path, { replace: true });
        };
        case roleIds.COACHE: {
          dispatch(login({ roleId: roleIds.COACHE }));
          localStorage.setItem("user", JSON.stringify({
            isUserLoggedIn: true,
            loggedInUser: roleIds.COACHE
          }))
          navigate(pages.root.children.coache.path, { replace: true });
        };
        case roleIds.ATHLETE: {
          dispatch(login({ roleId: roleIds.ATHLETE }));
          localStorage.setItem("user", JSON.stringify({
            isUserLoggedIn: true,
            loggedInUser: roleIds.ATHLETE
          }))
          navigate(pages.root.children.athlete.path, { replace: true });
        };
        default: return;

      }



    },
    onError: () => {
      alert("Error logging in")
    }
  })


  const loginHandler = async () => {
    console.log(username, password);

     loginMutate({ username, password })

    // try{


    //       const res = await  fetch("http://localhost:9000/login", {
    //   method: "POST",
    //   credentials: "include", 
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username, password })
    // });


    //   if (!res.ok) {
    //     const err = await res.text();
    //     throw new Error(`Login failed: ${err}`);
    //   }

    //   const data = await res.json(); 

    //   console.log(data); 


    //       dispatch(login({roleId : roleIds.ADMIN}))
    //      localStorage.setItem("user", JSON.stringify({
    //   isUserLoggedIn: true,
    //   loggedInUser: roleIds.ADMIN
    //     }))

    //     }
    //     catch(error){
    //       alert(error)
    //     }





    if (username === "admin" && password === "admin") {
      dispatch(login({ roleId: roleIds.ADMIN }))
      localStorage.setItem("user", JSON.stringify({
        isUserLoggedIn: true,
        loggedInUser: roleIds.ADMIN
      }))
      navigate(pages.root.children.admin.path, { replace: true });

    } 

    //    if (username === "coache" && password === "coache") {
    //   dispatch(login({roleId : roleIds.COACHE}))

    //   navigate(pages.root.children.coache.path, {replace : true});

    // } else if (username === "athlete" && password === "athlete") {
    //   dispatch(login({roleId : roleIds.ATHLETE}))

    //   navigate(pages.root.children.athlete.path, {replace : true});

    // }
  };

  const handleRadio = (e,{value}) => {
    setUserType(value);
  }
  return (
    <>
      <div className="flex flex-grow  items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Login
          </h2>
          <div className="mb-4">
            <Input
              fluid
              placeholder="Username"
              onChange={UsernameChangeHandler}
              className="!w-full"
            />
          </div>

          <div className="mb-6">
            <Input
              fluid
              type="password"
              placeholder="Password"
              onChange={PasswordChangeHandler}
              className="!w-full"
            />
          </div>



          <Button fluid secondary content="Login" onClick={loginHandler} />

        </div>
      </div>

    </>
  );
}

export default LoginForm;
