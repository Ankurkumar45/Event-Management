const express = require('express');
const { protect } = require('../middleware/authMiddleware.js');
const eventController = require('../controllers/eventController.js');
const router = express.Router();

router.post('/', protect, eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', protect, eventController.updateEvent);
router.delete('/:id', protect, eventController.deleteEvent);

module.exports = router;