import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "semantic-ui-react";
import { createMeet } from "../../../api/adminApis";
import { useState } from "react";

const CreateMeet = () => {

    const [meetName, setMeetName] = useState('');
    const [meetDescription, setMeetDescription] = useState('');



    const { mutate } = useMutation({
        mutationFn : createMeet,
        onSuccess : () => {
                    alert("Meet creation successfull")
                    navigate(pages.root.children.admin.path + "/" + pages.root.children.admin.children.dashboard.path, { replace: true });
        },    

    })



    const onNameChangeHandler = (e) => {

        setMeetName(e.target.value);
    }

      const onDescriptionChangeHandler = (e) => {

        setMeetDescription(e.target.value);
    }


    const createMeetHandler = () => {

       const saveObj = {
        meetName : meetName,
        description : meetDescription
       }
       console.log(saveObj);
       

       mutate(saveObj)


    }




    return(<>
    
    <Form className="mx-auto my-12 w-1/2 border border-gray-200 shadow-md py-6 rounded-md px-12">

            <h1 className="text-3xl font-semibold">Create New Meet</h1>
            <Form.Group >
                <Form.Field className="flex flex-col items-flexstart w-1/2 pt-8">
                    <label className="!text-xl !font-light">Meet Title</label>
                    <Input
                        fluid
                        placeholder="Enter meet title"
                        value={meetName}
                        onChange={onNameChangeHandler}
                    />
                    </Form.Field>
                    <Form.Field className="flex flex-col items-flexstart w-1/2 pt-8">
                     <label className="!text-xl !font-light">Description</label>
                     <Input
                        fluid
                        placeholder="Enter meet description"
                        value={meetDescription}
                        onChange={onDescriptionChangeHandler}
                    />
                </Form.Field>
           </Form.Group>

                
            <Form.Group className="flex justify-end pt-8 gap-8">
                
                <Button secondary icon='save' labelPosition={"left"}
                    content='Create' onClick={createMeetHandler} />
            </Form.Group>
        </Form>
    </>)
}
export default CreateMeet;