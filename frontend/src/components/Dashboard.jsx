import React, { useEffect, useState } from 'react';

function Dashboard() {

    const [events, setEvents] = useState([]);

    const loadEvents = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/events', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        setEvents(await res.json());
    }

    useEffect(() => {
        loadEvents();
    }, []);

    return (
        <>
            <div className='max-w-4xl mx-auto mt-12'>
                <h1 className='text-3xl font-bold text-blue-600 text-center mb-6'>Dashboard</h1>
                {events.length === 0 ? (
                    <p className='text-center text-gray-600'>No events available.</p>
                ) : (
                    <ul className='space-y-4'>
                        {events.map((event) => (
                            <li key={event.id} className='p-4 border rounded-md shadow-sm'>
                                <h2 className='text-xl font-semibold text-gray-800'>{event.title}</h2>
                                <p className='text-gray-600'>{event.description}</p>
                                <p className='text-sm text-gray-500'>Date: {new Date(event.date).toLocaleDateString()}</p>
                                <p className='text-sm text-gray-500'>Date: {event.location}</p>
                                {/* <p className='text-sm text-gray-500'>Date: {event.createdBy}</p> */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default Dashboard;
