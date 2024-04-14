"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";


 function getAllPosts() {
    return axios.get("http://localhost:8080/list")
      
};



const handleSubmit = async (event) => {
    const token = JSON.parse(localStorage.getItem('user')).accessToken
    const AuthStr = 'Bearer '.concat(token);
    console.log(AuthStr)
    event.preventDefault();
    try {
        axios.get("http://localhost:8080/ShoppingCart/add?Id=" + event.target.id
            , {
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

    function HandleChangle(event) {
        const { name, value } = event.target
        console.log(value)
        try {
            // console.log("http://localhost:8080/list/" + sorting)
            const sortResponce = axios.get("http://localhost:8080/list/" + value).then(
                function (response) {
                    setProducts(response.data)
                }
            )
        } catch (e) {
            console.log("error", e);
        }
        
        
        

    }



    return (<div>
        <h1>View All Posts</h1>

        <form>
            <label> Sort by:
                <select name="sortBy" onChange={HandleChangle}>
                    <option value="">*Select One*</option>
                    <option value="desc">Price (High-Low)</option>
                    <option value="asc">Price (Low-High)</option>
                    <option value="category-asc">Category (A-Z)</option>
                    <option value="name-asc">Name (A-Z)</option>

                </select>

            </label>

        </form>




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
                                
                                <form onSubmit={handleSubmit} id={product.id}>
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
    

   




