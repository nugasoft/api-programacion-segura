const express = require("express");
const mysql = require("mysql");
const helmet = require("helmet");
const app = express();
const port = 3000;

app.use(express.json());
app.use(helmet());

// Crear la conexión a la base de datos
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Xdrake32*-",
	database: "taller",
	port: 3306,
});

// Conectar a la base de datos
db.connect((err) => {
	if (err) throw err;
	console.log("Conectado a la base de datos MySQL");
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
			res.status(201).send(`Contacto agregado con ID: ${result.insertId}`);
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
			res.send(`Contacto con ID: ${req.params.id} actualizado`);
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
			res.send(`Contacto con ID: ${req.params.id} eliminado`);
		}
	});
});

app.listen(port, () => {
	console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
