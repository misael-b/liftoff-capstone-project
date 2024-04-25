"use client";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { homePage } from '../../actions';

function userform() {
    const [FormUser, setUser] = useState({ name: "", email: '', username: "", password:"" });
    const [errorsInUsername, setErrorsInUsername] = useState(false)
    const [errors, setErrors] = useState(false)
    const [errorsEmail, seterrorsEmail] = useState(false)

    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);
    


    const payload = {
        username: FormUser.username,
        password: FormUser.password,
        email: FormUser.email,
        name: FormUser.name
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:8080/user/register',
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            if (response.status === 200) {
                homePage();
            } else if (response.status === 400){
                setErrorsInUsername(true)
                setUser({ name: FormUser.name, email: FormUser.email, password: FormUser.password, username: ''})
            } else {
                setErrors(true)
                setUser({ name: "", email: '', username: "", password: "" })
            }
        } catch (e) {
            if (e.response.status === 400) {
                setErrorsInUsername(true)
                setUser({ name: FormUser.name, email: FormUser.email, password: FormUser.password, username: '' })
            }
            else if (FormUser.username !== "" && FormUser.password !== "" && FormUser.email !== "" && FormUser.name !== "") {
                seterrorsEmail(true)
                setUser({ email: '', name: FormUser.name, password: FormUser.password, username: FormUser.username })
            } else if (FormUser.username !== "" || FormUser.password !== "" || FormUser.email !== "" || FormUser.name !== "") {
                setErrors(true)
                setUser({ name: FormUser.name, email: FormUser.email, password: FormUser.password, username: FormUser.username })
            } else {
                setErrors(true)
                setUser({ name: "", email: '', username: "", password: "" })
            }
            
        } 

        
        
    }



    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
        setErrors(false)
        setErrorsInUsername(false)
        seterrorsEmail(false)
    };

    return (
        <>
            { domLoaded && (

                <div className="userLoginForm">
                    <h1>Sign Up!</h1>
                    <form onSubmit={handleSubmit} value="formData" id='form'>
                        <input
                            type="text"
                            name="username"
                            value={FormUser.username}
                            onChange={handleChange}
                            placeholder="Enter a Username:"
                            id="usernameBox"
                        /><br /><br />
                        <input
                            type="text"
                            name="email"
                            value={FormUser.email}
                            onChange={handleChange}
                            placeholder="Enter an Email:"
                            id="userEmail"
                        /><br /><br />
                        <input
                            type="text"
                            name="name"
                            value={FormUser.name}
                            onChange={handleChange}
                            placeholder="Enter your Name:"
                            id="userName"
                        /><br /><br />
                        <input
                            type="password"
                            name="password"
                            value={FormUser.password}
                            onChange={handleChange}
                            placeholder="Enter a password:"
                            id="userPassword"
                        /><br /><br />
                        <button type="submit">Submit</button>
                    </form>
                    {errorsInUsername && <p style={{ color: "red" }}>Username Already Exists! Try Again!</p>}
                    {errors && <p style={{ color: "red" }}>All fields are required!!</p>}
                    {errorsEmail && <p style={{ color: "red" }}>Please Enter a valid email</p>}
                </div>
             )} 
        </>
        
    
    );
};


export default userform;