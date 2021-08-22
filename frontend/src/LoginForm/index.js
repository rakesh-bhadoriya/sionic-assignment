import { useHistory } from "react-router-dom";
import axios from "axios";
import React from "react";
import "./login.css";

const Field = React.forwardRef(({ label, type }, ref) => {
    return (
        <div>
            <label className="label-style" >{label}</label><br />
            <input ref={ref} type={type} className="input-style" />
        </div>
    );
});

const Form = ({ onSubmit }) => {
    var message = "";
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    let history = useHistory();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        emailRef.current.value = "";
        passwordRef.current.value = "";

        axios.post("/login", data).then(response => {
            console.log("Response : ", response.data);
            localStorage.setItem("user", JSON.stringify(response.data))
            history.push("/profile");

        }).catch(error => {
            console.log("Error in login : ", error);
            message = error;
        })
    };
    return (
        <div>

            <form className="form-style" onSubmit={handleSubmit} >
                <div>{message}</div>
                <Field ref={emailRef} label="email:" type="text" />
                <Field ref={passwordRef} label="Password:" type="password" />
                <div>
                    <button className="submit-style" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

const LoginForm = () => {
    let message = "";
    const handleSubmit = data => {
        const json = JSON.stringify(data, null, 4);
        console.clear();
        console.log(json);
    };
    return (
        <div className="App-style">
            <Form onSubmit={handleSubmit} />
        </div>
    );
};

export default LoginForm;