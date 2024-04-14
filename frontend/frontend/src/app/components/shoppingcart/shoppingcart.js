"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "../login/login";

function getAllShoppingCartPosts() {
    if (localStorage.getItem('user').length > 0){
        const token = JSON.parse(localStorage.getItem('user')).accessToken


        const AuthStr = 'Bearer '.concat(token);
        return axios.get("http://localhost:8080/ShoppingCart"
            , {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: AuthStr
                },

            })
    } else {
        return null
    }
    
};


export default function shoppingCart() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem('user')).accessToken
            const AuthStr = 'Bearer '.concat(token);
            
            const responseFromDelete = axios.get("http://localhost:8080/ShoppingCart/remove?Id=" + event.target.id
                , {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                        Authorization: AuthStr
                    },

                })

        } catch (e) {
            console.log("error", e);
        } finally {
            const response = await getAllShoppingCartPosts();
            setProducts(response.data);
            
        }
        location.reload()
    }


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const response = await getAllShoppingCartPosts();
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (<div>
        <div >
            {!products ? /* TODO: LOGIN PAGE REDIRECT */ <p>NOT LOGGED IN REDIRECT TO LOGIN PAGE</p> :
                <div>
                    <h1>View All Posts</h1>

                    <table width='100%'>
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
                        {(
                            <tbody>
                                {products.map((product) => (
                                    <tr>
                                        <th><img src={product.picture} width={200} /></th>
                                        <th>{product.name}</th>
                                        <th>{product.description}</th>
                                        <th>{product.category}</th>
                                        <th> ${product.price}</th>

                                        <th>
                                        
                                            <form onSubmit={handleSubmit} id={product.id}>
                                                <button type="submit">Remove</button>
                                            </form>
                                        </th>

                                    </tr>


                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            }
        </div>
    </div>
    )
}