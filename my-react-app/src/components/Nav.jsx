import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Login from './Login';

export default function Nav() {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = ()=>{
    console.log('running');
    localStorage.clear('user');
    navigate('/signUp');
  }
  return (
    <>
    <div>
      { auth ? <ul className='nav-ul'>
        <img 
        className='logo'
        src="https://www.rinteractives.com/blog/wp-content/uploads/2022/08/Shopify-1.png" 
        alt="logo" 
        />
        <li><Link className='move' to="/">Products</Link></li>
        <li><Link to="/addproduct">Add products</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link onClick={logout} to="/signUp">LogOut ({(JSON.parse(auth).name)})</Link></li>
        </ul>
        :
        <ul className='nav-ul nav-right'>
        <img 
        className='logo'
        src="https://www.rinteractives.com/blog/wp-content/uploads/2022/08/Shopify-1.png" 
        alt="logo" 
        />
        <li><Link to="/signUp">Sign Up</Link></li>
        <li><Link to="/login">Log In</Link></li>
      </ul>
}
    </div>
    </>
  )
}
