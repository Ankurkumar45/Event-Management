import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Registration successful! You can now log in.");
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    role: ''
                });
                navigate('/login');
            } else {
                setMessage(data.error || "Registration failed. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className='max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-md border'>
                <h1 className='text-3xl font-bold text-blue-600 text-center mb-6'>Register</h1>

                {message && <div className='mb-4 p-3 bg-green-100 text-green-800 rounded'>{message}</div>}
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label className='block text-gray-700 mb-2' htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 mb-2' htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 mb-2' htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 mb-2' htmlFor='role'>Role:</label>
                        <select
                            id='role'
                            name='role'
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'
                        >
                            <option value=''>Select Role</option>
                            <option value='user'>User</option>
                            <option value='admin'>Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
                        Login
                    </button>
                </p>
            </div>
        </>
    );
}

export default Register;
