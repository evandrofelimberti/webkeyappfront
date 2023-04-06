
import {Link} from 'react-router-dom'
import logo from '../../img/costs_logo.png'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import React, { useState } from 'react';
import UseToken from './UseToken';

function Navbar(){

  const [nav, setNav] = useState(false);
  const { token, setToken } = UseToken();   
  
  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = ()=>{    
    localStorage.clear();
    window.location.href = '/';    
  }  
    return(
           
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white bg-black '>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>
            <Link to="/"> <img src={logo} alt={"Costs"} /> </Link>
        </h1>
          <ul className='hidden md:flex '>
                        <li className='p-4'>
                        <Link to="/">Home</Link>
                        </li>
                        <li className='p-4'>
                        <Link to="/projects">Projects</Link>
                        </li>
                        <li className='p-4'>
                        <Link to="/products">Products</Link>
                        </li>                        
                        <li className='p-4'>                    
                        <Link to="/company">Company</Link>
                        </li>
                        {token &&                        
                          <li className='p-4'>           
                          <Link onClick={handleLogout} to="/"> Logout</Link>
                          </li>
                        }                          
                        
          </ul>
          <div onClick={handleNav} className='block md:hidden'>
              {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
          </div>
          <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
            <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>
                <Link to="/"> <img src={logo} alt={"Costs"} /> </Link>
            </h1>
              <li className='p-4 border-b border-gray-600'><Link to="/" onClick={<AiOutlineClose size={20}/>} >Home</Link></li>
              <li className='p-4 border-b border-gray-600'><Link to="/projects" onClick={<AiOutlineClose size={20}/>} >Projects</Link></li>
              <li className='p-4 border-b border-gray-600'><Link to="/products" onClick={<AiOutlineClose size={20}/>} >Products</Link></li>              
              <li className='p-4 border-b border-gray-600'><Link to="/company" onClick={<AiOutlineClose size={20}/>} >Company</Link></li>
              <li className='p-4 border-b border-gray-600'><Link to="/contact" onClick={<AiOutlineClose size={20}/>} >Contact</Link></li>
              {token &&                        
                <li className='p-4'><Link onClick={handleLogout} to="/"> Logout</Link></li>
              }
          </ul>
    </div>       
    )
}

export default Navbar;
