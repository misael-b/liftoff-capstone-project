"use client";
import React, { useState } from 'react'
import axios from 'axios';

const GetFromUsername = () => {
    const [user, setUser] = useState({ username: '' });


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(
                "http://localhost:8080/user/" + user.username,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                    }
                }
            )

            if (response.status === 200) {
                console.log(response.data.name)
                console.log(response.data.email)
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
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Enter a username:"
            />
            <button type="submit">Submit</button>

        </form>
    )
}

export default GetFromUsername;