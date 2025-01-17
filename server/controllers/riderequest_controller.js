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
            const { ridereqid } = req.params;
            const deletedRideRequest = await RideRequestModel.findOneAndDelete({ ridereqid });

            if (!deletedRideRequest) {
                return res.status(404).json({ success: false, message: 'Ride request not found' });
            }

            res.status(200).json({ success: true, data: deletedRideRequest });
        } catch (error) {
            console.log(error)
            res.status(500).send('Server Error');
        }
    },

    updateRideRequestById: async (req, res) => {
        try {
            const { ridereqid } = req.params;
            console.log("Received ridereqid:", ridereqid, "Type:", typeof ridereqid);
            const updateData = req.body;
    
            const parsedRidereqid = parseInt(ridereqid, 10);
            console.log("Parsed ridereqid:", parsedRidereqid, "Type:", typeof parsedRidereqid);
    
            if (isNaN(parsedRidereqid)) {
                return res.status(400).json({ success: false, message: 'Invalid ridereqid' });
            }
    
            const updatedRideRequest = await RideRequestModel.findOneAndUpdate(
                { ridereqid: parsedRidereqid },
                { $set: updateData },
                { new: true, runValidators: true }
            );
    
            if (!updatedRideRequest) {
                return res.status(404).json({ success: false, message: 'Ride request not found' });
            }
    
            res.status(200).json({ success: true, data: updatedRideRequest });
        } catch (error) {
            console.error('Error updating ride request:', error.message);
            res.status(500).json({ success: false, message: 'Server Error' });
        }
    },
}

module.exports = RideRequestController;