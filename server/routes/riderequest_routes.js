const express = require('express');
const router = express.Router();
const RideRequestController = require('../controllers/riderequest_controller')

//routes for Ride Requests
router.post('/AddRideRequest', RideRequestController.createRideRequest);
router.get('/GetRideRequest', RideRequestController.getRideRequests);
router.get('/GetRideRequest/:id', RideRequestController.getRideRequestById);
router.delete('/DeleteRideRequest/:ridereqid', RideRequestController.deleteRideRequestById);
router.put('/UpdateRideRequest/:ridereqid', RideRequestController.updateRideRequestById);

module.exports = router;