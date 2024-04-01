"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

 function getAllPosts() {
    return axios.get("http://localhost:8080/list")
      
};



const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = axios.post("http://localhost:8080/ShoppingCart/add?Id=" + event.target.id)
    
    } catch (e) {
        console.log("error", e);
    }
}





export default function posts() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const response = await getAllPosts();
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
                            <th><img src={product.picture} width={200}/></th>
                            <th>{product.name}</th>
                            <th>{product.description}</th>
                            <th>{product.category}</th>
                            <th> ${product.price}</th>
                            <th>
                                {/* <form onSubmit={addToShoppingCart(product.id)} onsubmit="return false;">
                                    <p visibility hidden>
                                        <input value={product.id} name="id" />
                                    </p>
                                    <button type="submit" >Buy</button>
                                </form> */}
                                {/* <button onClick={addToShoppingCart(product.id)} value={product.id} type="button">Buy</button> */}
                                <form onSubmit={handleSubmit} id={product.id}>
                                    {/* <input
                                        name={product.id}
                                        value={product.id}
                                    /> */}
                                    <button type="submit">Buy</button>
                                </form>

                            </th>

                        </tr>
                        
                        
                    
                    ))}
                   
                </tbody>
            )}
        </table>



    </div>)
}
    

   




