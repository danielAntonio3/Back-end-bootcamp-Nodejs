const express = require('express');

const { PORT } = require('./config/index');
const { connection } = require('./config/db');

// importación de routes
const Users = require('./routers/user');
const Auths = require('./routers/auth');
const Categories = require('./routers/category');
const jobs = require('./routers/job');

// Iniciar base de datos
connection();

// iniciar el servidor
const app = express();

// parseo de json
app.use(express.json());

Users(app);
Auths(app);
Categories(app);
jobs(app);

app.get('/', (req, res) => {
  return res.status(200).json({
    ok: true,
    message: 'Hello World',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
