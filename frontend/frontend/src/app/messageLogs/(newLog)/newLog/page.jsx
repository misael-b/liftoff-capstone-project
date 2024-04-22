"use client";

import React, {useState, useEffect} from 'react'
import Layout from '../layout'
import axios from 'axios'
import Link from 'next/link'

const page = () => {
    let isLoggedIn;
    let AuthStr;
    const [user, setUser] = useState({user: ''})

    const payload = {
        user: user.user
    }

    useEffect(() => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).accessToken
            AuthStr = 'Bearer '.concat(token);
            isLoggedIn = true;
        } catch (e) {
            isLoggedIn = false;
            console.log(isLoggedIn, e);
        }
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value}));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8080/message/createLog',
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
            console.log(payload);
            console.log("error", e)
        }
    }

    return (
        <Layout>
            <div>
            </div>
            {
                !isLoggedIn ? 
                <div>
                    <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="user"
                        value={user.user}
                        onChange={handleChange}
                        placeholder="Enter a username:"
                    />
                    <button type="submit">Submit</button>
                </form>
                </div> :
                <div>
                    <Link href="/login" className="login">Please Log In</Link>
                </div>
            }
        </Layout>
    )
}

export default page