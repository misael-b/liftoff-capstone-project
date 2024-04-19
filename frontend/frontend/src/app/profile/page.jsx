"use client";

import React, {useState, useEffect} from 'react'
import Layout from '../layout'
import axios from 'axios'

const page = () => {
  const [user, setUser] = useState({name: '', email: '', username: '', password: '', id: '', roles: []});

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
      setUser(res.data);
      console.log(user,res.data)
    })
  }, [])
  return (
    <Layout>
      page
    </Layout>
  )
}

export default page