import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, FormInput, FormRadio, FormSelect, Icon, Input, Select } from "semantic-ui-react";
import { pages } from "../routes/pages";
import { useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchUserNames, queryClient, signUpRequest } from "../api/apis";

const SignupForm = () => {

  const navigate = useNavigate();

  const inputFileRef = useRef(null);

  const [filename, setFilename] = useState(null);
  const [filesize, setFilesize] = useState(null);

  const [formErrors, setFormErrors] = useState({
    username: null,
    password: null,
    role: null,
    photoUrl: null,
    athlete: {
      firstname: null,
      lastname: null,
      email: null,
      height: null,
      weight: null,
      gender: null,
      category: null,
      birthDate: null
    },
    coache: {
      firstname: null,
      lastname: null,
      email: null,
      gender: null,
      category: null,
      birthDate: null
    }
  });

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    photoUrl: "",
    athlete: {
      firstname: "",
      lastname: "",
      email: "",
      height: "",
      weight: "",
      gender: "",
      category: "",
      birthDate: ""
    },
    coache: {
      firstname: "",
      lastname: "",
      email: "",
      gender: "",
      category: "",
      birthDate: ""
    }
  });


  const { data: usernameData, error: usernameError, isLoading: usernameIsLoading, isSuccess: usernameIsSuccess } = useQuery({
    queryKey: ["usernames"],
    queryFn: fetchUserNames,
    retry: false
  })

  const { mutate } = useMutation({
    mutationFn: signUpRequest,
    onSuccess: () => {
      alert("user registration successfull")
      navigate(pages.root.children.login.path, { replace: true })
    }
  })

  const handleChange = (e, { name, value }) => {



    if (name === "username" || name === "password" || name === "role") {

      setFormData({
        ...formData,
        [name]: value
      })

      if (formErrors[name] !== null) {
        setFormErrors({
          ...formErrors,
          [name]: null
        })
      }



      if (name === "role") {
        setFormData((prevState) => {
          return {
            ...prevState,
            athlete: {
              firstname: "",
              lastname: "",
              email : "",
              height: "",
              weight: "",
              gender: "",
              category: "",
              birthDate: "",
            },
            coache: {
              firstname: "",
              lastname: "",
              email : "",
              gender: "",
              category: "",
              birthDate: "",
            }

          }
        })
      }

    } else {

      if (formData.role === "athlete") {

        setFormData({
          ...formData,
          athlete: {
            ...formData.athlete,
            [name]: value
          }
        });

        setFormErrors({
          ...formErrors,
          athlete: {
            ...formErrors.athlete,
            [name]: null
          }
        });
      } else {

        setFormData({
          ...formData,
          coache: {
            ...formData.coache,
            [name]: value
          }
        });
        setFormErrors({
          ...formErrors,
          coache: {
            ...formErrors.coache,
            [name]: null
          }
        });
      }
    }
  }

  const validate = (saveObj) => {

    let errors = {
      username: null,
      password: null,
      role: null
    };
    let athlete = {
      firstname: null,
      lastname: null,
      email : null,
      height: null,
      weight: null,
      gender: null,
      category: null,
      birthDate: null,
      photoUrl: null
    };
    let coache = {
      firstname: null,
      lastname: null,
      email : null,
      gender: null,
      category: null,
      birthDate: null,
      photoUrl: null
    }
    const abc = "abcdesfd";

    console.log(abc.length);
    console.log(saveObj, "validate");

    if (saveObj.username === "") {
      errors.username = "Username Cannot be empty";
    }
    if (saveObj.password === "") {
      errors.password = "Password Cannot be empty";
    }
    if (saveObj.role === "") {
      errors.role = "PLease Select a role";
    } else {
      if (saveObj.role === "athlete") {


        if (saveObj.athlete.firstname === "") {
          athlete.firstname = "Firstname cannot be empty";
        } else if ((saveObj.athlete.firstname).length < 3) {
          athlete.firstname = "Min 3 characters allowed in Firstname";
        } else if (saveObj.athlete.firstname.length > 100) {
          athlete.firstname = "Max 100 characters allowed in Firstname";
        }



        if (saveObj.athlete.lastname === "") {
          athlete.lastname = "Lastname cannot be empty";
        } else if (saveObj.athlete.lastname.length < 3) {
          athlete.lastname = "Min 3 characters allowed in Lastname";
        } else if (saveObj.athlete.lastname.length > 100) {
          athlete.lastname = "Max 100 characters allowed in Lastname";
        }


        if (saveObj.athlete.email === "") {
          athlete.email = "Email cannot be empty";
        }

        if (saveObj.athlete.gender === "") {
          athlete.gender = "Gender cannot be empty";
        }
        if (saveObj.athlete.category === "") {
          athlete.category = "Category cannot be empty";
        }
        if (saveObj.athlete.birthDate === "") {
          athlete.birthDate = "BirthDate cannot be empty";
        }
        if (saveObj.athlete.height === "") {
          athlete.height = "Height cannot be empty";
        }
        if (saveObj.athlete.weight === "") {
          athlete.weight = "Weight cannot be empty";
        }
        if (saveObj.athlete.photoUrl === "") {
          athlete.photoUrl = "PhotoURL cannot be empty";
        }

      } else {

        if (saveObj.coache.firstname === "") {
          coache.firstname = "Firstname cannot be empty";
        }
        if (saveObj.coache.lastname === "") {
          coache.lastname = "Lastname cannot be empty";
        }

        if (saveObj.coache.email === "") {
          coache.email = "Email cannot be empty";
        }

        if (saveObj.coache.gender === "") {
          coache.gender = "Gender cannot be empty";
        }
        if (saveObj.coache.category === "") {
          coache.category = "Category cannot be empty";
        }
        if (saveObj.coache.birthDate === "") {
          coache.birthDate = "BirthDate cannot be empty";
        }
        if (saveObj.coache.photoUrl === "") {
          coache.photoUrl = "PhotoURL cannot be empty";
        }

      }
    }

    setFormErrors({
      ...formErrors,
      ...errors,
      athlete,
      coache
    })

  }


  const submitHandler = (e) => {

    e.preventDefault();
    alert("submitted")

    let saveObj = new FormData();

    const isValid = validate(formData);

    if (formData.role === "athlete") {

      const { photoUrl, ...rest } = formData;

      console.log(formData, photoUrl);

      if (!photoUrl || !(photoUrl instanceof File)) {
        alert("No file selected or invalid file");
        return;
      } else {
        console.log(photoUrl instanceof File); // Must print true

      }
      const userDTO = { ...rest, coache: null };

      saveObj.append("usersSignupDTO", new Blob([JSON.stringify(userDTO)], { type: "application/json" }));
      saveObj.append("imageFile", photoUrl);

    } else if (formData.role === "coache") {
      const { photoUrl, ...rest } = formData;

      const userDTO = { ...rest, athlete: null };
      console.log(userDTO);


      saveObj.append("usersSignupDTO", new Blob([JSON.stringify(userDTO)], { type: "application/json" }));
      saveObj.append("imageFile", photoUrl);

    }

    console.log(saveObj);
    for (let pair of saveObj.entries()) {
      console.log(pair[0], pair[1]);
    }

    mutate(saveObj);
  }

  const onUserNameBlur = () => {

    let match = null;
    match = usernameData.find((uname) => uname.toLowerCase() === formData.username.toLowerCase())

    if (match != null) {
      setFormErrors({
        ...formErrors,
        username: "Username already exist Please type different username"
      })
    }
  }

  const onFileChange = (e) => {

    const file = e.target.files[0];

    console.log(file);

    const filesize = file.size / 1024;


    setFilename(file.name);

    setFilesize(`Size :${filesize.toFixed(2)}KB `)
    {
      setFormData({
        ...formData,
        photoUrl: e.target.files[0]
      });

      setFormErrors({
        ...formErrors,
        photoUrl: null
      });
    }
  }


  const uploadImage = () => {

    if (inputFileRef) {
      inputFileRef.current.value = "";
      if (inputFileRef.current.value) {
        inputFileRef.current.type = "file";
        inputFileRef.current.value = "text";
      }
      inputFileRef.current.click();
    }

  }

  const deleteImageHAndler = () => {
    setFilename(null);
    setFilesize(null);
    {
      setFormData({
        ...formData,
        photoUrl: ""
      })
    }
  }


  return (
    <div className="flex flex-grow items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Register
        </h2>

        <Form>
          <div className="mb-4">
            <FormInput name={"username"} value={formData.username} fluid placeholder="Username"
              onChange={handleChange}
              onBlur={onUserNameBlur}
              error={formErrors.username}
            />

          </div>
          <div className="mb-4">
            <FormInput name={"password"} value={formData.password} fluid placeholder="Password" type="password"
              onChange={handleChange}
              error={formErrors.password}

            />
          </div>
          <div className="mb-6">
            <FormSelect
              name={"role"}
              value={formData.role}
              fluid
              placeholder="Select Role"
              options={[
                { key: "coache", value: "coache", text: "Coache" },
                { key: "athlete", value: "athlete", text: "Athlete" },
              ]}
              onChange={handleChange}
              error={formErrors.role}

            />
          </div>
          {
            formData.role !== "" &&
            <>
              <div className="mb-4">
                <FormInput name={"firstname"} value={formData[formData.role]?.firstname} fluid placeholder="Firstname"
                  onChange={handleChange}
                  error={formErrors[formData.role].firstname}
                />
              </div>
              <div className="mb-4">
                <FormInput name={"lastname"} value={formData[formData.role]?.lastname} fluid placeholder="Lastname"
                  onChange={handleChange}
                  error={formErrors[formData.role].lastname}
                />
              </div>
               <div className="mb-4">
                <FormInput name={"email"} value={formData[formData.role]?.email} fluid placeholder="Email"
                  onChange={handleChange}
                  error={formErrors[formData.role].email}
                />
              </div>
              <div className="mb-4">
                <FormSelect
                  name={"category"}
                  value={formData[formData.role]?.category}
                  options={[
                    { key: "sprint", value: "sprint", text: "Sprint" },
                    { key: "longjump", value: "longjump", text: "Long jump" },
                  ]} fluid placeholder="category"
                  onChange={handleChange}
                  error={formErrors[formData.role].category}
                />
              </div>
              <div className="mb-4">
                <FormInput name={"birthDate"} type="date" value={formData[formData.role]?.birthDate} fluid placeholder="Date Of Birth"
                  onChange={handleChange}
                  error={formErrors[formData.role].birthDate}
                />
              </div>
              <div className="mb-4">
                <FormSelect
                  name={"gender"}
                  value={formData[formData.role]?.gender}
                  options={[
                    { key: "male", value: "male", text: "Male" },
                    { key: "female", value: "female", text: "Female" },
                  ]}
                  fluid placeholder="Gender"
                  onChange={handleChange}
                  error={formErrors[formData.role].gender}
                />
              </div>
              {
                (formData.role === "athlete") &&
                <>
                  <div className="mb-4">
                    <FormInput name={"height"} value={formData[formData.role]?.height} fluid placeholder="Height (feet)"
                      onChange={handleChange}
                      error={formErrors.athlete.height}
                    />
                  </div>
                  <div className="mb-4">
                    <FormInput name={"weight"} value={formData[formData.role]?.weight} fluid placeholder="Weight (kg)"
                      onChange={handleChange}
                      error={formErrors.athlete.weight}
                    />
                  </div>
                </>

              }
              <div className="mb-4 flex items-center">
                <input name="photoUrl" style={{ display: "none" }} ref={inputFileRef} type="file" fluid placeholder="photoUrl"
                  onChange={onFileChange}
                  accept=".jpeg, .jpg"
                />

                <Button size="medium" content="uploadImage" onClick={uploadImage}

                />
                {filename ?
                  <div className="flex flex-col border  w-full border-black-200 rounded pl-2">
                    <Icon className="self-end cursor-pointer" name="close" onClick={deleteImageHAndler} />
                    <p className="pr-6">{filename}</p>
                    <p>{filesize}</p>
                  </div>
                  :
                  <div className={formErrors.photoUrl ? "text-[#9f3a38] font-semibold text-[13px] border border-[#e0b4b4] px-2 rounded" : ""}>Please select a image</div>
                }
              </div>
            </>}
          <Button fluid secondary content="Submit" onClick={submitHandler} />

        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
