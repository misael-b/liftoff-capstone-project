"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

 
const handleSearch = async (word) => {
    // event.preventDefault()
    if (word != null) {
        try {
            // console.log(word)
            return await axios.get("http://localhost:8080/search?searchTerm=" + word)

        } catch (e) {
            console.log("error", e);
        }
    }
    
}





export default function Search() { 
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            setLoading(false)
            try {
                const responseSearch = await handleSearch("bed")
                setProducts(responseSearch.data)
                // console.log(responseSearch.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
            } finally {
                
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (<div>
        <h1>Search</h1>

        <form onSubmit={handleSearch} id="searchTerm">
            <input type="text" id="searchTerm" name="searchTerm" onChange={(e)=>setInput(e.target.value)}></input>
            <button type="submit"> Search</button>
        </form>

        {(products != null ) && (<table width='100%' >
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



    </div>)

}