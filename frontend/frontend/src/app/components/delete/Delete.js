"use client";
import React, { useState } from 'react'
import axios from 'axios';

const Delete = () => {

    const [user, setVerify] = useState({ username: ''})
    const payload = {
        username: user.username
    }
    // const handleConfirm = () => {
    //     const userVerify = confirm("Are you sure you want to delete this account?");

    //     if (userVerify) {
    //         payload.username = user.username;
    //     } 
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // handleConfirm();

        try {
            const response = await axios.delete("http://localhost:8080/user/" + user.username,
                {
                    data: {
                        username: user.username
                    }
                })
            

            if (response.status === 200) {
                console.log("worked");
                console.log(response);
                console.log(payload);
            }
        } catch (e) {
            console.log("failed")
            console.log(payload.verify)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setVerify(prevVerify => ({ ...prevVerify, [name]: value }));
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

export default Delete