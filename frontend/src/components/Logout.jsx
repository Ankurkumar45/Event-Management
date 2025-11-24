import React from 'react';

function Logout() {
  return (
    <>
        <div className='max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-md border'>
            {localStorage.removeItem('token')}
            {window.location.href = '/login'}
        </div>
    </>
  );
}

export default Logout;
