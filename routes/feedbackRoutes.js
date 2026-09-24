const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const validateFeedback = require('../middlewares/validateFeedback');

router.post('/:id/feedback', validateFeedback, projectController.createFeedback);
router.post('/:id/upvote', projectController.upvote);

module.exports = router;