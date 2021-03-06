const express = require('express');
const morgan = require('morgan');
const cookie = require('cookie-parser');
const { connection } = require('./config/db');
const { PORT } = require('./config');

// Routes:
const auth = require('./routers/auth');
const user = require('./routers/user');

const app = express();
connection();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cookie());

// Usando rutas:
auth(app);
user(app);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Ecommerce API',
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
