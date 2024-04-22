"use client";

import React, {useState} from 'react'
import Layout from '../../../layout'
import axios from 'axios'


const page = () => {
    let isLoggedIn;
    const [user, setUser] = useState({user: ''})

    const payload = {
        user: user.user
    }

    const handleChange2 = (event) => {
        const {name, value} = event.target;
        setMessageLogUser(prevMessageLogUser => ({ ...prevMessageLogUser, [name]: value}));
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value}));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem('user')).accessToken
            const AuthStr = 'Bearer '.concat(token);
            isLoggedIn = true;
        } catch (e) {
            isLoggedIn = false;
        }
        
        
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
        <Layout>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="searchTerm"
                        value={user.user}
                        onChange={handleChange}
                        placeholder="Search:"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default page