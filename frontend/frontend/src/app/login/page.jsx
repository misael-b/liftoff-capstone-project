"use client";
import React, { useState } from 'react'
import Layout from '../layout'
import axios from 'axios'
import { userHomePage } from '../actions';

const page = () => {
    const [user, setUser] = useState({ username: '', password: '' })
    let LoggedIn;


    const payload = {
        username: user.username,
        password: user.password
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/login/login",
                payload,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                    }
                }
            )

            localStorage.setItem("user", JSON.stringify(response.data))
            userHomePage()
            
        } catch (e) {
            LoggedIn = true
            console.log(LoggedIn)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    return (
        <Layout>
            <div>
                <form id="login" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        placeholder="Enter your username:"
                    />
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Enter your password:"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
            {/* {LoggedIn ? <p style={{ color: "red" }}>Bad Login Credentials</p> : <></>} */ LoggedIn && <p style={{ color: "red" }}>Bad Login Credentials</p>}
        </Layout>
        
    )
}

export default page