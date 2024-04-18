"use client";
import React, { useState } from 'react'
import axios from 'axios';

const Update = () => {
    const [user, setUser] = useState({ name: '', email: '', id: '' , password: ''});

    const payload = {
        name: user.name,
        email: user.email,
        password: user.password,
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (payload.name === "" && payload.email === "" && payload.password === "") {
            window.alert("All inputs empty");
            return;
        }
        try {
            const response = await axios.patch(
                "http://localhost:8080/user/" + user.username,
                payload,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                    }
                }
            )

            if (response.status === 200) {
                console.log(response)
                console.log("worked")
            }
        } catch (e) {
            console.log("failed", e)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Enter a new name:"
            />
            <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter a new email:"
            />
            <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter a new password:"
            />
            <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Enter username:"
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Update