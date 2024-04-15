"use client";
import React, { useState } from 'react';
import axios from "axios";
import { homePage } from '../../actions';

function userform() {
    const [FormUser, setUser] = useState({ name: "", email: '' });
    


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
            console.log(response);
            if (response.status === 200) {
                homePage();
            } else {
                console.log("failed");
            }
        } catch (e) {
            console.log("error", e);
        } 
        console.log(redirectTarget)

        
        
    }



    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    return (
    <div className="userSignupForm">
        <h1>Sign Up!</h1>
        <form onSubmit={handleSubmit} value="formData" id='form'>
            <input
                type="text"
                name="username"
                value={FormUser.username}
                onChange={handleChange}
                placeholder="Enter a Username:"
                id="usernameBox"
            /><br/>
            <input
                type="text"
                name="email"
                value={FormUser.email}
                onChange={handleChange}
                placeholder="Enter an Email:"
                id="userEmail"
            /><br/>
            <input
                type="text"
                name="name"
                value={FormUser.name}
                onChange={handleChange}
                placeholder="Enter your Name:"
                id="userName"
            /><br/>
            <input
                type="password"
                name="password"
                value={FormUser.password}
                onChange={handleChange}
                placeholder="Enter a password:"
                id="userPassword"
            /><br/>
            <button type="submit">Submit</button>
        </form>
    </div>
    );
};


export default userform;