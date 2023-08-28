import React from 'react'
import "./Home.css"
import Navbarr from '../components/Navbar';
function Homepage(){

    return(
        <div className='body'>
            <Navbarr/>
            <h1 className='title'>Main Page</h1>
        </div>
    );
}
export default Homepage