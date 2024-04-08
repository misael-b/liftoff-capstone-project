"use client";
import React, {useEffect} from 'react'
import axios from 'axios';

const page = () => {
    useEffect(() => {
        const response = axios.get(
            'http://localhost8080/post/get/' + data,
            {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                }
            }
        )

        console.log(response);
    })





  return (
    <div>page</div>
  )
}

export default page