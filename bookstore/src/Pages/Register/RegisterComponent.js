import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import MessageErrorComponent from "../../Components/MessageErrorcomponent/MessageErrorcomponent";
// import book1 from '../../Images/stack-of-books.png'
import book1 from "../../images/book-01.png";
import './RegisterComponent.css'


function RegitserComponent(props) {
  const [registerFormData, setRegisterFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // mobileNumber : "",
    // certificate : ""
  });
  const [certificate, setcertificate] = useState({
    certificate: ""
  });

  const [RegisterErrorResponse, setRegisterErrorResponse] = useState(

    ""
  )
  const [registerFormErrors, setRegisterFormErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    userNameError: "",
    passwordError1: "",
    passwordError2: "",
    mobileNumberError: "",
    certificateError: "",
  });

  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  //   const [submitAttempted, setSubmitAttempted] = useState(false);
  const history = useHistory();
  const userType = useParams();
  console.log('userType---- ', userType.userType)

  const changeFormData = (e) => {
    if (e.target.name === "firstName") {
      setRegisterFormData({
        ...registerFormData,
        firstName: e.target.value,
      });
      setRegisterFormErrors({
        ...registerFormErrors,
        firstNameError:
          e.target.value.length === 0 ? "First Name Field Is Required" : null,
      });
    } else if (e.target.name === "lastName") {
      setRegisterFormData({
        ...registerFormData,
        lastName: e.target.value,
      });
      setRegisterFormErrors({
        ...registerFormErrors,
        lastNameError:
          e.target.value.length === 0 ? "Last Name Field Is Required" : null,
      });
    } else if (e.target.name === "email") {
      setRegisterFormData({
        ...registerFormData,
        email: e.target.value,
      });
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{3,}$/;
      let emailmessage;

      if (e.target.value.length === 0) {
        emailmessage = "Email Field Is Required";
      } else if (!emailRegex.test(e.target.value)) {
        emailmessage = "Enter vaild emial ex. mohamed@gmail.com";
      } else {
        emailmessage = null;
      }
      setRegisterFormErrors({
        ...registerFormErrors,
        emailError: emailmessage,
      });
    } else if (e.target.name === "password1") {
      setRegisterFormData({
        ...registerFormData,
        password: e.target.value,
      });
      let passwordMessage;
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",<.>/?\\|~`])[\w!@#$%^&*()\-_=+[{\]};:'",<.>/?\\|~`]{8,}$/;

      if (e.target.value.length === 0) {
        passwordMessage = "Password Field is requird";
      } else if (e.target.value.length <= 8) {
        passwordMessage = "Password must be greater than 8 character";
      } else if (!passwordRegex.test(e.target.value)) {
        passwordMessage =
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and Eny special character (!@#$%^&*()\-_=+[{\]};:'\",<.>/?\\|~`)";
      } else {
        passwordMessage = null;
      }
      setRegisterFormErrors({
        ...registerFormErrors,
        passwordError1: passwordMessage,
      });
    } else if (e.target.name === "password2") {
      setRegisterFormErrors({
        ...registerFormErrors,
        passwordError2:
          e.target.value !== registerFormData.password
            ? "password don't match"
            : null,
      });
    } else if (e.target.name === "certificate") {
      const file = e.target.files[0];
      setcertificate({
        ...certificate,
        certificate: file,
      });
    }
  };
  const togglePasswordVisibility = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const toggleConsirmPasswordVisibility = () => {
    confirmPasswordType === "password"
      ? setConfirmPasswordType("text")
      : setConfirmPasswordType("password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formIsValid = true;
    // Check if any field is empty
    Object.values(registerFormData).forEach((value) => {
      if (value.trim() === "") {
        formIsValid = false;
        console.log("when check all field is empty", formIsValid);
      }
    });

    if (!formIsValid) {
      setRegisterFormErrors({
        firstNameError:
          registerFormData.firstName.trim() === ""
            ? "First Name Field Is Required"
            : null,
        lastNameError:
          registerFormData.lastName.trim() === ""
            ? "Last Name Field Is Required"
            : null,
        emailError:
          registerFormData.email.trim() === ""
            ? "Email Field Field Is Required"
            : null,
        passwordError1:
          registerFormData.password.trim() === ""
            ? "Password Field Is Required"
            : null,
        passwordError2:
          registerFormData.password.trim() === ""
            ? "Password Field Is Required"
            : null,
      });

      console.log("after showing error ", formIsValid);
      console.log(registerFormErrors.passwordError1);
      console.log(registerFormErrors.passwordError2);
    } else {
      if (!registerFormErrors.firstNameError && !registerFormErrors.lastNameError && !registerFormErrors.emailError && !registerFormErrors.passwordError1 && !registerFormErrors.passwordError2 && !registerFormErrors.certificateError &&  !registerFormErrors.userNameError) {
        try {
          if (userType.userType === "publisher") {
            const formData = new FormData();
            formData.append('first_name', registerFormData.firstName);
            formData.append('last_name', registerFormData.lastName);
            formData.append('email', registerFormData.email);
            formData.append('password', registerFormData.password);
            formData.append('certificate', certificate.certificate)
            const response = await axios.post('http://127.0.0.1:8000/users/create-publisher/', formData);
            console.log('Publisher registration successful:', response.data);
            history.push('/login', { from: 'register' });

          } else {
            const formData = new FormData();
            formData.append('first_name', registerFormData.firstName);
            formData.append('last_name', registerFormData.lastName);
            formData.append('email', registerFormData.email);
            formData.append('password', registerFormData.password);
            const response = await axios.post('http://127.0.0.1:8000/users/create/', formData);
            console.log('User registration successful:', response.data);
            history.push('/login', { from: 'register' });

          }
        }
        catch (error) {
          // console.log(typeof certificate.certificate)
          console.error('Registration failed:', error.response.data);
          setRegisterErrorResponse(error.response.data)
        }
      }
    }
  };


  return (
    <div>
      {/* <div className="mt-4 mb-5 mx-auto"  style={{"width":"150px"}}>
      <img src={book1} style={{"width":"100%","height":"150px"}} className="d-block"/>
    </div> */}
      <div className="mt-2 mb-3 mx-auto" style={{ width: "150px" }}>
        <img
          src={book1}
          style={{ width: "100%", height: "150px" }}
          className="d-block"
          alt="books"
        />
      </div>
      {userType.userType === 'client' ? <h1 className="text-center loginTitle">Client</h1> : <h1 className="text-center loginTitle">Hello Publisher</h1>}

      <div className="container mb-5">
        <div className="col-lg-6 col-md-10 col-sm-10 p-4 mt-2 mx-auto border bg-white rounded shadow">
          <form onSubmit={handleSubmit}>
            {/* Names */}
            <div className="d-flex justify-content-between">
              {/* First Name */}
              <div style={{ width: "49%" }}>
                <label htmlFor="exampleInputEmail1" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  name="firstName"
                  aria-describedby="emailHelp"
                  onChange={(e) => changeFormData(e)}
                />
                <MessageErrorComponent
                  classErrorMessage={
                    registerFormErrors.firstNameError === "Field Is Required"
                      ? "danger"
                      : "danger"
                  }
                  messageError={registerFormErrors.firstNameError}
                />
              </div>
              {/* Last Name */}
              <div style={{ width: "49%" }}>
                <label htmlFor="exampleInputEmail1" className="form-label ">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  name="lastName"
                  aria-describedby="emailHelp"
                  onChange={(e) => changeFormData(e)}
                />
                <MessageErrorComponent
                  classErrorMessage={
                    registerFormErrors.lastNameError === "Field Is Required"
                      ? "danger"
                      : "danger"
                  }
                  messageError={registerFormErrors.lastNameError}
                />
              </div>
            </div>
            {/*Email */}
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label ">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="email"
                aria-describedby="emailHelp"
                onChange={(e) => changeFormData(e)}
              />
              <MessageErrorComponent
                classErrorMessage={
                  registerFormErrors.emailError === "Field Is Required"
                    ? "danger"
                    : "danger"
                }
                messageError={registerFormErrors.emailError}
              />
            </div>
            {/* Password */}
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <div className="d-flex form-control">
                <input
                  type={passwordType}
                  className="form-control border-0 form-edit"
                  id="exampleInputPassword"
                  name="password1"
                  onChange={(e) => changeFormData(e)}
                />
                <button
                  type="button"
                  className="btn"
                  onClick={() => togglePasswordVisibility()}
                >
                  <i
                    class={
                      passwordType === "password"
                        ? "bi bi-eye-slash"
                        : "bi bi-eye"
                    }
                    id="togglePassword"
                  ></i>
                </button>
              </div>
              <MessageErrorComponent
                classErrorMessage={"danger"}
                messageError={registerFormErrors.passwordError1}
              />
            </div>
            {/* Confirm Password */}
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Confirm Password
              </label>
              <div className="d-flex form-control">
                <input
                  type={confirmPasswordType}
                  className="form-control border-0 form-edit"
                  id="exampleInputPassword"
                  name="password2"
                  onChange={(e) => changeFormData(e)}
                />
                <button
                  type="button"
                  className="btn"
                  onClick={() => toggleConsirmPasswordVisibility()}
                >
                  <i
                    class={
                      confirmPasswordType === "password"
                        ? "bi bi-eye-slash"
                        : "bi bi-eye"
                    }
                    id="togglePassword"
                  ></i>
                </button>
              </div>
              <MessageErrorComponent
                classErrorMessage={
                  registerFormErrors.passwordError2 === "password don't match"
                    ? "danger"
                    : "danger"
                }
                messageError={registerFormErrors.passwordError2}
              />
            </div>

            {/* Crtificate of user is a puplisher */}
            {userType.userType === "publisher" && (
              <div className="mb-3">
                <label for="formFileSm" class="form-label">
                  Upload Certificate
                </label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  name="certificate"
                  onChange={(e) => changeFormData(e)}
                />
              </div>
            )}
            {
              RegisterErrorResponse && <p className="text-danger">
                {
                  RegisterErrorResponse.email
                }
              </p>
            }
            <button type="submit" className="filled-button w-100 btn-form">
              Register
            </button>
            <div className="mt-3 ">
              <p className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="cool-text">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegitserComponent;
