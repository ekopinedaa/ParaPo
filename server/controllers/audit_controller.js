const AuditLogModel = require('../model/audit_logs_model')

const AuditLogController = {
    createAuditLog: async (req, res) => {
        const { userid, username, userrole, action } = req.body;

        try {
            const newAuditLog = new AuditLogModel({
                userid,
                username,
                userrole,
                action,
                date: new Date(), // Automatically set the current date and time
                time: new Date().toLocaleTimeString()
            });

            const savedAuditLog = await newAuditLog.save();
            res.status(201).json(savedAuditLog);
        } catch (error) {
            res.status(500).json({ error: 'Error creating audit log entry' });
        }
    },

    // Read all audit log entries
    getAllAuditLogs: async (req, res) => {
        try {
            const auditLogs = await AuditLogModel.find();
            res.status(200).json(auditLogs);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching audit log entries' });
        }
    },

    // Read a specific audit log entry by ID
    getAuditLogById: async (req, res) => {
        const { auditlogid } = req.params;

        try {
            const auditLog = await AuditLogModel.findById(auditlogid);
            if (!auditLog) {
                return res.status(404).json({ error: 'Audit log entry not found' });
            }
            res.status(200).json(auditLog);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching audit log entry' });
        }
    }
}

module.exports = AuditLogController