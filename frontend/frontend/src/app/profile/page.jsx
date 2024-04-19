"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from '../layout'


const page = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

  return (<Layout>
    <p style={{color: "black"}}>Welcome {username}</p>
  </Layout>

  )
  
  
  


  
}

export default page