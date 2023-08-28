import React from 'react';
import { NavLink } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import "./Navbar.css"


import { Navbar } from 'react-bootstrap';


const Navbarr = () => {
    return(
        <div>
        <Navbar className="navbar navbar-expand-lg bg-white py-3 shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4" to="#">Shop</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-3 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/form">Form</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/list">List</NavLink>
              </li>
            </ul>
            <div className="buttons">
                <NavLink to='/Signin' className='btn btn-outline-dark'>
                   <i className="fa fa-sign-in me-1"></i> Login</NavLink>
                <NavLink to='/Signup' className='btn btn-outline-dark ms-2'>
                   <i className="fa fa-user-plus me-1"></i> Register</NavLink>
            </div>
          </div>
        </div>
      </Navbar> 
        </div>
    )
}
export default Navbarr;