"use client";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const search3 = () => {
    const [word, setWord] = useState({ search: '' })
    const [products, setProducts] = useState(null);

    const handleSearch = async (event) => {
        event.preventDefault();
        console.log(word.search)
        try {
            const response = await axios.get(
                
                "http://localhost:8080/search?searchTerm=" + word.search,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json"
                    }

                }
            )

            if (response.status === 200) {
                setProducts(response.data)
                console.log(response.data)
            }
        } catch (e) {
            console.log("error", e);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setWord(prevWord => ({ ...prevWord, [name]: value}));
    };

        return (
            <>
                <form onSubmit={handleSearch}>
                    <input 
                        type="text"
                        name="search"
                        value={word.search}
                        onChange={handleChange}
                        placeholder="Search:"
                    />
                    <button type="submit">Search</button>
                </form>

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
                                    {/* <form onSubmit={addToShoppingCart(product.id)} onsubmit="return false;">
                                    <p visibility hidden>
                                        <input value={product.id} name="id" />
                                    </p>
                                    <button type="submit" >Buy</button>
                                </form> */}
                                    {/* <button onClick={addToShoppingCart(product.id)} value={product.id} type="button">Buy</button> */}
                                    {/* <form onSubmit={handleSubmit} id={product.id}> */}
                                    {/* <input
                                        name={product.id}
                                        value={product.id}
                                    /> */}
                                    {/* <button type="submit">Buy</button>
                                </form> */}

                                </th>

                            </tr>



                        ))}

                    </tbody>

                </table>)}




            </>
          )

  
}

export default search3