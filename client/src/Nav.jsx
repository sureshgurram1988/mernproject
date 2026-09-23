import React,{useContext} from 'react'
import{Link} from "react-router-dom"
import {store} from "./App"


const Nav = () => {
  const[token] = useContext(store)
  return (
    <nav className="app-nav">
      <div className="app-nav-inner">
        <Link className="app-brand" to="/">Northstar</Link>
        {!token && (
          <ul className="app-nav-list">
            <li><a className="app-nav-link" href="/#home">Home</a></li>
            <li><a className="app-nav-link" href="/#about">About</a></li>
            <li><a className="app-nav-link" href="/#services">Services</a></li>
          </ul>
        )}
        {!token && (
          <div className="app-nav-actions">
            <Link className="app-nav-login" to="/login">Login</Link>
            <Link className="app-nav-cta" to="/register">Get started</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav
