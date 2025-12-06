import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function Protected({ children }) {

    const [auth, setAuth] = useState(null);

    const protectedRoute = () => {
        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                setAuth(false);
                return;
            }

            fetch('http://localhost:5000/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
                .then(res => {
                    if (res.status === 200) return setAuth(true);
                    setAuth(false);
                })
                .catch(() => setAuth(false));

        }, []);

        if (auth === null) return <p>Checking authentication...</p>
        if (auth === false) {
            return <Navigate to="/login" />
        }
        return children;
    }

    return (
        <>
            {protectedRoute}
        </>
    );
}

export default Protected;
