import React from 'react';
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <>
      <div className='bg-white flex shadow-md py-3 px-6 items-center justify-between'>
        <Link to="/" className='text-2xl font-bold text-blue-600'>EventHub</Link>
        <ul className='justify-center flex gap-8 p-3 rounded-md'>
            <li className='flex gap-8 text-2xl'>
                <Link to="/" className='text-gray-700 hover:text-blue-600 font-medium'>Home</Link>
                <Link to="/events" className='text-gray-700 hover:text-blue-600 font-medium'>Events</Link>
                <Link to="/create-event" className='text-gray-700 hover:text-blue-600 font-medium'>Create Event</Link>
                <Link to="/register" className='text-gray-700 hover:text-blue-600 font-medium'>Register</Link>
                <Link to="/login" className='text-gray-700 hover:text-blue-600 font-medium'>Login</Link>
                <Link to="/" className='text-gray-700 hover:text-blue-600 font-medium'>Logout</Link>
            </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
