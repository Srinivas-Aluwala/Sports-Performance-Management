import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "semantic-ui-react";
import { pages } from "../routes/pages";
import { useDispatch } from "react-redux";
import { login } from "../store/store";
import { roleIds } from "../util/roles";

function LoginForm() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

    const dispatch = useDispatch()
  const navigate = useNavigate()
  const UsernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const PasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  
  const loginHandler = () => {
    console.log(username, password);
    
    if (username === "admin" && password === "admin") {
      dispatch(login({roleId : roleIds.ADMIN}))
     localStorage.setItem("user", JSON.stringify({
  isUserLoggedIn: true,
  loggedInUser: roleIds.ADMIN
}))

      navigate(pages.root.children.admin.path, {replace : true});

    } else if (username === "coache" && password === "coache") {
      dispatch(login({roleId : roleIds.COACHE}))

      navigate(pages.root.children.coache.path, {replace : true});

    } else if (username === "athlete" && password === "athlete") {
      dispatch(login({roleId : roleIds.ATHLETE}))

      navigate(pages.root.children.athlete.path, {replace : true});
      
    }
  };

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
