"use client"
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Layout from '../layout'

const page = () => {
    const [post, setPost] = useState({name: '', description: '', picture: '', category: '', price: '', id: 0})
    //name
    //description
    //picture
    //category
    //price

    // const payload = {
    //     name: post.name,
    //     description: post.description,
    //     picture: post.picture,
    //     category: post.category,
    //     price: post.price
    // }

    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('user')).accessToken;
        let AuthStr = 'Bearer '.concat(token);
        console.log('user: ' + localStorage.getItem('user'));
        let productId = localStorage.getItem('productId');
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
            setPost(res.data);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem('user')).accessToken
        const AuthStr = 'Bearer '.concat(token);
        
        try {
            const response = await axios.put(
                "http://localhost:8080/post",
                post,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                        Authorization: AuthStr
                    }
                }
            )

            window.location='/profile';
            console.log(response);
        } catch (e) {
            console.log("Product not saved", e);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost(prevPost => ({ ...prevPost, [name]: value}));
    };

    return (
      <Layout>
            <div>
                <form id="create-post" onSubmit={handleSubmit} style={{margin:70}}>
                    <label>Name: </label>
                    <input
                        type='text'
                        name='name'
                        value={post.name}
                        onChange={handleChange}
                        placeholder='Enter a name'
                        id='nameBox'
                    />
                    <label>Description: </label>
                    <input
                        type='text'
                        name='description'
                        value={post.description}
                        onChange={handleChange}
                        placeholder='Enter a description'
                        id='descriptionBox'
                    />
                    <label>Picture: </label>
                    <input
                        type='text'
                        name='picture'
                        value={post.picture}
                        onChange={handleChange}
                        placeholder='Enter a URL'
                        id='pictureBox'
                    />
                    <label>Category: </label>
                    <input
                        type='text'
                        name='category'
                        value={post.category}
                        onChange={handleChange}
                        placeholder='Enter a category'
                        id='categoryBox'
                    />
                    <label>Price: </label>
                    <input
                        type='text'
                        name='price'
                        value={post.price}
                        onChange={handleChange}
                        placeholder='Enter a price'
                        id='priceBox'
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
      </Layout>
    
  )
}

export default page