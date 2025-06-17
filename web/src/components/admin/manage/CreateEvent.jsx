import { Button, Form, Input, Label, Select, TextArea } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import React, { forwardRef } from 'react';

const CreateEvent = () => {

    const [selectedDate, setSelectedDate] = useState();

    return (<>
        <Form className="mx-auto my-12 w-1/2 border border-gray-200 shadow-md py-6 rounded-md px-12">

            <h1 className="text-3xl font-semibold">Create New Event</h1>
            <Form.Group className="flex justify-around pt-8 gap-8">
                <Form.Field className="flex flex-col items-flexstart w-1/2">
                    <label className="!text-xl !font-light">Event Title</label>
                    <Input
                        fluid
                        placeholder="Enter event title"

                    />
                </Form.Field>
                <Form.Field className="flex flex-col items-flexstart w-1/2">
                    <label className="!text-xl !font-light">Event Date</label>
                    <DatePicker
                        closeOnScroll={true}
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        placeholderText="DD-MM-YYY"
                        dateFormat="dd/MM/yyyy"
                    />
                </Form.Field>
            </Form.Group>
            <Form.Group className="flex justify-around pt-8 gap-8">
                <Form.Field className="flex flex-col items-flexstart w-1/2">
                    <label className="!text-xl !font-light">Select Meet</label>
                    <Select
                        fluid
                        placeholder="Select a meet"

                    />
                </Form.Field>
                <Form.Field className="flex flex-col items-flexstart w-1/2">
                    <label className="!text-xl !font-light">Venue</label>
                    <Input
                        fluid
                        placeholder="Enter venue "

                    />
                </Form.Field>
            </Form.Group>

            <Form.Group className="flex justify-flexstart pt-8 gap-8">

                <Form.Field className="flex flex-col items-flexstart w-1/2">
                    <label className="!text-xl !font-light">Category </label>
                    <Input
                        fluid
                        placeholder="Enter category "

                    />
                </Form.Field>
            </Form.Group>
            <Form.Group className="flex justify-flexstart pt-8 gap-8">

                <Form.Field className="flex flex-col items-flexstart w-full">
                    <label className="!text-xl !font-light">Event Description </label>
                    <TextArea fluid placeholder='Describe the event' rows={6} />
                </Form.Field>
            </Form.Group>
            <Form.Group className="flex justify-flexstart pt-8 gap-8">

                <Form.Field className="flex flex-col items-flexstart ">
                    <label className="!text-xl !font-light">Photo </label>
                
                    <input
                        type="file"
                        hidden
                    />

                    <Button
                        icon={"upload"}
                        content={"Import"}
                        labelPosition="left"
                    />
                </Form.Field>
            </Form.Group>
            <Form.Group className="flex justify-end pt-8 gap-8">
                <Button color="teal" icon='undo'
                    labelPosition={"left"}
                    content='Reset' />
                <Button secondary icon='save' labelPosition={"left"}
                    content='Create' />
            </Form.Group>
        </Form>
    </>)
}
export default CreateEvent;