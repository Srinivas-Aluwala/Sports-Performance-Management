import { useNavigate } from "react-router-dom";
import { Button, Input, Select } from "semantic-ui-react";
import { pages } from "../routes/pages";

const SignupForm = () => {

  const navigate = useNavigate();


/*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*  Fetch usernames before sign up for unique usernames
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*/



  const submitHandler = () => {
   const signupObj = {
    "userInfo" : {
"username" : "jackkhalis@gmail.com",
"password" : "Jack510",
"firstName" : "Jack",
"lastName" : "Khalis",
"height" : "5.10",
"weight" : "72",
"gender" : "Male",
"category" : "Sprint",
"birthDate" : "03/09/1992",
"photoUrl" :"https://img.favpng.com/6/24/10/stock-photography-running-sport-royalty-free-png-favpng-0PdkJM3B9rJnQ4TWbYgCy5LyY.jpg"
    },
    "userRole" : [
        {
 "roleId" : "3",
 "roleName" : "ATHLETE"
    }
    ]
};
      navigate(pages.root.children.login.path, {replace : true});
  }
  return (
    <div className="flex flex-grow items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Register
        </h2>

        <div className="mb-4">
          <Input fluid placeholder="Username" />
        </div>
         <div className="mb-4">
          <Input fluid placeholder="Email" />
        </div>
        <div className="mb-4">
          <Input fluid placeholder="Password" type="password" />
        </div>

        <div className="mb-6">
          <Select
            fluid
            placeholder="Select Role"
            options={[
              { key: "coach", value: "coach", text: "Coach" },
              { key: "athlete", value: "athlete", text: "Athlete" },
            ]}
          />
        </div>

        <Button fluid secondary content="Submit" onClick={submitHandler} />
      </div>
    </div>
  );
};

export default SignupForm;
