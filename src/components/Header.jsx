import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header(){
  
    return(
      <header>
      <Link className="site-logo" to="/">Rent a Car</Link>
      <nav>
          <NavLink 
              to="/host"
              className={({isActive}) => isActive ? "active-link" : null}
          >
              Host
          </NavLink>
          <NavLink 
              to="/about"
              className={({isActive}) => isActive ? "active-link" : null}
          >
              About
          </NavLink>
          <NavLink 
              to="/cars"
              className={({isActive}) => isActive ? "active-link" : null}
          >
              Cars
          </NavLink>
      </nav>
  </header>
    )
}
