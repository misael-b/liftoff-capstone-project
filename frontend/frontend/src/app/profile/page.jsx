"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from '../layout'
import { homePage } from "../actions";

async function handleLogout(event) {
  event.preventDefault();
  try {
    const token = JSON.parse(localStorage.getItem('user')).accessToken
    const AuthStr = 'Bearer '.concat(token);
    window.localStorage.removeItem('user')
    console.log(JSON.parse(localStorage.getItem('user')).accessToken)
  } catch (e) {
    console.log("Sign to logout", e);
  }
  finally {
    homePage()
  }
}



const page = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('user') !== null) {
      let user;
      useEffect(() => {
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
          user = res.data
          setUsername(user.username)
          setName(user.name)
          setEmail(user.email)


        })
      }, []);
    } else {
      homePage()
    }
  }
  

  return (<Layout>
    <p style={{ color: "black", margin: 70 }}>Welcome {username}</p>
    <button onClick={handleLogout}>Logout</button>
  </Layout>

  )
  
  
  


  
}

export default page