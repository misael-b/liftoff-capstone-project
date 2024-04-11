"use client";
import React, {useState} from 'react'
import Layout from '../layout'

const page = () => {
    const [user, setUser] = useState({username: '', password: ''})

    const payload = {
        username: user.username,
        password: user.password
    }
    const handleSubmit = async (e) => {
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

    const handleChange = (e) => {

    }
  return (
    <Layout>
        <form>
            <input 
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder= "Enter your username:"
            />
            <input 
                type="text"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder= "Enter your username:"
            />
            <button type="submit">Submit</button>
        </form>
    </Layout>
  )
}

export default page