require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const router = require("./api");

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({
    limit: "2mb",
    extended: true,
    parameterLimit: 5000
}));
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(helmet.noSniff());
app.use(cors({
    origin: /(http|https):\/\/([a-zA-Z][a-zA-Z0-9-.]+|(?:[0-9]{1,3}\.){3}[0-9]{1,3})(:[0-9]{1,5})?/,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Disposition'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use("/", router);

/** 404 */
app.use((req, res, next) => {
    next({ status: 404, message: "La ruta no fue encontrada" })
});

/** ERROR */
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    const status = error.code ? error.code : (error.status ? error.status : 500)
    res.status(status);
    res.json(error);
});

module.exports = app;