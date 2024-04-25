"use client";
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Layout from '../../layout'
import { useSearchParams } from 'next/navigation';

const Message = () => {
    const searchParams = useSearchParams();
    const fetchedUser = searchParams.get('user');
    const fetchedOtherUser = searchParams.get('otherUser');
    const [message, setMessage] = useState({message: '', user: ''})
    const [log, setLog] = useState([]);
    const payload = {
        user: fetchedUser,
        otherUser: fetchedOtherUser
    }


    const payload2 = {
        message: message.message,
        user: fetchedUser
    }



    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user')).accessToken
        const AuthStr = 'Bearer '.concat(token);
        console.log(AuthStr);
            axios.get(
                'http://localhost:8080/message/read/' + fetchedOtherUser,
                payload, 
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                        Authorization: AuthStr,
                    }
                }
            ).then((res) => {
                console.log(res)
            })

            

            
        }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        
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