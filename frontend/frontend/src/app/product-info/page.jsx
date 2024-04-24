"use client"
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Layout from '../layout'

const page = () => {
    let productId;

    let token;
    let AuthStr;

    const [product, setProduct] = React.useState([])
    const [user, setUser] = React.useState([])

    useEffect(() => {
        token = JSON.parse(localStorage.getItem('user')).accessToken;
        AuthStr = 'Bearer '.concat(token);
        console.log('user: ' + localStorage.getItem('user'));
        productId = localStorage.getItem('productId');
        console.log("product id =" + productId);

        axios.get(
          'http://localhost:8080/post/get/product/' + productId,
          {
            headers: {
              accept: "*/*",
              "Content-Type": 'application/json',
              Authorization: AuthStr
            }
          }
        ).then((res) => {
            console.log(res.data);
            setProduct(res.data);
        });

        axios.get(
            'http://localhost:8080/login/user',
            {
              headers: {
                accept: "*/*",
                "Content-Type": 'application/json',
                Authorization: AuthStr
              }
            }
          ).then((res) => {
              console.log(res.data);
              setUser(res.data);
           });
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(
                "http://localhost:8080/post/get/" + productId,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                    }
                }
            )

            window.location='/list';
            console.log(response);
        } catch (e) {
            console.log("Product not deleted", e);
        }
    }
      
    return (
        <div style={{marginTop:'55px'}}>
            <div style={{float:'left', color:'black'}}>
                <img src={product.picture} width={200} />
                <h2>{product.name}</h2>
                {product.description}<br/>
                {product.category}<br/>
                <b>${product.price}</b>
            </div> 
            { product?.user?.id == user?.id && user?.id && (
            <div style={{float:'right'}}>
                <form id={{productId}} onSubmit={handleDelete}>
                    <button type="submit">Delete Listing</button>
                </form>    
            </div>
            )}
        </div>
    )
}

export default page 