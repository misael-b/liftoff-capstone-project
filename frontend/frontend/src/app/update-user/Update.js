"use client";
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { userHomePage } from '../actions';

const Update = () => {
    const [user, setUser] = useState({ name: '', email: '', id: '', password: '' });
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);
    

    const payload = {
        name: user.name,
        email: user.email,
        password: user.password,
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('user') !== null) {
                const token = JSON.parse(localStorage.getItem('user')).accessToken
                const AuthStr = 'Bearer '.concat(token);
                axios.get(
                    'http://localhost:8080/login/user',
                    {
                        headers: {
                            accept: "*/*",
                            "Content-Type": 'application/json',
                            Authorization: AuthStr
                        }
                    }
                ).then((res) => {
                    let userSignedIn = res.data
                    let username = userSignedIn.username
                    try {
                        const response = axios.patch(
                            "http://localhost:8080/user/" + username,
                            payload,
                            {
                                headers: {
                                    accept: "*/*",
                                    "Content-Type": "application/json",
                                    Authorization: AuthStr
                                }
                            }
                        )

                        if (response.status === 200) {
                            console.log(response)
                            console.log("worked")
                        }
                    } catch (e) {
                        console.log("failed", e)
                    } finally {
                        userHomePage()
                    }


                })
            }

        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    }


    return (
        <> {domLoaded && (
            <div className="userLoginForm">
                <h1>Update User Details: </h1><br />
                <form onSubmit={handleSubmit} >
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Enter a new name:"
                    /><br /><br />
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Enter a new email:"
                    /><br /><br />
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Enter a new password:"
                    /><br /><br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )}
        </>
        
        
    )
}

export default Update