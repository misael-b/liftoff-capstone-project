"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const handleSubmit = async (event) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem('user')).accessToken
    const AuthStr = 'Bearer '.concat(token);
    try {
        const response = axios.get("http://localhost:8080/ShoppingCart/add?Id=" + event.target.id,
            {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: AuthStr
                },

            })

    } catch (e) {
        console.log("error", e);
    }
}



const page = () => {
    const searchParams = useSearchParams();

    const search = searchParams.get('searchTerm')

    // const [word, setWord] = useState({ search: '' })
    const [products, setProducts] = useState(null);
    const [searchWord, setSearchWord] = useState("");

    const handleSearch = async (search) => {
        // event.preventDefault();
        // console.log(word.search)
        try {
            const response = await axios.get(

                "http://localhost:8080/search?searchTerm=" + search,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json"
                    }

                }
            )

            if (response.status === 200) {
                setProducts(response.data)
                setSearchWord(search)
                // console.log(response.data)
            }
        } catch (e) {
            console.log("error", e);
        }
    }
    

    // console.log(search);
    
    
    handleSearch(search)

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setWord(prevWord => ({ ...prevWord, [name]: value }));
    // };





  return (
      <>
          <h1 style={{ margin: 50, fontSize: 40 }}> Search Results for: "{searchWord}"</h1>

          {(products != null) && (<table width='100%' >
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

              <tbody>
                  {products.map((product) => (
                      <tr>
                          <th><img src={product.picture} width={200} /></th>
                          <th>{product.name}</th>
                          <th>{product.description}</th>
                          <th>{product.category}</th>
                          <th> ${product.price}</th>
                          <th>
                              {!localStorage.getItem('user') ?
                                  <div><p>Login to purchage</p></div>
                                  :
                                  <div>
                                      <form onSubmit={handleSubmit} id={product.id}>
                                          <button type="submit">Buy</button>
                                      </form>
                                  </div>}


                          </th>

                      </tr>



                  ))}

              </tbody>

          </table>)}




      </>

  )
}

export default page