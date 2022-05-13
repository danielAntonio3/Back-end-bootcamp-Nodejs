const { Router } = require('express');
const { authValidation, acceptRoles } = require('../middleware/authValidation');
const User = require('./../services/user');
const Job = require('./../services/job');

function Users(app) {
  const userService = new User();
  const JobService = new Job();
  const router = new Router();

  app.use('/api/users', router);

  router.get('/', [authValidation, acceptRoles('admin')], async (req, res) => {
    const users = await userService.getAllUsers();
    return res.status(200).json({
      data: users,
    });
  });

  router.get(
    '/jobs',
    [authValidation, acceptRoles('applicant')],
    async (req, res) => {
      const users = await userService.getUserJobs({ _id: req.user.id });
      return res.status(200).json({
        data: users,
      });
    }
  );

  router.post(
    '/add',
    [authValidation, acceptRoles('applicant')],
    async (req, res) => {
      const [user, job] = await Promise.all([
        userService.updateUser(req.user.id, { $push: { job: req.body.jobId } }),
        JobService.updateJob(req.body.jobId, {
          $push: { applicants: req.user.id },
        }),
      ]);
      return res.status(200).json({
        message: 'Job added',
      });
    }
  );

  router.post('/', async (req, res) => {
    const user = await userService.createUser(req.body);
    return res.status(201).json({
      data: user,
    });
  });

  router.put('/:id', async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    return res.status(200).json({
      data: user,
    });
  });

  router.delete(
    '/:id',
    [authValidation, acceptRoles('admin')],
    async (req, res) => {
      const user = await userService.deleteUser(req.params.id);
      return res.status(200).json({
        data: user,
      });
    }
  );
}

module.exports = Users;
