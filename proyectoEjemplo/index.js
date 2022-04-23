const express = require('express');
const { ENV, PORT } = require('./config');

const app = express();
const users = [];

app.get('/', (req, res) => {
  return res.json({
    users,
  });
});

app.post('/', (req, res) => {
  const user = req.body;
  users.push(user);
  return res.json({
    users,
  });
});

app.put('/:id', (req, res) => {
  /* const user = req.body;
  const id = req.params.id;
  users.map((user, index) => {
    if (user.id === id) {
    }
  }); */
  return res.json({
    users,
  });
});

app.delete('/:id', (req, res) => {
  const id = req.params.id;
  users.filter((user) => user.id !== id);
  return res.json({
    users,
  });
});

app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en ${ENV} en el puerto http://localhost:${PORT}`
  );
});
