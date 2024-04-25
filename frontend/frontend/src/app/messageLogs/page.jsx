"use client";
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {newLog} from '../actions'
import Link from 'next/link'

const page = () => {
    let isLoggedIn;
    let AuthStr;
    const [data, setData] = useState([]);
    const [user, setUser] = useState('')

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
        axios.get(
            'http://localhost:8080/message/readLogs',
            {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: AuthStr,
                }
            }
        ).then((res) => {
            setData(res.data)
        }) 

        axios.get(
            'http://localhost:8080/message/getUser',
            {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: AuthStr,
                }
            }
        ).then((res) => {
            setUser(res.data)
            
        })
    }, []);

    
    const handleSubmitNewLog = (e) => {
        e.preventDefault()
        newLog();
    }


  return (
    <div>
        { isLoggedIn ? 
            <div>
                <p color="red">Please log in to continue</p>
            </div> :
             <></>
        }
        <table className="logTable">
            <tr>
                <th>
                    Usernames
                </th>
                <th>
                    Links
                </th>
            </tr>
                {
                    data.map((item) => {
                        if (user === item.user1.username) {
                            return (
                                <>
                                    <tr>
                                        <td>{item.user2.username}</td>
                                        <td><Link href={"http://localhost:3000/messageLogs/messaging?user=" + user + "&otherUser=" + item.user2.username}>View</Link></td>
                                    </tr>
                                        
                                </>
                            )
                        } else if (user === item.user2.username) {
                            return (
                                <>
                                    <tr>
                                        <td>{item.user1.username}</td>
                                        <td><Link href={"http://localhost:3000/messageLogs/messaging?user=" + user + "&otherUser=" + item.user1.username}>View</Link></td>
                                    </tr>
                                        
                                </>
                            )
                        } else {
                            console.log(user);
                            return (
                                <p>god damn it</p>
                            )
                        }

                    })
                }
        </table>
        <form onSubmit={handleSubmitNewLog}>
            <button type="submit" style={{color: "red"}}>Create New Log</button>
        </form>
    </div>
  )
}

export default page