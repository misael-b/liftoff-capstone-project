"use client";
import React, {useEffect} from 'react'
import axios from 'axios';



const page = () => {
    let response;

    const fetchLogs = async () => {
        const token = JSON.parse(localStorage.getItem('user')).accessToken
        const AuthStr = 'Bearer'.concat(token);
        try {
            // const getUserResponse = await axios.get(
            //     'http://localhost:8080/login/user',
            //     {
            //         headers: {
            //             accept: "*/*",
            //             "Content-Type": "application/json",
            //             Authorization: AuthStr,
            //         }
            //     }
            // )

            // console.log(getUserResponse);

            const getResponse = await axios.get(
                'http://localhost:8080/message/readLogs',
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                        Authorization: AuthStr
                    }
                }
            )

            console.log(getResponse);
        } catch (e) {
            console.log('error', e);
        }
    }

    useEffect(() => {
        response = fetchLogs();
        console.log(response);
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(localStorage.getItem("user"))
        const token = JSON.parse(localStorage.getItem('user')).accessToken
        const AuthStr = 'Bearer'.concat(token);
        try {
            const response = await axios.get(
                'http://localhost:8080/message/readLogs',
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
    <div>
        <table>
            <th>
                {
                    response
                }
            </th>
        </table>
        <form onSubmit={handleSubmit}>
        <button type="submit" >BUtton</button>
        </form>
        
    </div>
  )
}

export default page