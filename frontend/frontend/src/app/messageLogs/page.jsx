"use client";
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {newLog} from '../actions'
let isLoggedIn;

const page = () => {
    let response;
    const [data, setData] = useState([]);
    const [messageLogUser, setMessageLogUser] = useState({user: ''})

    
   


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
        const AuthStr = 'Bearer '.concat(token);

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
            response = res;
            setData(res.data);
        })
    }, []);

    const handleSubmitNewLog = (e) => {
        e.preventDefault()
        newLog();
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setMessageLogUser(prevMessageLogUser => ({ ...prevMessageLogUser, [name]: value}));
      };

  return (
    <div>
         { !isLoggedIn ? 
            <div>
                <p color="red">Please log in to continue</p>
            </div> :
             
                // response.data.map((item) => {
                //     <div>item</div>
                // })
             <></>
            }
        <table>
            <tr>
                <th>
                    Logs
                </th>
            </tr>
        </table>
        <form onSubmit={handleSubmitNewLog}>
            <button type="submit" >BUtton</button>
        </form>
    </div>
  )
}

export default page