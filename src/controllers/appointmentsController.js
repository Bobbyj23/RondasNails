const appointment = require('../models/appointment') 
const createAppointment = async (req, res) => {
  const { date, username, description } = req.body;

  try {
     // Check if the user already has an appointment on the same date
     // maybe put this in a helper
     const existingAppointment = await Appointment.findOne({
        username: username,
        date: { $gte: new Date(date).setHours(0, 0, 0, 0), 
                $lt: new Date(date).setHours(23, 59, 59, 999) 
        }});

    if (existingAppointment) {
        return res.status(400).json({
            message: "User already has an appointment on this date. Please delete current appointment or choose a different date."
        });
    }

    const newAppointment = await Appointment.create({ date, username, description });

    res.status(201).json({
      message: "Appointment created successfully!",
      appointment: newAppointment
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating appointment",
      error: error.message
    });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching appointments",
      error: error.message
    });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const foundAppointment = await Appointment.findById(appointmentId);

    if (!foundAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(foundAppointment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment", error: error.message });
  }
};

const updateAppointmentById = async (req, res) => {
  const { id } = req.params;
  const { date, username, description } = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { date, username, description },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment updated successfully!",
      updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Error updating appointment", error: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).send({ message: "Appointment not found" });
    }

    res.status(200).send({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting appointment", error: error.message });
  }
};

module.exports = { 
    createAppointment, 
    getAppointments, 
    getAppointmentById, 
    deleteAppointment, 
    updateAppointmentById
  };