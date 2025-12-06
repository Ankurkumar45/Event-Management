import React from 'react';
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <div className='bg-linear-to-b from-gray-500 to-black flex shadow-md py-3 px-6 items-center justify-between'>
        <Link to="/" className='text-2xl font-bold text-amber-400'>EventHub</Link>
        <ul className='justify-center flex gap-8 p-3 rounded-md'>
          <li className='flex gap-8 text-[18px] text-white'>
            <Link to="/" className='hover:text-amber-300 font-medium'>Home</Link>
            <Link to="/events" className='hover:text-amber-300 font-medium'>Events</Link>
            <Link to="/create-event" className='hover:text-amber-300 font-medium'>Create Event</Link>
            <Link to="/login" className='hover:text-amber-300 font-medium'>Sign In</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
