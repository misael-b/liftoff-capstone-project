"use client";
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Layout from '../../layout'

const Message = () => {
    useEffect(() => {
        fetchData()
    }, []);

    async function fetchData() {
        const {data} = await axios.get(
            'http://localhost:8080/message/read',

            {
                headers: {
                    //user token
                    accept: "*/*",
                    "Content-Type": "application/json",
                }
            }
        )
    }


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
        <div className="messageForm">
            <div className="messageLogArea">
                {

                }
            </div>

            <form onSubmit={handleSubmit}>
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
        </div>
    </Layout>
  )
}

export default Message