<<<<<<< HEAD
import Login from "./login"

export default function Home() {
    return (
        <>
            <Login />
        </>
    )
};
=======
"use client";
import React, { useState } from 'react'
import Layout from '../layout'
import axios from 'axios'
import { userHomePage } from '../actions';

const page = () => {
    const [user, setUser] = useState({ username: '', password: '' })
    const [errors, setErrors] = useState(false)


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
            setErrors(true)
            // console.log(LoggedIn)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    return (
        <Layout>
            <div className="userSignupForm">
                <h1>Login:</h1>
                <form id="login" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        placeholder="Enter your username:"
                    /><br />
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Enter your password:"
                    /><br />
                    <button type="submit">Submit</button>
                </form>
            </div>
            {errors && <p style={{ color: "red" }}>Bad Login Credentials! Try Again!</p>}
        </Layout>
        
    )
}

export default page
>>>>>>> main
