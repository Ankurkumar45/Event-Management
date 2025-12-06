import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Event created successfully!");
        setFormData({
          title: '',
          description: '',
          date: '',
          location: ''
        });
        navigate('/events');
      } else {
        setMessage(data.error || "Failed to create event.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl border'>
        <h1 className='text-center text-2xl font-bold text-blue-600 mb-4'>Create New Event</h1>
        {message && <div className='mb-4 p-3 bg-green-100 text-green-800 rounded'>{message}</div>}

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='title'>Event Title:</label>
            <input
              type='text'
              id='title'
              className='w-full p-2 border border-gray-300 rounded'
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='description'>Description:</label>
            <textarea
              id='description'
              className='w-full p-2 border border-gray-300 rounded'
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='date'>Date:</label>
            <input
              type='date'
              id='date'
              className='w-full p-2 border border-gray-300 rounded'
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='location'>Location:</label>
            <input
              type='text'
              id='location'
              className='w-full p-2 border border-gray-300 rounded'
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateEvent;
