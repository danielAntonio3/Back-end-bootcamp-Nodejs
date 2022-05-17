const express = require('express');
const morgan = require('morgan');
const { connection } = require('./config/db');
const { PORT } = require('./config');

const app = express();
connection();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Ecommerce API',
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
