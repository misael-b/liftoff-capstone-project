"use client"
import React, {useState} from 'react'
import axios from 'axios'

const page = () => {
    const [post, setPost] = useState({name: '', description: '', picture: '', category: '', price: ''})
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8080/post",
                post,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
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
    <div>
        <form id="create-post" onSubmit={handleSubmit}>
            <label for="nameBox">Name: </label>
            <input
                type='text'
                name='name'
                value={post.name}
                onChange={handleChange}
                placeholder='Enter a name'
                id='nameBox'
            />
            <label for="descriptionBox">Description: </label>
            <input
                type='text'
                name='description'
                value={post.description}
                onChange={handleChange}
                placeholder='Enter a description'
                id='descriptionBox'
            />
            <label for="pictureBox">Picture: </label>
            <input
                type='text'
                name='picture'
                value={post.picture}
                onChange={handleChange}
                placeholder='Enter a URL'
                id='pictureBox'
            />
            <label for="categoryBox">Category: </label>
            <input
                type='text'
                name='category'
                value={post.category}
                onChange={handleChange}
                placeholder='Enter a category'
                id='categoryBox'
            />
            <label for="priceBox">Price: </label> 
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
  )
}

export default page