import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard'

function Events() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(res => setEvents(res.data))
      .catch(err => {
        console.log('Error fetching events:', err);
      }).finally(() => console.log('All events are fetched successfully...'));
  }, []);

  return (
    <>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) =>
          <EventCard key={event._id} event={event} />
        )}
      </div>
    </>
  );
}

export default Events;
