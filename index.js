const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

app.use(express.json());

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
	const query = `INSERT INTO directorio (nombre, celular, correo, fechacreo) VALUES ('${nombre}', '${celular}', '${correo}')`;
	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(201).send(`Contacto agregado con ID: ${result.insertId}`);
	});
});

// Endpoint para listar todos los directorio
app.get("/directorio", (req, res) => {
	const query = "SELECT * FROM directorio";
	db.query(query, (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

// Endpoint para obtener un contacto específico por ID
app.get("/directorio/:id", (req, res) => {
	const query = "SELECT * FROM directorio WHERE id = " + req.params.id;

	db.query(query, (err, result) => {
		if (err) {
			console.error(err.message);
			res.status(500).json({ error: "Error interno del servidor" });
		} else {
			res.json(result);
		}
	});
});

// Endpoint para actualizar un contacto
app.put("/directorio/:id", (req, res) => {
	const { nombre, celular, correo } = req.body;
	const query = `UPDATE directorio SET nombre = '${nombre}', celular = '${celular}', correo = '${correo}' WHERE id = ${req.params.id}`;
	db.query(query, (err, result) => {
		if (err) throw err;
		res.send(`Contacto con ID: ${req.params.id} actualizado`);
	});
});

// Endpoint para eliminar un contacto
app.delete("/directorio/:id", (req, res) => {
	const query = `DELETE FROM directorio WHERE id = ${req.params.id}`;
	db.query(query, (err, result) => {
		if (err) throw err;
		res.send(`Contacto con ID: ${req.params.id} eliminado`);
	});
});

app.listen(port, () => {
	console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
