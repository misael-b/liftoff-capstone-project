"use client";
import React, {useState} from 'react'
import axios from 'axios';
import Layout from '../layout'

const Message = () => {
    const [message, setMessage] = useState({message: '', user: ''})

    const payload = {
        message: message.message,
        user: message.user
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //add code to check logged in token and then get user
        const response = await axios.post(
            "http:localhost:8080/message/create",
            payload,
            {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                }
            }
        )

        
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setMessage(prevMessage => ({ ...prevMessage, [name]: value}));
      };



  return (
    <Layout>
        <form className="messageForm" onSubmit={handleSubmit}>
            <input 
                type="text"
                name="message"
                value={message.message}
                onChange={handleChange}
                placeholder='What do you want to say?'
                id='messageField'
            />
            <button type='submit' id='messageSubmit'>Submit</button>
        </form>
    </Layout>
  )
}

export default Message