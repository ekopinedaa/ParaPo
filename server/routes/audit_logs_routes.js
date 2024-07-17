const express = require('express');
const router = express.Router();
const AuditLogController = require('../controllers/audit_controller');

router.post('/Auditlog', AuditLogController.createAuditLog);
router.get('/getAllAuditlog', AuditLogController.getAllAuditLogs);
router.get('/getAuditlogById/:auditlogid', AuditLogController.getAuditLogById);