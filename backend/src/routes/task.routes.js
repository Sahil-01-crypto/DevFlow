const express  = require('express');

const authMiddleware = require('../middlewares/auth.middlewares');
const  taskController = require('../controllers/task.controllers');

const router = express.Router();


router.post('/' , authMiddleware.authUser ,taskController.createTask); 

router.get('/' , authMiddleware.authUser ,taskController.allTask);

router.get('/:id' , authMiddleware.authUser ,taskController.getTaskById);


router.put('/:id' , authMiddleware.authUser ,taskController.updateTask);

router.delete('/:id' , authMiddleware.authUser ,taskController.deleteTask);









module .exports = router;

