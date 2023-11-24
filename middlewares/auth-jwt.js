
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const hasToken = req.body.token || req.query.token || req.headers["authorization"];

    if (!hasToken) {
        next({
            code: 401,
            message: "¡Autenticación incorrecta, favor de verificar la sesión!",
            success: true,
            results: false,
            user: [],
            error:
                "¡El token no fue enviado, tipo-header: authorization, tipo-autorizacion:  bearer token!",
        });
    }
    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
            if (err) {
                next({
                    code: 401,
                    message: "¡Autenticación incorrecta, favor de renovar la sesión!",
                    success: true,
                    results: false,
                    user: [],
                    error: err.message,
                });
            } else {
                req.user = decoded;
            }
        })
    } catch (error) {
        next({
            code: 401,
            message: "¡Autenticación incorrecta, favor de verificar la sesión!",
            success: false,
            results: false,
            user: [],
            error: error.message,
        });
    }

    return next();
}

module.exports = verifyJWT;