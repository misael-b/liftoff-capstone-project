"use client";
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {newLog} from '../actions'


const page = () => {
    let response;
    let isLoggedIn;
    let AuthStr;
    const [data, setData] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('user') !== null) {
                isLoggedIn = localStorage.getItem("user");
                if (isLoggedIn.accessToken !== "") {
                    isLoggedIn = true;
                } else {
                    isLoggedIn = false;
                }
            }
        }

        const token = JSON.parse(localStorage.getItem('user')).accessToken
        AuthStr = 'Bearer '.concat(token);
        const asyncFunc = async () => {
            const response = await axios.get(
                'http://localhost:8080/message/readLogs',
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                        Authorization: AuthStr,
                    }
                }
            )

            console.log(response.data)
            setData(response.data);
            console.log(data)
        }
        asyncFunc();
        
            // res.data.map((item) => {
            //     setData(
            //         [
            //             ...data, {user1: item.user1, user2: item.user2}
            //         ]
            //     )
            // })
    }, []);

    const handleSubmitNewLog = (e) => {
        e.preventDefault()
        newLog();
    }


  return (
    <div>
        { !isLoggedIn ? 
            <div>
                <p color="red">Please log in to continue</p>
            </div> :
             <></>
        }
        <table className="logTable">
            <tr>
                <th>
                    Logs
                </th>
            </tr>
        </table>
        <form onSubmit={handleSubmitNewLog}>
            <button type="submit" style={{color: "red"}}>Create New Log</button>
        </form>
    </div>
  )
}

export default page