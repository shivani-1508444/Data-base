// routes/rooms.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/roomController');

router.post('/', controller.createRoom);        // create room
router.get('/', controller.getRooms);           // list rooms (filter by type/available)
router.get('/:id', controller.getRoomById);     // get room
router.put('/:id', controller.updateRoom);      // update room
router.delete('/:id', controller.deleteRoom);   // delete room

module.exports = router;
