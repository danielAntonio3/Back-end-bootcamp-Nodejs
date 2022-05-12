const JobModel = require('./../models/job');
const Category = require('./../services/category');
const categoryService = new Category();

class Job {
    async getAllJob() {
        try {
            const jobs = await JobModel.find().populate('category', 'name');
            return jobs;
        } catch (error) {
            console.log('Error:', error);
        }
    }

    async getJob(payload) {
        const { country, name } = payload;
        try {
            if (name) {
                const jobs = await JobModel.find({ name: { $regex: name } }).populate('category', 'name');
                return jobs;
            }
            const jobs = await JobModel.find({ country }).populate('category', 'name');
            return jobs;
        } catch (error) {
            console.log('Error:', error);
        }
    }

    async createJob(payload) {
        try {
            const jobs = await JobModel.create(payload);
            if (jobs.category.length > 0) {
                jobs.category.map((item) => {
                    categoryService.updateCategory(item, { $push: { job: jobs._id } });
                });
            }
            return jobs;
        } catch (error) {
            console.log('Error:', error);
        }
    }

    async updateJob(id, payload) {
        try {
            const jobs = await JobModel.findByIdAndUpdate(id, payload, {
                new: true,
            });
            if (jobs.category.length > 0) {
                jobs.category.map((item) => {
                    categoryService.updateCategory(item, { $push: { job: item } });
                });
            }
            return jobs;
        } catch (error) {
            console.log('Error:', error);
        }
    }

    async deleteJob(id) {
        try {
            const jobs = await JobModel.findByIdAndDelete(id);
            return jobs;
        } catch (error) {
            console.log('Error:', error);
        }
    }
}
module.exports = Job;
