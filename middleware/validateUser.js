const Joi = require("joi");

const validateUser = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required().messages({
            "string.empty": "Name cannot be empty",
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name cannot exceed 50 characters",
            "any.required": "Name is required"
        }),
        email: Joi.string().email().required().messages({
            "string.empty": "Email cannot be empty",
            "string.email": "Invalid email format",
            "any.required": "Email is required"
        }),
        password: Joi.string().min(6).required().messages({
            "string.min": "Password must be at least 6 characters",
            "any.required": "Password is required"
        })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
    }

    next();
};

module.exports = validateUser;