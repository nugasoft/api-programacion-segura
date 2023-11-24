const express = require("express");
const jwt = require("jsonwebtoken");

const app = express.Router();
const db = require('./db');

const auth = require('./middlewares/auth-jwt');
const LoginLimiter = require("./middlewares/login-limiter");
const bcrypt = require("bcryptjs");


// Endpoint para crear un nuevo usuario
app.post("/usuarios", async (req, res) => {
    const { email, password, nombre, apellidos } = req.body;
    const EncryptPass = await bcrypt.hash(password, 10);

    const query = `INSERT INTO usuarios (email, password, nombre, apellidos, fechacreo) VALUES (?, ?, ?, ?, NOW())`;
    db.query(query, [email, EncryptPass, nombre, apellidos], (err, result) => {
        if (err) throw err;
        res.status(200).send(`Usuario agregado con éxito`);
    });
});

// Endpoint para INICIAR SESIÖN
app.use('/login', LoginLimiter);
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const inputs = [email, password];
    const query = `SELECT * FROM usuarios WHERE email = ?;`;
    db.query(query, inputs, async (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            const user = result[0];
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                const EXPIRE_TOKEN = process.env.EXPIRE_TOKEN;

                const payload = {
                    email: user.email,
                    nombre: user.nombre,
                    apellidos: user.apellidos,
                };
                const token = jwt.sign(payload, process.env.JWT_KEY, {
                    expiresIn: EXPIRE_TOKEN,
                });
                res.status(200).send(token);
            } else {
                res.status(401).send(`Las credenciales no coinciden`);
            }
        } else {
            res.status(401).send(`Usuario no identificado`);
        }
    });
});

/**
 * USO DE MIDDLEWARE DE AUTENTICACIÓN
 */
app.use(auth);
// Endpoint para crear un nuevo contacto
app.get("/directorio", (req, res) => {
    const { nombre, celular, correo } = req.body;
    const query = "SELECT id, nombre, celular, correo, fechacreo FROM directorio";
    db.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Error interno del servidor" });
        } else {
            res.status(201).send(result);
        }
    });
});

// Endpoint para crear un nuevo contacto
app.post("/directorio", (req, res) => {
    const { nombre, celular, correo } = req.body;
    const query =
        "INSERT INTO directorio (nombre, celular, correo) VALUES (?, ?, ?)";
    db.query(query, [nombre, celular, correo], (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: "Error interno del servidor" });
        } else {
            res.status(201).send(`Contacto agregado`);
        }
    });
});

// Endpoint para actualizar un contacto
app.put("/directorio/:id", (req, res) => {
    const { nombre, celular, correo } = req.body;
    const query =
        "UPDATE directorio SET nombre = ?, celular = ?, correo = ? WHERE id = ?";
    db.query(query, [nombre, celular, correo, req.params.id], (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: "Error interno del servidor" });
        } else {
            res.send(`Contacto actualizado`);
        }
    });
});

// Endpoint para eliminar un contacto
app.delete("/directorio/:id", (req, res) => {
    const query = "DELETE FROM directorio WHERE id = ?";
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: "Error interno del servidor" });
        } else {
            res.send(`Contacto eliminado`);
        }
    });
});

module.exports = app;