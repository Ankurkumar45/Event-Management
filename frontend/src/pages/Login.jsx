import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Login failed. Please try again.");
                return;
            }

            const token = data.token;
            console.log("Login successful. Token:", token);

            if (!token) {
                setMessage("Login failed. No token received.");
                return;
            }
            localStorage.setItem('token', token);
            setMessage("Login successful!");
            navigate('/');
        } catch (error) {
            setMessage(error.message || "An error occurred. Please try again.");

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-md border'>
            <h1 className='text-3xl font-bold text-blue-600 text-center mb-6'>Login</h1>
            {message && <div className='mb-4 p-3 bg-green-100 text-green-800 rounded'>{message}</div>}
            <form onSubmit={handleSubmit} className='space-y-5'>
                <div>
                    <label className='block text-gray-700 mb-2' htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div>
                    <label className='block text-gray-700 mb-2' htmlFor='password'>Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        name='password'
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="mt-2 text-sm text-blue-600 hover:underline cursor-pointer"
                    >
                        {showPassword ? 'Hide Password' : 'Show Password'}
                    </button>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default Login;
