const app = require("./app");

app.listen(process.env.PORT, () => {
	console.log(`Servidor ejecutándose en http://localhost:${process.env.PORT}`);
});
