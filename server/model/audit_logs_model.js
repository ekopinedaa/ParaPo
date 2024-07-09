const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const AuditLogSchema = new mongoose.Schema({
    auditlogid: {
        type: Number,
        unique: true
    },
    userid: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    username: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'username',
    },
    userrole: {
        type: String
    },
    date: {
        type: Date
    },
    time: {
        type: String
    },
    action: {
        type: String
    }
})

// Apply the auto-increment plugin to RideRequestSchema
AuditLogSchema.plugin(AutoIncrement, { inc_field: 'auditlogid'})

const AuditLogModel = mongoose.model('audit_logs', AuditLogSchema)
module.exports = AuditLogModel