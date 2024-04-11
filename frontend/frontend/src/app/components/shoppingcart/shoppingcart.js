"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function getAllShoppingCartPosts() {
    return axios.get("http://localhost:8080/ShoppingCart")
};


export default function shoppingCart() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            
            const responseFromDelete = axios.delete("http://localhost:8080/ShoppingCart/remove?Id=" + event.target.id);

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
            {!loading && (
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



    </div>)
}