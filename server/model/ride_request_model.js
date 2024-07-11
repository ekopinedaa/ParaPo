const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const RideRequestSchema = new mongoose.Schema({
    ridereqid: {
        type: Number, // Change type to Number for auto-increment
        unique: true // Ensure riderreqid is unique
    },
    bookerid: {
        type: Number,
    },
    riderid: {
        type: Number,
    },
    origin: {
        type: String,
    },
    destination: {
        type: String,
    },
    time: {
        type: String,
    },
    rideprice: {
        type: String,
    },
    rideconfirmation: {
        type: String,
    }
})

// Apply the auto-increment plugin to RideRequestSchema
RideRequestSchema.plugin(AutoIncrement, { inc_field: 'ridereqid' })

const RideRequestModel = mongoose.model('ride_requests', RideRequestSchema)
module.exports = RideRequestModel
