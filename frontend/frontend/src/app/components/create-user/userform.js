"use client";
import React, { useState } from 'react';
import axios from "axios";

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

            if (response.status === 200) {
                console.log("worked");
                console.log(payload);
                console.log(response);
            } else {
                console.log("failed");
            }
        } catch (e) {
            console.log("error", e);
        }
    }



    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} value="formData" id='form'>
            <input
                type="text"
                name="username"
                value={FormUser.username}
                onChange={handleChange}
                placeholder="Enter a Username:"
            />
            <input
                type="text"
                name="email"
                value={FormUser.email}
                onChange={handleChange}
                placeholder="Enter an Email:"
            />
            <input
                type="text"
                name="name"
                value={FormUser.name}
                onChange={handleChange}
                placeholder="Enter you Name:"
            />
            <input
                type="password"
                name="password"
                value={FormUser.password}
                onChange={handleChange}
                placeholder="Enter a password:"
            />
            <button type="submit">Submit</button>
        </form>
    );
};


export default userform;