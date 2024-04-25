"use client";
import React, {useState} from 'react'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const page = () => {
    const [message, setMessage] = useState({message: ''});
    const searchParams = useSearchParams();
    const log = searchParams.get('log');
    const router = useRouter();
    const handleChange = (event) => {
        const {name, value} = event.target;
        setMessage(prevMessage => ({ ...prevMessage, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('user')).accessToken
        const AuthStr = 'Bearer '.concat(token);
        const link = 'http://localhost:8080/message/update/' + message.message + '!' + log
        console.log(link)
        const response = await axios.put(
            'http://localhost:8080/message/update/' + message.message + '!' + log,
            {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: AuthStr,
                }
            }
        )
        
        console.log(response)
        
        if (response.status === 200) {
            router.back();
        }
    }

  return (
    <form onSubmit={handleSubmit} id="updateMessageForm">
        <input 
            type="text"
            name="message"
            value={message.message}
            onChange={handleChange}
            placeholder="What do you want to say"
        />
        <button type="submit">Submit</button>
    </form>
    )
}

export default page