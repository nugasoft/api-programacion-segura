const mysql = require("mysql2");

// Crear la conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    insecureAuth: true
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error(err);
        throw err;
    }
    console.log("Conectado a la base de datos MySQL");
});

module.exports = db;