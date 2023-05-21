import {createJob, deleteJob,getAllJob,showStats,updateJob} from '../controllers/jobsController.js';
import express from 'express';

const router = express.Router();

router.route('/').post(createJob).get(getAllJob);
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteJob).patch(updateJob);

export default router;