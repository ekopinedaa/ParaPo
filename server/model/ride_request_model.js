const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const RideRequestSchema = new mongoose.Schema({
    ridereqid: {
        type: Number, // Change type to Number for auto-increment
        unique: true // Ensure riderreqid is unique
    },
    bookerid: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    riderid: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    rideprice: {
        type: String,
        required: true
    },
    rideconfirmation: {
        type: String,
        required: true
    }
})

// Apply the auto-increment plugin to RideRequestSchema
RideRequestSchema.plugin(AutoIncrement, { inc_field: 'ridereqid' })

const RideRequestModel = mongoose.model('ride_request', RideRequestSchema)
module.exports = RideRequestModel
