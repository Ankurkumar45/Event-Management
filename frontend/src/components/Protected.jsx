import React from 'react';
import { Navigate } from 'react-router-dom';

function Protected() {

    const protectedRoute = ({ children }) => {
        const token = localStorage.getItem('token');

        return token ? children : <Navigate to="/login" />;
    }

    return (
        <>
            {protectedRoute}
        </>
    );
}

export default Protected;
