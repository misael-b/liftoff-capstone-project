"use client";
import React, {useState} from 'react'
import axios from 'axios';

const search3 = () => {
    const [word, setWord] = useState({search: ''})

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(
                "http://localhost:8080/search?searchTerm=" + "tv",
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json"
                    }

                }
            )

            if (response.status === 200) {
                console.log(response)
            }
        } catch (e) {
            console.log("error", e);
        }
    }
  return (
    <div>search3</div>
  )
}

export default search3