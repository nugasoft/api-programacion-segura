const rateLimit = require("express-rate-limit");

const LoginLimiter = rateLimit({
    windowMs: 60 * 5 * 1000, // 5 minutes
    max: 5, // Limit each IP to 5 requests per `window` (here, per 5 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    handler: (req, res, next, options) =>
        next({
            code: options.statusCode,
            message:
                "Su cuenta ha sido suspendida por 5 minutos por demasiados intentos inválidos. Por favor inténtelo más tarde.",
        }),
});

module.exports = LoginLimiter;
