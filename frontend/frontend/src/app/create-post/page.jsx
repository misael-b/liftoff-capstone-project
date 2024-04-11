"use client"
import React, {useState} from 'react'

const page = () => {
    const [post, setPost] = useState({name: '', description: '', picture: '', category: '', price: ''})
    //name
    //description
    //picture
    //category
    //price

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost(prevPost => ({ ...prevPost, [name]: value}));
      };

  return (
    <div>
        <form>
            <input
                type='text'
                name='name'
                value={post.name}
                onChange={handleChange}
                placeholder='What is the name of this:'
                id='nameBox'
            />
            <input
                type='text'
                name='description'
                value={post.description}
                onChange={handleChange}
                placeholder='Enter a description:'
                id='descriptionBox'
            />
        </form>
    </div>
  )
}

export default page