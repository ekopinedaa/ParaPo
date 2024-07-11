const mongoose = require('mongoose')

const ExtraChargeSchema = new mongoose.Schema({
    ECID: {
        type: Number,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const ExtraChargeModel = mongoose.model('extracharge', ExtraChargeSchema)
module.exports = ExtraChargeModel