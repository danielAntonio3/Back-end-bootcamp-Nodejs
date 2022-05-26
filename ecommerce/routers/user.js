const { Router } = require('express');
const authValidation = require('../middleware/auth');
function users(app) {
  const router = new Router();

  app.use('/api/users', router);

  router.get('/', authValidation(2), (req, res) => {
    console.log(req.cookies);
    return res.json({
      success: true,
    });
  });
}

module.exports = users;
