const Joi = require("joi");

const validateAppointment = (req, res, next) => {
    const schema = Joi.object({
        date: Joi.date().greater("now").required().messages({
            "date.base": "Date must be a valid date",
            "date.greater": "Date must be in the future",
            "any.required": "Date is required"
        }),
        username: Joi.string().min(3).max(20).required().messages({
            "string.empty": "Username cannot be empty",
            "string.min": "Username must be at least 3 characters",
            "string.max": "Username cannot exceed 20 characters",
            "any.required": "Username is required"
        })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
    }

    next();
};

module.exports = validateAppointment;