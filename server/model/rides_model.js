const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const RidesSchema = new mongoose.Schema({
    rideid: {
        type: Number, // Change type to Number for auto-increment
        unique: true // Ensure rideid is unique
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
    ridetotal: {
        type: String,
        required: true
    }
})

// Apply the auto-increment plugin to RidesSchema
RidesSchema.plugin(AutoIncrement, { inc_field: 'rideid' })

const RidesModel = mongoose.model('rides', RidesSchema)
module.exports = RidesModel
