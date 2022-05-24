const { Router } = require('express');
const auth = require('./../services/auth');

function auths(app) {
  const authService = new auth();
  const router = new Router();

  app.use('/api/auth', router);

  router.post('/login', async (req, res) => {
    const result = await authService.login(req.body);
    const token = result.token;
    return res
      .cookie('token', token, {
        httpOnly: true,
        //maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false, //Solo disponible en https
        sameSite: 'none',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      })
      .send(result);
  });

  router.post('/signup', async (req, res) => {
    const result = await authService.signup(req.body);

    return res.status(result.error ? 400 : 200).json(result);
  });
}

module.exports = auths;
