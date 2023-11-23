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
app.post("/contactos", (req, res) => {
	const { nombre, celular, correo } = req.body;
	const query = `INSERT INTO contactos (nombre, celular, correo, fechacreo) VALUES ('${nombre}', '${celular}', '${correo}')`;
	db.query(query, (err, result) => {
		if (err) throw err;
		res.status(201).send(`Contacto agregado con ID: ${result.insertId}`);
	});
});

// Endpoint para listar todos los contactos
app.get("/contactos", (req, res) => {
	const query = "SELECT * FROM contactos";
	db.query(query, (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

// Endpoint para obtener un contacto específico por ID
app.get("/contactos/:id", (req, res) => {
	const query = `SELECT * FROM contactos WHERE id = ${req.params.id}`;
	db.query(query, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

// Endpoint para actualizar un contacto
app.put("/contactos/:id", (req, res) => {
	const { nombre, celular, correo } = req.body;
	const query = `UPDATE contactos SET nombre = '${nombre}', celular = '${celular}', correo = '${correo}' WHERE id = ${req.params.id}`;
	db.query(query, (err, result) => {
		if (err) throw err;
		res.send(`Contacto con ID: ${req.params.id} actualizado`);
	});
});

// Endpoint para eliminar un contacto
app.delete("/contactos/:id", (req, res) => {
	const query = `DELETE FROM contactos WHERE id = ${req.params.id}`;
	db.query(query, (err, result) => {
		if (err) throw err;
		res.send(`Contacto con ID: ${req.params.id} eliminado`);
	});
});

app.listen(port, () => {
	console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
