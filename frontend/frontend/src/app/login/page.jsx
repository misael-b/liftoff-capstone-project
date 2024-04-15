"use client";
import React, {useState} from 'react'
import Layout from '../layout'
import axios from 'axios'

const page = () => {
    const [user, setUser] = useState({username: '', password: ''})

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

            console.log(response);
        } catch (e) {
            console.log("Sign in failed", e);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value}));
      };

  return (
    <Layout>
        <form id="login" onSubmit={handleSubmit}>
            <input 
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder= "Enter your username:"
                
            />
            <input 
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder= "Enter your password:"
            />
            <button type="submit">Submit</button>
        </form>
    </Layout>
  )
}

export default page