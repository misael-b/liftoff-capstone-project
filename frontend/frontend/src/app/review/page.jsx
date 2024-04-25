"use client"
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import css from './review.css'

const page = () => {
    const [review, setReview] = useState({name: '', description: '', rating: 5})

    let productId;
    let userId;
    let name;
    let token;
    let AuthStr;

    useEffect(() => {
        token = JSON.parse(localStorage.getItem('user')).accessToken;
        AuthStr = 'Bearer '.concat(token);
        console.log('user: ' + localStorage.getItem('user'));
        productId = localStorage.getItem('productId');
        userId = localStorage.getItem('userId');
        name = localStorage.getItem('name');
        console.log("product id =" + productId);
        console.log("user id =" + userId);
        console.log("name =" + name);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("The userId is now " + userId);
        userId = localStorage.getItem('userId');
        console.log("The userId is now " + userId);
        token = JSON.parse(localStorage.getItem('user')).accessToken;
        AuthStr = 'Bearer '.concat(token);
        try {
            const response = await axios.post(
                "http://localhost:8080/review/" + userId,
                review,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                        Authorization: AuthStr
                    }
                }
            )

            window.location='/product-info';
            console.log(response);
        } catch (e) {
            console.log("Review not saved", e);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setReview(prevReview => ({ ...prevReview, [name]: value}));
    };

    const handleRating = (event) => {
        setReview(prevReview => ({ ...prevReview, rating: Number(event.target.value)}));
        console.log("current review state: " + review);
    };

    return (
        <div style={{marginTop:'55px', color: 'black'}}>
            <p>Please leave a review for {name}:</p>
            <div className="rate">
                <input type="radio" id="star5" name="rate" value="5" onClick={handleRating}/>
                <label htmlFor="star5" title="text">5 stars</label>
                <input type="radio" id="star4" name="rate" value="4" onClick={handleRating}/>
                <label htmlFor="star4" title="text">4 stars</label>
                <input type="radio" id="star3" name="rate" value="3" onClick={handleRating}/>
                <label htmlFor="star3" title="text">3 stars</label>
                <input type="radio" id="star2" name="rate" value="2" onClick={handleRating}/>
                <label htmlFor="star2" title="text">2 stars</label>
                <input type="radio" id="star1" name="rate" value="1" onClick={handleRating}/>
                <label htmlFor="star1" title="text">1 star</label>
            </div>
            <br style={{clear:"both"}} />
            <form id="create-review" onSubmit={handleSubmit}>
                <textarea style={{borderWidth: '1px'}} onChange={handleChange} name="description"></textarea>
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default page;
