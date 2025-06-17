import { useNavigate } from "react-router-dom";
import { Button, Input, Select } from "semantic-ui-react";
import { pages } from "../routes/pages";

const SignupForm = () => {

  const navigate = useNavigate();




  const submitHandler = () => {
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
