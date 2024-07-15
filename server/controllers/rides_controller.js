const Rides = require('../model/rides_model');

const RidesController = {
  // Create a new ride
  createRide: async (req, res) => {
    try {
      const newRide = new Rides(req.body);
      const savedRide = await newRide.save();
      res.status(201).json({
        success: true,
        data: savedRide,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Get all rides
  getRides: async (req, res) => {
    try {
      const rides = await Rides.find();
      res.status(200).json({
        success: true,
        data: rides,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Get a single ride by rideid
  getRideById: async (req, res) => {
    try {
      const ride = await Rides.findOne({ rideid: req.params.rideid });
      if (!ride) {
        return res.status(404).json({
          success: false,
          message: 'Ride not found',
        });
      }
      res.status(200).json({
        success: true,
        data: ride,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Update a ride by rideid
  updateRide: async (req, res) => {
    try {
      const updatedRide = await Rides.findOneAndUpdate(
        { rideid: req.params.rideid },
        req.body,
        { new: true }
      );
      if (!updatedRide) {
        return res.status(404).json({
          success: false,
          message: 'Ride not found',
        });
      }
      res.status(200).json({
        success: true,
        data: updatedRide,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // Delete a ride by rideid
  deleteRide: async (req, res) => {
    try {
      const deletedRide = await Rides.findOneAndDelete({ rideid: req.params.rideid });
      if (!deletedRide) {
        return res.status(404).json({
          success: false,
          message: 'Ride not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Ride deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = RidesController;
