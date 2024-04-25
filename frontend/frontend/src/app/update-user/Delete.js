"use client";
import React, { useState } from 'react'
import axios from 'axios';
import { userHomePage } from '../actions';

const Delete = () => {
    const [user, setUser] = useState({ name: '', email: '', id: '', password: '' });
    

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
                    console.log(username);
                    try {
                        const response = axios.delete(
                            "http://localhost:8080/user/" + username,
                            {
                                headers: {
                                    accept: "*/*",
                                    "Content-Type": "application/json",
                                    Authorization: AuthStr
                                }
                            }
                        )

                        console.log(response);
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

    return (<div className="userSignupForm">
        <form onSubmit={handleSubmit} >
            <button type="submit">Submit</button>
        </form>
        
    </div>
        
    )
}

export default Delete