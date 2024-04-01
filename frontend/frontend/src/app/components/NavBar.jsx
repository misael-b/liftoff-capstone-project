import React from 'react'
import css from './NavBar.css'
//all of these links can be changed to whatever we need to later
const NavBar = () => {
  return (
    <> 
    <div class="navbar">
        <a href='http://localhost:3000/profile'><img src="../images/Profile.jpg" alt="Profile" id="profile"/></a>
        <a href='http://localhost:3000/messaging'><img src="../images/Messaging.jpg" alt="Messaging" id="messaging"/></a>
        <a href='http://localhost:3000/shopping'><img src="../images/ShoppingCart.jpg" alt="Cart" id="shoppingCart"/></a>
        <a href='http://localhost:3000/sell' id="sell">Sell</a>
    </div>
    </>
  )
}

export default NavBar