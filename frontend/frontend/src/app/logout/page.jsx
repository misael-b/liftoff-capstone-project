"use client";
import React, { useState } from 'react'

const page = () => {
    const [user, setUser] = useState({ username: '', password: '' })


    const payload = {
        username: user.username,
        password: user.password
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem('user')).accessToken
            const AuthStr = 'Bearer '.concat(token);
            window.localStorage.removeItem('user')
            console.log(JSON.parse(localStorage.getItem('user')).accessToken)
        } catch (e) {
            console.log("Sign to logout", e);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    return (
        
        <div>
            <form id="logout" onSubmit={handleSubmit}>

                <button type="submit">Logout</button>
            </form>
        </div>
    )
}

export default page