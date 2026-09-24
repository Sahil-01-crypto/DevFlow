const express = require("express");

const projectController = require("../controllers/project.controllers");
const authMiddleware = require("../middlewares/auth.middlewares");

const router = express.Router();

router.post("/", authMiddleware.authUser, projectController.createProject);

router.get('/',authMiddleware.authUser, projectController.getAllProjects);

router.get('/:id',authMiddleware.authUser, projectController.getProjectById);


router.put('/:id',authMiddleware.authUser, projectController.updateProject);

module.exports = router;
