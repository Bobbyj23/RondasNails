const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        index: true,
        validate: {
            validator: function(value) {
                return value > new Date(); 
            },
            message: "Appointment date must be in the future"
        }
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters"],
        maxlength: [20, "Username cannot exceed 20 characters"]
    },
    description: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;