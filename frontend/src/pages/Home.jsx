import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('http://localhost:5000/api/events?limit=6');
        if (!res.ok) throw new Error(`Failed to load (${res.status})`);
        const data = await res.json();
        if (!cancelled) setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setError('Could not load events.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen text-xl text-gray-600'>
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-black to-gray-500 text-gray-800">
      <header className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold text-amber-400 leading-tight">
            Plan. Promote. Attend.
          </h1>
          <p className="mt-4 text-amber-200 max-w-xl">
            Build memorable events, fill seats and manage attendees with an intuitive, easy-to-use interface.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/events" className="inline-block bg-amber-400 text-white px-5 py-3 rounded-lg shadow hover:bg-amber-300 transition">
              Browse Events
            </Link>
            <Link to="/create-event" className="inline-block border border-amber-600 text-amber-600 px-5 py-3 rounded-lg hover:bg-amber-50 transition">
              Create Event
            </Link>
          </div>
          <div className="mt-6 flex gap-6">
            <div>
              <div className="text-2xl font-bold text-amber-300">1.2k+</div>
              <div className="text-sm text-amber-200">Events hosted</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-300">8.4k+</div>
              <div className="text-sm text-amber-200">Attendees</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-300">4.9★</div>
              <div className="text-sm text-amber-200">Average rating</div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h3 className="text-lg font-semibold mb-3">Upcoming highlights</h3>

            {loading ? (
              <div className="text-gray-500">Loading events...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : events.length === 0 ? (
              <div className="text-gray-500">No upcoming events found.</div>
            ) : (
              <ul className="space-y-4">
                {events.slice(0, 6).map(ev => (
                  <li key={ev._id ?? ev.id} className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-md text-sm font-semibold">
                      {new Date(ev.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{ev.title}</div>
                      <div className="text-sm text-gray-500">{ev.location} · {new Date(ev.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 text-right">
              <Link to="/events" className="text-sm text-blue-600 hover:underline">View all events →</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-amber-400">Why choose EventHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow border">
              <h3 className="font-semibold mb-2">Easy Creation</h3>
              <p className="text-gray-600 text-sm">Create events quickly with a friendly form and rich options for time, location and capacity.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow border">
              <h3 className="font-semibold mb-2">Secure Access</h3>
              <p className="text-gray-600 text-sm">User accounts, role-based access and JWT authentication keep your events private and secure.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow border">
              <h3 className="font-semibold mb-2">Attendee Management</h3>
              <p className="text-gray-600 text-sm">Manage attendees, track capacity and send confirmations — all from one dashboard.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} EventManager — Built with care.
        </div>
      </footer>
    </div>
  );
}

export default Home;
