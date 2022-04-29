const { PORT } = require('./config/index');
const express = require('express');
const { connection } = require('./config/db');

// Iniciar base de datos
connection();

// iniciar el servidor
const app = express();

// parseo de json
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    ok: true,
    message: 'Hello World',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
