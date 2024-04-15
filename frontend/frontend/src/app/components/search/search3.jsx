"use client";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const handleSubmit = async (event) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem('user')).accessToken
    const AuthStr = 'Bearer '.concat(token);
    try {
        const response = axios.get("http://localhost:8080/ShoppingCart/add?Id=" + event.target.id,
            {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: AuthStr
                },

            })

    } catch (e) {
        console.log("error", e);
    }
}

const search3 = () => {
    const [word, setWord] = useState({ search: '' })
    const [products, setProducts] = useState(null);
    const loggedIn = localStorage.getItem('user');

    const handleSearch = async (event) => {
        event.preventDefault();
        // console.log(word.search)
        try {
            const response = await axios.get(
                
                "http://localhost:8080/search?searchTerm=" + word.search,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json"
                    }

                }
            )

            if (response.status === 200) {
                setProducts(response.data)
                console.log(response.data)
            }
        } catch (e) {
            console.log("error", e);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setWord(prevWord => ({ ...prevWord, [name]: value}));
    };

        return (
            <>
                <form onSubmit={handleSearch}>
                    <input 
                        type="text"
                        name="search"
                        value={word.search}
                        onChange={handleChange}
                        placeholder="Search:"
                    />
                    <button type="submit">Search</button>
                </form>

                {(products != null) && (<table width='100%' >
                    <thead>
                        <tr>
                            <th>
                                Picture
                            </th>
                            <th>
                                Name
                            </th>
                            <th width='20%' >
                                Description
                            </th>
                            <th>
                                Category
                            </th>
                            <th>
                                Price
                            </th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr>
                                <th><img src={product.picture} width={200} /></th>
                                <th>{product.name}</th>
                                <th>{product.description}</th>
                                <th>{product.category}</th>
                                <th> ${product.price}</th>
                                <th>
                                    {!loggedIn ?
                                        <div><p>Login to purchage</p></div>
                                        : 
                                    <div>
                                            <form onSubmit={handleSubmit} id={product.id}>
                                                <button type="submit">Buy</button>
                                            </form>
                                        </div>}


                                </th>

                            </tr>



                        ))}

                    </tbody>

                </table>)}




            </>
          )

  
}

export default search3