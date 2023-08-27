import React from 'react'
import './navbar.scss';
const Navbar = () => {
  return (
    <nav>
      
      <h1>Finding Falcone !</h1>
      <img src="planet.svg"/> 
      <div className="nav-menu">
        <a href="/">Reset</a>
        <span>|</span>
        <a href="https://www.geektrust.com/" target='_blank'>GeekTrust Home</a>
      </div>

      
    </nav>
  )
}

export default Navbar