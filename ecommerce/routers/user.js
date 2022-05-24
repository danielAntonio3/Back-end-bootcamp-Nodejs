const { Router } = require('express');

function users(app) {
  const router = new Router();

  app.use('/api/users', router);

  router.get('/', (req, res) => {
    //console.log(req.cookies);
    res.json({
      message: 'Welcome to the User API',
    });
  });
}

module.exports = users;
