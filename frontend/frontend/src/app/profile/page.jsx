"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from '../layout'
import { homePage, updateUserInfo } from "../actions";

async function handleLogout(event) {
  event.preventDefault();
  try {
    const token = JSON.parse(localStorage.getItem('user')).accessToken
    const AuthStr = 'Bearer '.concat(token);
    window.localStorage.removeItem('user')
  } catch (e) {
    console.log("Sign in to logout", e);
  }
  finally {
    homePage()
  }
}
async function handleEdit(event) {
  event.preventDefault();
  updateUserInfo()
}





const page = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('user') !== null) {
      let user;
      useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user')).accessToken
        const AuthStr = 'Bearer '.concat(token);
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
          user = res.data
          setUsername(user.username)
          setName(user.name)
          setEmail(user.email)


        })
        axios.get(
          'http://localhost:8080/post/user-posts',
          {
            headers: {
              accept: "*/*",
              "Content-Type": 'application/json',
              Authorization: AuthStr
            }
          }
        ).then((res) => {
          setProducts(res.data)


        })
      }, []);

    } else {
      homePage()
    }
  }


  

  return (<Layout>
    
    <div className="createPostButtonContainer">
      <button onClick={handleLogout}>Logout</button>
    </div>

    <div className="createPostButtonContainer">
      <button onClick={handleEdit}>Edit Profile</button>
    </div>
    
    
    <p style={{ color: "black", margin: 70 }}>Welcome {username} !</p>

    <div>
      <h1>View Your Posts: </h1>

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
          </tr>
          
        </thead>
        {((products !== null)&&
          <tbody>
            {products.map((product) => (
              <tr>
                <th><img src={product.picture} width={200} /></th>
                <th>{product.name}</th>
                <th>{product.description}</th>
                <th>{product.category}</th>
                <th> ${product.price}</th>

              </tr>



            ))}

          </tbody>
        )}
      </table>

      {products === null ? <p> No posts: <a href="http://localhost:3000/create-post">Create A New Post Here</a> </p> : <> </>}


    </div>
    

  </Layout>

  )
  
  
  


  
}

export default page