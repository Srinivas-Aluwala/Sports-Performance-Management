import { Button, Form, Icon, Input, Label, Select, TextArea } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import React, { forwardRef } from 'react';
import { useMutation } from "@tanstack/react-query";
import { createEvent } from "../../../api/adminApis";
import { pages } from "../../../routes/pages";
import { Navigate, useNavigate } from "react-router-dom";

const CreateEvent = () => {

    const navigate = useNavigate();

    const initalFormData = {
        title: "",
        eventDate: "",
        meet: "",
        venue: "",
        category: "",
        description: "",
        photo: ""
    };

    const intialFormErrors = {
        title: null,
        eventDate: null,
        meet: null,
        venue: null,
        category: null,
        description: null,
        photo: null,
    };

    const intialFileData = {
        filename: "",
        filesize: ""
    }

    const inputFileRef = useRef(null);

    const [selectedDate, setSelectedDate] = useState(null);

    const [fileData, setFileData] = useState(intialFileData);

    const [formData, setFormData] = useState(initalFormData);


    const [formErrors, setFormErrors] = useState(intialFormErrors);


    const { mutate } = useMutation({
        mutationFn: createEvent,
        onSuccess: () => {
            alert("Event creation successfull")
            navigate(pages.root.children.admin.path + "/" + pages.root.children.admin.children.dashboard.path, { replace: true });
            
        }
    })








    const handlePhotoChange = (e) => {

        const file = e.target.files[0];

        const filesize = file.size / 1024;

        setFileData({
            filename: file.name,
            filesize: `Size :${filesize.toFixed(2)}KB `
        })
        setFormData({
            ...formData,
            photo: file
        })
    };


    const handlePhotoUpload = () => {

        if (inputFileRef) {
            inputFileRef.current.value = "";
            if (inputFileRef.current.value) {
                inputFileRef.current.type = "file";
                inputFileRef.current.value = "text";
            }
            inputFileRef.current.click();
        }

    };


    const deleteImageHandler = () => {
        setFilename(null);
        setFilesize(null);
        {
            setFormData({
                ...formData,
                photo: ""
            })
        }
    }


    const handleDateChange = (value) => {

        setSelectedDate(value);
        const formattedDate = value.toLocaleDateString("en-GB");

        setFormData({
            ...formData,
            eventDate: formattedDate,
        })
    }

    const handleChange = (e, { name, value }) => {

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const saveObj = new FormData();

        const { photo, ...rest } = formData;
        console.log(rest);

        saveObj.append("createEventDTO", new Blob([JSON.stringify(rest)], { type: "application/json" }))
        saveObj.append("photoURL", photo);


        mutate(saveObj);
    }

    const handleReset = () => {
        setFormData(initalFormData);
        setFormErrors(intialFormErrors);
        setSelectedDate(null);
        setFileData(intialFileData);
    }

    const meetList = [
        { key: "M_0001", value: "meet 1", text: "meet 1" },
        { key: "M_0002", value: "meet 2", text: "meet 2" },
        { key: "M_0003", value: "meet 3", text: "meet 3" },
        { key: "M_0004", value: "meet 4", text: "meet 4" },
        { key: "M_0005", value: "meet 5", text: "meet 5" },
        { key: "M_0006", value: "meet 6", text: "meet 6" },
        { key: "M_0007", value: "meet 7", text: "meet 7" },
        { key: "M_0008", value: "meet 8", text: "meet 8" },
        { key: "M_0009", value: "meet 9", text: "meet 9" }
    ]



    return (<>
        <Form className="mx-auto my-12 w-1/2 border border-gray-200 shadow-md py-6 rounded-md px-12">

            <h1 className="text-3xl font-semibold">Create New Event</h1>
            <Form.Group className="flex justify-around pt-8 gap-8">
                <Form.Field className="flex flex-col items-flexstart w-1/2">
                    <label className="!text-xl !font-light">Event Title</label>
                    <Input
                        name={"title"}
                        fluid
                        placeholder="Enter event title"
                        onChange={handleChange}
                        value={formData.title}
                        error={formErrors.title}
                    />
                </Form.Field>
                <Form.Field className="flex flex-col items-flexstart w-1/2">
                    <label className="!text-xl !font-light">Event Date</label>
                    <DatePicker
                        closeOnScroll={true}
                        selected={selectedDate}
                        onChange={handleDateChange}
                        placeholderText="DD-MM-YYY"
                        dateFormat="dd/MM/yyyy"
                    // onChangeRaw={handleDateChange}
                    />
                </Form.Field>
            </Form.Group>
            <Form.Group className="flex justify-around pt-8 gap-8">
                <Form.Field className="flex flex-col items-flexstart w-1/2">
                    <label className="!text-xl !font-light">Select Meet</label>
                    <Select
                        options={meetList}
                        name={"meet"}
                        fluid
                        placeholder="Select a meet"
                        onChange={handleChange}
                        value={formData.meet}
                        error={formErrors.title}

                    />
                </Form.Field>
                <Form.Field className="flex flex-col items-flexstart w-1/2">
                    <label className="!text-xl !font-light">Venue</label>
                    <Input
                        name={"venue"}
                        fluid
                        placeholder="Enter venue"
                        onChange={handleChange}
                        value={formData.venue}
                        error={formErrors.title}

                    />
                </Form.Field>
            </Form.Group>

            <Form.Group className="flex justify-flexstart pt-8 gap-8">

                <Form.Field className="flex flex-col items-flexstart w-1/2">
                    <label className="!text-xl !font-light">Category </label>
                    <Input
                        name={"category"}
                        fluid
                        placeholder="Enter category"
                        onChange={handleChange}
                        value={formData.category}
                        error={formErrors.title}

                    />
                </Form.Field>
            </Form.Group>
            <Form.Group className="flex justify-flexstart pt-8 gap-8">

                <Form.Field className="flex flex-col items-flexstart w-full">
                    <label className="!text-xl !font-light">Event Description </label>
                    <TextArea
                        name={"description"}
                        fluid placeholder='Describe the event'
                        rows={6}
                        onChange={handleChange}
                        value={formData.description}
                        error={formErrors.title}
                    />
                </Form.Field>
            </Form.Group>
            <Form.Group className="flex justify-flexstart pt-8 gap-8">

                <Form.Field className="flex flex-col items-flexstart ">
                    <label className="!text-xl !font-light">Photo </label>

                    <div className="mb-4 flex items-center ">
                        <input
                            ref={inputFileRef}
                            name="photo"
                            onChange={handlePhotoChange}
                            type="file"
                            accept=".jpeg, .jpg"
                            hidden
                        />

                        <Button
                            onClick={handlePhotoUpload}
                            icon={"upload"}
                            content={"Import"}
                            labelPosition="left"
                        />

                        {fileData?.filename ?
                            <div className="flex flex-col border  w-full border-black-200 rounded pl-2">
                                <Icon className="self-end cursor-pointer" name="close" onClick={deleteImageHandler} />
                                <p className="pr-6">{fileData?.filename}</p>
                                <p>{fileData?.filesize}</p>
                            </div>
                            :
                            <div className={formErrors.photo ? "text-[#9f3a38] font-semibold text-[13px] border border-[#e0b4b4] px-2 rounded" : ""}>Please select a image</div>
                        }
                    </div>
                </Form.Field>
            </Form.Group>
            <Form.Group className="flex justify-end pt-8 gap-8">
                <Button color="teal" icon='undo'
                    labelPosition={"left"}
                    content='Reset'
                    onClick={handleReset}
                />
                <Button secondary icon='save' labelPosition={"left"} onClick={handleSubmit}
                    content='Create' />
            </Form.Group>
        </Form>
    </>)
}
export default CreateEvent;