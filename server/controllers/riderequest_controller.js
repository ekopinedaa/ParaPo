const RideRequestModel = require('../model/ride_request_model')

const RideRequestController = {
    createRideRequest: async (req, res) => {
        try {
            const {
                bookerid,
                riderid,
                origin,
                destination,
                time,
                rideprice,
                rideconfirmation,
            } = req.body;

            // Create a new ride request instance
            const newRideRequest = new RideRequestModel({
                bookerid,
                riderid,
                origin,
                destination,
                time,
                rideprice,
                rideconfirmation,
            });

            // Save the ride request to the database
            const savedRideRequest = await newRideRequest.save();
            res.status(201).json({ success: true, data: savedRideRequest });
            console.log("Ride Request successful")
        } catch (error) {
            console.error('Error creating ride request:', error.message);
            res.status(500).send('Server Error');
        }
    },

    getRideRequests: async (req, res) => {
        try {
            const rideRequests = await RideRequestModel.find();
            console.log(rideRequests)
            res.status(200).json({ success: true, data: rideRequests });
        } catch (error) {
            console.error('Error fetching ride requests:', error.message);
            res.json({ success: false, error: 'Server Error' });
        }
    },

    getRideRequestById: async (req, res) => {
        try {
            const { id } = req.params;
            const rideRequest = await RideRequestModel.findById(id);

            if (!rideRequest) {
                return res.status(404).json({ success: false, message: 'Ride request not found' });
            }

            res.status(200).json({ success: true, data: rideRequest });
        } catch (error) {
            console.error('Error fetching ride request:', error.message);
            res.status(500).send('Server Error');
        }
    },

    deleteRideRequestById: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedRideRequest = await RideRequestModel.findByIdAndDelete(id);

            if (!deletedRideRequest) {
                return res.status(404).json({ success: false, message: 'Ride request not found' });
            }

            res.status(200).json({ success: true, data: deletedRideRequest });
        } catch (error) {
            console.error('Error deleting ride request:', error.message);
            res.status(500).send('Server Error');
        }
    },

    updateRideRequestById: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                bookerid,
                riderid,
                origin,
                destination,
                time,
                rideprice,
                rideconfirmation,
            } = req.body;

            const updatedRideRequest = await RideRequestModel.findByIdAndUpdate(
                id,
                { bookerid, riderid, origin, destination, time, rideprice, rideconfirmation },
                { new: true, runValidators: true }
            );

            if (!updatedRideRequest) {
                return res.status(404).json({ success: false, message: 'Ride request not found' });
            }

            res.status(200).json({ success: true, data: updatedRideRequest });
        } catch (error) {
            console.error('Error updating ride request:', error.message);
            res.status(500).send('Server Error');
        }
    },
}

module.exports = RideRequestController;