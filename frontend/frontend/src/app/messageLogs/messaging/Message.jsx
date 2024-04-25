"use client";
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Layout from '../../layout'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
const Message = () => {
    const searchParams = useSearchParams();
    const fetchedUser = searchParams.get('user');
    const fetchedOtherUser = searchParams.get('otherUser');
    const [message, setMessage] = useState({message: '', user: ''})
    const [log, setLog] = useState([]);
    const [data, setData] = useState([]);
    const payload = {
        user: fetchedUser,
        otherUser: fetchedOtherUser
    }


    const payload2 = {
        message: message.message,
        user: fetchedUser,
        otherUser: fetchedOtherUser
    }



    useEffect(() => {
        loadData();      
        }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('user')).accessToken
        const AuthStr = 'Bearer '.concat(token);
        const response = await axios.post(
            'http://localhost:8080/message/create',
            payload2,
            {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: AuthStr,
                }
            }
        )

        if (response.status === 200) {
            loadData();
        }
        
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setMessage(prevMessage => ({ ...prevMessage, [name]: value}));
      };

    const loadData = () => {
        const token = JSON.parse(localStorage.getItem('user')).accessToken
        const AuthStr = 'Bearer '.concat(token);
        axios.get(
            'http://localhost:8080/message/read/' + fetchedUser + '!' + fetchedOtherUser,
            {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: AuthStr,
                }
            }
        ).then((res) => {
            setData(res.data);
        })
    }

  return (
    <Layout>
        <div className="messageForm">
            <div className="messageLogArea">
                {
                        data.map((item) => {
                            console.log(item)
                            if (item.user.username === fetchedUser) {
                                return (<div><p id="1">{item.message}</p>
                                    {/* <Link href={"http://localhost:3000/messageLogs/messaging/update?log=" + item.id}>Update</Link> */}
                                    <Link href={"http://localhost:3000/messageLogs/messaging/delete?log=" + item.id}>Delete</Link></div>)
                            } else if (item.user.username === fetchedOtherUser) {
                                return (<div><p id="2">{item.message}</p></div>)
                            } else {
                                return (<p>help</p>)
                            }
                        })
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