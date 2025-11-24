import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EditEvent() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: ''
    });

    useEffect(() => {
        const load = async () => {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3000/api/events/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                setFormData({
                    title: data.title,
                    description: data.description,
                    date: data.date,
                    location: data.location
                });
            } else {
                console.error(data.error || "Failed to load event data.");
            }
        }
        load();
    }, [id]);

    const update = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/events/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (res.ok) {
            navigate(`/events/${id}`);
        } else {
            console.error(data.error || "Failed to update event.");
        }
    }

    return (
        <>
            <div className='p-6 max-w-xl mx-auto'>
                <form className='space-y-4 shadow-md p-4 rounded' onSubmit={update}>
                    <h2 className='text-2xl font-semibold mb-4'>Edit Event</h2>
                    <div className='flex flex-col'>
                        <label className='mb-1'>Title:</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className='border rounded p-2'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-1'>Description:</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className='border rounded p-2'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-1'>Date:</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className='border rounded p-2'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-1'>Location:</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className='border rounded p-2'
                        />
                    </div>
                    <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>Update Event</button>
                </form>
            </div>
        </>
    );
}

export default EditEvent;
