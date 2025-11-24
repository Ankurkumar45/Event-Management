const mongoose = require('mongoose');
// const User = require('../models/Users');
const Event = require('../models/Events');

// Create Event
const createEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;

        if (!title || !description || !date || !location) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const event = await Event.create({
            title,
            description,
            date,
            location,
            createdBy: req.user.id
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        console.log(events);
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Single Event
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Update Event
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        //Allow only the creator to update the event
        if (event.createdBy.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const { title, description, date, location } = req.body;
        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.location = location || event.location;

        const updatedEvent = await event.save();
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Delete Event
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        //Allow only the creator to delete the event
        if (event.createdBy.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await event.deleteOne();
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
};