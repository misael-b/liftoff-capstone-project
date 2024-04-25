"use client"
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import css from './page.css'

const page = () => {
    let productId;

    let token;
    let AuthStr;

    const [product, setProduct] = React.useState([])
    const [user, setUser] = React.useState([])
    const [reviews, setReviews] = useState(null);

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
              axios.get(
                'http://localhost:8080/review/' + res.data.id,
                {
                  headers: {
                    accept: "*/*",
                    "Content-Type": 'application/json',
                    Authorization: AuthStr
                  }
                }
              ).then((res) => {
                  console.log(res.data);
                  setReviews(res.data);
               });
           });
    }, []);

    
    const handleReview = async (event) => {
        event.preventDefault();
        localStorage.setItem('productId', product.id);
        localStorage.setItem('userId', event.target.id);
        window.location = '/review';
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

            {(reviews != null) && (<table className="review-table" style={{border:'1px solid black'}} width='100%' >
              <thead>
                  <tr>
                    <th>Rating</th>
                    <th width='80%'>Description</th>
                  </tr>
              </thead>
              <tbody>
                  {reviews.map((review) => (
                      <tr>
                          <td>{review.rating}</td>
                          <td>{review.description}</td>
                      </tr>
                  ))}
              </tbody>
            </table>)}            

            <div style={{float:'right'}}>
            <form id={user.id} onSubmit={handleReview}>
                    <button type="submit">Leave a review<br/>for a user</button>
                </form>
            {/* { product?.user?.id == user?.id && user?.id && (
                <form id={{productId}} onSubmit={handleDelete}>
                    <button type="submit">Delete Listing</button>
                </form>    
            )} */}
            </div>
        </div>
    )
}

export default page 