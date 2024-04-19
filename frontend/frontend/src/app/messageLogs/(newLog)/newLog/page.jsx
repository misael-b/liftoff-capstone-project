"use client";

import React, {useState} from 'react'
import Layout from '../../../layout'
import axios from 'axios'


const page = () => {
    const [messageLogUser, setMessageLogUser] = useState({user: ''})

    const payload = {
        user: messageLogUser.user
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setMessageLogUser(prevMessageLogUser => ({ ...prevMessageLogUser, [name]: value}));
    };

    const handleSubmit = async (e) => {
        const token = JSON.parse(localStorage.getItem('user')).accessToken
        const AuthStr = 'Bearer '.concat(token);
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8080/message',
                payload, 
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                        Authorization: AuthStr
                    }
                }
            )

            console.log(response)
        } catch (e) {
            console.log("error", e)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='messageLogUser'
                    value={messageLogUser.user}
                    onChange={handleChange}
                    placeholder='Enter a username:'
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default page