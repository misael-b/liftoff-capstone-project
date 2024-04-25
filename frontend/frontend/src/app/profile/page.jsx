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
    //window.localStorage.removeItem('user')
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

  const [domLoaded, setDomLoaded] = useState(false);
  

  const [products, setProducts] = useState([]);

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('user') !== null) {
      let user;
      useEffect(() => {
        setDomLoaded(true);
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
      }, []);

    } else {
      homePage()
    }
  }


  
  return (<Layout>
    {domLoaded && (
      <div>
    
    <div className="ProfileButtonContainer">
      <button onClick={handleLogout}>Logout</button>
    </div>

    <div className="ProfileButtonContainer">
      <button onClick={handleEdit}>Edit Profile</button>
    </div>
    
    
    <h1 style={{ color: "black", margin: 70, fontSize: 50 }}>Welcome {username} !</h1>

    <div style={{ float: "left", width: "80%", height: 100 }}>
      <p style={{ fontSize: 30 }}>View Your Posts: </p>
      <br></br>
      <table className="ShoppingCartTable">
        <thead>
          <tr>
            <th style={{ width: 200 }}>
              Picture
            </th>
            <th style={{ width: 200 }}>
              Name
            </th>
            <th style={{ width: 200 }}>
              Description
            </th >
            <th style={{ width: 200 }}>
              Category
            </th>
            <th style={{ width:200}}>
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
      <br></br>
      {(products.length == 0) && <p> No posts: <a href="http://localhost:3000/create-post" style={{ color: "blue" }}>Create A New Post Here</a> </p>}


    </div>

    <div style={{ float: "right",  width: "18%"}}>
      <p style={{ fontSize: 30 }}>Account Details: </p>
      <br></br>
      <p style={{ fontWeight: 900, fontSize: 18  }}>USERNAME : </p>
      <p>{username}</p>
      <p style={{ fontWeight: 900, fontSize: 18 }}>NAME : </p>
      <p>{ name}</p>
      <p style={{ fontWeight: 900, fontSize: 18 }}>EMAIL : </p>
      <p>{email}</p>
      
        </div>
      </div>
    )} 
    

  </Layout>

  )
  
  
  


  
}

export default page