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

    const handleChange = (event) => {
        const {search, value} = event.target;
        setWord(prevWord => ({ ...prevWord, [search]: value}));
    };
  return (
    <form onSubmit={handleSearch}>
        <input
            type="text"
            name="search"
            value={word.search}
            onChange={handleChange}
            placeholder='Search:'
        />
        <button type="submit">Search</button>
    </form>
  )
}

export default search3