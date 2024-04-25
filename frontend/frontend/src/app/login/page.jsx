"use client";
import React, { useState, useEffect } from 'react'
import Layout from '../layout'
import axios from 'axios'
import { userHomePage } from '../actions';

const page = () => {
    const [user, setUser] = useState({ username: '', password: '' })
    const [errors, setErrors] = useState(false)
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);


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
            setUser({ username: '', password: '' })
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    return (
        <Layout>
            {domLoaded && (
            <div className="userLoginForm">
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
                </form><br />
                {errors && <p style={{ color: "red", textAlign: "center" }}>Bad Login Credentials! Try Again!</p>}
                <p style={{ textAlign: "center" }}>Create Account <a href='http://localhost:3000/signup' style={{ color: "blue"}}>Here</a></p><br />
                
                <p style={{ textAlign: "center" }}>Click <a href="http://localhost:3000/posts" style={{ color: "blue" }}>Here</a> to view all posts</p>
            </div>
            )}
            
        </Layout>
        
    )
}

export default page