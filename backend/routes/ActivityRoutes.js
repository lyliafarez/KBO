const express = require('express');
const router = express.Router();
const activityController = require('../controllers/ActivityController');

router.post('/', activityController.createActivity);

router.get('/', activityController.getActivities);

router.put('/:id', activityController.updateActivity);

module.exports = router;
