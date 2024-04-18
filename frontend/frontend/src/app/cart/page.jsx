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
        if (response !== null) {
          setProducts(response.data);
        } else {
          redirect("/login")
        }
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (<Layout>
    <div >
      {!products ? /* TODO: LOGIN PAGE REDIRECT */ <p style={{margin: 70, color: "red"}}>PLEASE LOGIN TO VIEW SHOPPING CART</p> :
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
  </Layout>
  )
}

export default page