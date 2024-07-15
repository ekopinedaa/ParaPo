const express = require('express');
const router = express.Router();
const RidesController = require('../controllers/rides_controller')

//routes for Rides
router.post('/AddRide', RidesController.createRide);
router.put('/UpdateRide/:rideid', RidesController.updateRide);
router.get('/GetAllRides', RidesController.getRides);
router.get('/getRidebyID/:rideid', RidesController.getRideById);
router.delete('/DeleteRide/:rideid', RidesController.deleteRide);

module.exports = router;