"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from '../layout'
import { homePage, navigate } from '../actions'
import { redirect } from "react-router-dom";

function getAllShoppingCartPosts() {
  if (localStorage.getItem('user') !== null) {
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
    homePage();
    return null
  }

};

const page = () => {
  
  const [products, setProducts] = useState(null);
  const [domLoaded, setDomLoaded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('user')).accessToken
      const AuthStr = 'Bearer '.concat(token);

      const responseFromDelete = await axios.get("http://localhost:8080/ShoppingCart/remove?Id=" + event.target.id
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
  }


  useEffect(() => {
    const fetchData = async () => {
      setDomLoaded(true);

      try {
        const response = await getAllShoppingCartPosts();
        if (response !== null) {
          setProducts(response.data);
        } else {
          redirect("/login")
        }

      } catch (error) {
        console.log(error);
      } 
    };
    fetchData();
  }, []);

  return (<Layout>
    {domLoaded && (
    <div >
      {!products ? /* TODO: LOGIN PAGE REDIRECT */ <p style={{ margin: 70, color: "red" }}>PLEASE LOGIN TO VIEW SHOPPING CART</p> :
        <div>
          <h1 style={{margin:70, fontSize:30}}>Shopping Cart</h1>

          <table width='100%'>
            <thead>
              <tr>
                  <th></th>
                <th width='20%' >
                  Picture
                </th>
                <th>
                  Name
                </th>
                <th width='25%' >
                  Description
                </th>
                <th>
                  Category
                </th>
                <th>
                  Price
                </th>
                
              </tr>
            </thead>
            {(
              <tbody>
                {products.map((product) => (
                  <tr>
                    <th>

                      <form onSubmit={handleSubmit} id={product.id}>
                        <button type="submit" style={{ backgroundColor: "red", color: "white", width: 15, verticalAlign: "middle"}}>x</button>
                      </form>
                    </th>
                    <th><img src={product.picture} width={200} style={{ marginLeft: "auto", marginRight: "auto"}}/></th>
                    <th>{product.name}</th>
                    <th>{product.description}</th>
                    <th>{product.category}</th>
                    <th> ${product.price}</th>

                    

                  </tr>


                ))}
              </tbody>
            )}
          </table>
          {(products.length == 0) && <p> No Items in Shopping Cart: <a href="http://localhost:3000/posts" style={{ color: "blue" }}>View All products</a> </p>}
        </div>
      }
      </div>
    )} 
  </Layout>
  )
}

export default page