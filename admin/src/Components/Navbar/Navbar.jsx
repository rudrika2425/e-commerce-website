import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/company_logo_big.png'
import navProfile from '../../assets/nav-profile.svg'
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="company">
      <img  src={navlogo} alt=""  className="nav-logo"/>
      <h1>STYLISH CART</h1>
      </div>
        
        <img src={navProfile} className="nav-profile" alt="" />
         
        
    </div>
  )
}

export default Navbar
