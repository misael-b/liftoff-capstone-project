"use client";
import React, {useState} from 'react'
import css from '../../app/globals.css'
import Link from "next/link";
import Layout from "../layout"
//all of these links can be changed to whatever we need to later
const NavBar = () => {
  const [search, setSearch] = useState({searchTerm: ''})

  const handleChange = (event) => {
    const {name, value} = event.target;
    setSearch(prevSearch => ({ ...prevSearch, [name]: value}));
  };

  return (
    <> 
    <div className="navbar">
        <h2 id="teamName">teamName.set()</h2>
        <Link href='http://localhost:3000/profile'><img src="https://www.dropbox.com/scl/fi/p3jwfys2i99m6ypluwfww/Profile.png?rlkey=r3lppn8mj0msj5ventzkjya83&raw=1" alt="Profile" id="profile"/></Link>
        <Link href='http://localhost:3000/messageLogs'><img src="https://www.dropbox.com/scl/fi/fqpz76nfbr5f6jrynsqkm/Messaging.png?rlkey=76hpdxbpyefilk9qk28lkfklx&raw=1" alt="Messaging" id="messaging"/></Link>
        <Link href='http://localhost:3000/cart'><img src="https://www.dropbox.com/scl/fi/ft27qvt6060xemg8wk4sl/ShoppingCart.png?rlkey=f7yr3x9vgi62p5xerolsbdmg7&raw=1" alt="Cart" id="shoppingCart"/></Link>
        <Link href='http://localhost:3000/sell'><img src="https://www.dropbox.com/scl/fi/vsgur31od9bknpnvn2os0/Sell.png?rlkey=0a1h4lxy08h1pqbysjjz5u1bz&raw=1" alt="Sell" id="sell"/></Link>
        <div className="searchBar">
        <form>
          <input
            type="text"
            name="searchTerm"
            value={search.searchTerm}
            onChange={handleChange}
            placeholder="Search:"
            id="searchBox"
          />
          <button type="submit" id="searchButton" formAction="/list"><img src="https://www.dropbox.com/scl/fi/km2nz2wr64f15xx9b9mle/Search.png?rlkey=oh7i19rwkymzodgmyhf2k0f4t&raw=1" alt="Submit" id="submitButton"/></button>
        </form>
        </div>
    </div>
    </>
  )
}

export default NavBar