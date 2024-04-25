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
    const [domLoaded, setDomLoaded] = useState(false);
    const searchParams = useSearchParams();

    const search = searchParams.get('searchTerm')

    // const [word, setWord] = useState({ search: '' })
    const [products, setProducts] = useState([]);
    const [searchWord, setSearchWord] = useState("");

    const handleSearch = async (search) => {
        // event.preventDefault();
        // console.log(word.search)
        try {
            const response = await axios.get(

                "http://localhost:8080/search?searchTerm=" + search + "&sort=",
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
            }
        } catch (e) {
            console.log("error", e);
        }
    }
    
const handleView = async (event) => {
    event.preventDefault();

    localStorage.setItem('productId', event.target.id);
    window.location = '/product-info';
}

    function HandleChangle(event) {
        const { name, value } = event.target
        if (value) {
            try {
                // console.log("http://localhost:8080/list/" + sorting)
                const sortResponce = axios.get("http://localhost:8080/search?searchTerm=" + search + "&sort=" + value).then(
                    function (response) {
                        setProducts(response.data)
                    }
                )
            } catch (e) {
                console.log("error", e);
            } }

    }
    
    useEffect(() => {
        setDomLoaded(true);
        const fetchData = async () => { 
            handleSearch(search)
        };
        fetchData();
    }, []);
    
    
  return (
      <>
          {domLoaded && (
              <div>
          
          <h1 style={{ margin: 50, fontSize: 40 }}> Search Results for: "{searchWord}"</h1>

          <form>
              <label> Sort by:
                  <select name="sortBy" onChange={HandleChangle}>
                      <option value="">*Select One*</option>
                      <option value="desc">Price (High-Low)</option>
                      <option value="asc">Price (Low-High)</option>
                      <option value="category-asc">Category (A-Z)</option>
                      <option value="name-asc">Name (A-Z)</option>

                  </select>

              </label>

            </form>
                  <br /><br />

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
                          <th><a href="#" id={product.id} onClick={handleView}>{product.name}</a></th>
                          <th>{product.description}</th>
                          <th>{product.category}</th>
                          <th> ${product.price}</th>
                          <th>
                              {!localStorage.getItem('user') ?
                                  <div><p><a href='http://localhost:3000/login' style={{ color: "blue" }}>Login</a> to purchage</p></div>
                                  :
                                  <div>
                                      <form onSubmit={handleSubmit} id={product.id}>
                                          <button type="submit" class="buyButton"><span>Buy </span></button>
                                      </form>
                                  </div>}


                          </th>

                      </tr>
                  ))}

              </tbody>

                  </table>)}
                  {(products.length == 0) && (<p style={{ fontSize: 40 }}>No Results found.</p>)}

              </div>
          )} 
          
      </>

  )
}

export default page