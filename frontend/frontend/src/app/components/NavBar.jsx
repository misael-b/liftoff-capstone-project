"use client";
import React, {useState} from 'react'
import css from './NavBar.css'
//all of these links can be changed to whatever we need to later
const NavBar = () => {
  const [search, setSearch] = useState({search: ''})

  const handleSearch = () => {

  }

  const handleChange = () => {
      
  }

  return (
    <> 
    <div class="navbar">
        <a href='http://localhost:3000/profile'><img src="https://www.dropbox.com/scl/fi/p3jwfys2i99m6ypluwfww/Profile.png?rlkey=r3lppn8mj0msj5ventzkjya83&raw=1" alt="Profile" id="profile"/></a>
        <a href='http://localhost:3000/messaging'><img src="https://www.dropbox.com/scl/fi/fqpz76nfbr5f6jrynsqkm/Messaging.png?rlkey=76hpdxbpyefilk9qk28lkfklx&raw=1" alt="Messaging" id="messaging"/></a>
        <a href='http://localhost:3000/cart'><img src="https://www.dropbox.com/scl/fi/ft27qvt6060xemg8wk4sl/ShoppingCart.png?rlkey=f7yr3x9vgi62p5xerolsbdmg7&raw=1" alt="Cart" id="shoppingCart"/></a>
        <a href='http://localhost:3000/sell' id="sell">Sell</a>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="searchTerm"
            value={search}
            onChange={handleChange}
            placeholder="Search:"
          />
          <button type="submit">Submit</button>
        </form>
    </div>
    </>
  )
}

export default NavBar