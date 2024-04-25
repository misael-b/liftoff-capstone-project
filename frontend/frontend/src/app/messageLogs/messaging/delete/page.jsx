"use client";
import React, {useState} from 'react'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const page = () => {
    const [confirm, setConfirm] = useState(false);
    const searchParams = useSearchParams();
    const log = searchParams.get('log');
    const router = useRouter();

    const handleClick = () => {
        setConfirm(!confirm);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('user')).accessToken
        const AuthStr = 'Bearer '.concat(token);
        const payload = confirm;
        const response = await axios.delete(
            'http://localhost:8080/message/delete/' + payload + '!' + log,
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
        <p>Confirm Delete</p>
        <input 
            type="checkbox"
            name="message"
            onClick={handleClick}
            checked={confirm}
            onChange={handleClick}
        />
        <button type="submit">Submit</button>
    </form>
    )
}

export default page