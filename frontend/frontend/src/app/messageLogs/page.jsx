"use client";
import React, {useEffect} from 'react'
import axios from 'axios';



const page = () => {

    useEffect(async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/message/readLogs',
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                        //usertoken
                    }
                }
            )
        } catch (e) {
            console.log('error', e);
        }
    })


  return (
    <div>
        <table>
            <th>
                
            </th>
        </table>
    </div>
  )
}

export default page