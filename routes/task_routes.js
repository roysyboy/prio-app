var express = require('express');
var router = express.Router();

// Require controller modules
var task_controller = require('../controllers/taskController');

/// TASK ROUTES ///

// GET task_list home page.
router.get('/', task_controller.task_list);

// GET for one task
router.get('/task/:id', task_controller.task_list);

// GET for all tasks
router.get('/tasks', task_controller.task_detail);


// GET create
router.get('/task/create', task_controller.task_create_get);

// POST create
router.post('/task/create', task_controller.task_create_post);


// GET delete
router.get('/task/delete', task_controller.task_delete_get);

// POST delete
router.post('/task/delete', task_controller.task_delete_post);


// GET update
router.get('/task/update', task_controller.task_update_get);

// POST update
router.post('/task/update', task_controller.task_update_post);

modules.exports = router;