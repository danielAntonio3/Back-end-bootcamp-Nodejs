const { Router } = require('express');
const Job = require('./../services/job');
const { authValidation, acceptRoles } = require('../middleware/authValidation');


function jobs(app) {
    const router = new Router();
    const JobService = new Job();

    app.use('/api/job', router);

    router.get('/', async (req, res) => {
        const jobs = await JobService.getAllJob();
        return res.status(200).json({
            data: jobs,
        });
    });

    router.get('/filter', async (req, res) => {
        const jobs = await JobService.getJob(req.query);
        return res.status(200).json({
            data: jobs,
        });
    });

    router.post('/', [authValidation, acceptRoles('employer')], async (req, res) => {
        const jobs = await JobService.createJob(req.body);
        return res.status(201).json({
            data: jobs,
        });
    });

    router.put('/:id', [authValidation, acceptRoles('employer')], async (req, res) => {
        const jobs = await JobService.updateJob(req.params.id, req.body);
        return res.status(200).json({
            data: jobs,
        });
    });

    router.delete('/:id', [authValidation, acceptRoles('employer')], async (req, res) => {
        const jobs = await JobService.deleteJob(req.params.id);
        return res.status(200).json({
            data: jobs,
        });
    });
}

module.exports = jobs;
