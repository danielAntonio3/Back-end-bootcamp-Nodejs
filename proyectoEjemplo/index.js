const express = require('express');
const { ENV, PORT } = require('./config');

const app = express();

let users = [];

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    users,
  });
});

app.post('/', (req, res) => {
  const user = req.body;
  users.push(user);
  return res.status(201).json({
    users,
  });
});

app.put('/:id', (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  users = users.map((user) => (user.id === id ? body : user));

  return res.status(200).json({
    users,
  });
});

app.delete('/:id', (req, res) => {
  const id = req.params.id;
  users = users.filter((user) => id !== user.id);
  return res.status(200).json({
    users,
  });
});

app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en ${ENV} en el puerto http://localhost:${PORT}`
  );
});
