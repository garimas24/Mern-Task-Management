const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tasksController');


router.post('/', ctrl.createTask);
router.get('/', ctrl.getAllTasks);
router.get('/:id', ctrl.getTaskById);
router.put('/:id', ctrl.updateTask);
router.delete('/:id', ctrl.deleteTask);


module.exports = router;