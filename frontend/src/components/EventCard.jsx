import React from 'react';

function EventCard({ event, onEdit, onDelete }) {
  return (
    <>
      <div className='bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition border'>
        <h2 className="text-xl font-bold text-blue-600">{event.title}</h2>
        <p className="text-gray-600 mt-2">{event.description}</p>
        <div className="mt-3 text-sm text-gray-500">
          <p>
            <span className="font-semibold">Data: </span>{" "}
            {new Date(event.date).toDateString()}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {event.location}
          </p>
          <p>
            <span className="font-semibold">Created by:</span> {event.createdBy}
          </p>
        </div>

        <div className="flex gap-3 mt-4">
          {onEdit && (
            <button
              onClick={() => onEdit(event)}
              className='px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition'
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(event._id)}
              className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition'
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default EventCard;
