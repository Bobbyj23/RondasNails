const express = require('express');
const {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointmentById,
    deleteAppointment
} = require('../controllers/appointmentsController.js');
const validateAppointment = require('../../middleware/validateRequest.js');
const requestLogger = require('../../middleware/logger.js');

const router = express.Router();
router.use(requestLogger);

router.post('/create', validateAppointment, createAppointment); 
router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id', validateAppointment, updateAppointmentById);
router.delete('/:id', deleteAppointment);

module.exports = router;