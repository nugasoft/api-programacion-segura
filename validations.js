const Joi = require("joi");

const formatResponse = validationResult => {
    let res = {
        success: true,
        message: "Validado con éxito"
    };
    if (validationResult.error) {
        res = {
            success: false,
            error: {
                status: 500,
                message: `Los datos no pasaron la validación`,
                errors: validationResult.error.details
            }
        };
    }
    return res;
};

class Validations {
    signInValidation = (body) => {
        const rules = {
            email: Joi.string().email().required().min(6).label("Usuario"),
            password: Joi.string().min(6).max(16).required().label("Contraseña"),
        };

        const JoiSchema = Joi.object(rules)
            .options({ abortEarly: false });

        const result = JoiSchema.validate(body);
        return formatResponse(result);
    }

    signUpValidation = (body) => {
        const rules = {
            email: Joi.string().email().required().min(6).label("Usuario"),
            password: Joi.string().min(6).max(16).required().label("Contraseña"),
            nombre: Joi.string().min(3).max(16).required(),
            apellidos: Joi.string().min(3).max(16).required(),
        };

        const JoiSchema = Joi.object(rules)
            .options({ abortEarly: false });

        const result = JoiSchema.validate(body);
        return formatResponse(result);
    }
}

module.exports = new Validations;