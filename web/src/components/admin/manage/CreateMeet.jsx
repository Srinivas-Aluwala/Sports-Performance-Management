import { Button, Form, Input } from "semantic-ui-react";

const CreateMeet = () => {

    return(<>
    
    <Form className="mx-auto my-12 w-1/2 border border-gray-200 shadow-md py-6 rounded-md px-12">

            <h1 className="text-3xl font-semibold">Create New Meet</h1>
                <Form.Field className="flex flex-col items-flexstart w-1/2 pt-8">
                    <label className="!text-xl !font-light">Meet Title</label>
                    <Input
                        fluid
                        placeholder="Enter meet title"

                    />
                </Form.Field>
           

                
            <Form.Group className="flex justify-end pt-8 gap-8">
                
                <Button secondary icon='save' labelPosition={"left"}
                    content='Create' />
            </Form.Group>
        </Form>
    </>)
}
export default CreateMeet;