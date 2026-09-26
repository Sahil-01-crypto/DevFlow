const taskModel = require("../models/task.models");
const projectModel = require("../models/projects.models");

const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            status,
            priority,
            dueDate,
            projectId
        } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        if (!description) {
            return res.status(400).json({
                message: "Description is required"
            });
        }

        if (!projectId) {
            return res.status(400).json({
                message: "Project ID is required"
            });
        }

        const owner = req.user.id;

        const project = await projectModel.findOne({
            _id: projectId,
            owner
        });

        if (!project) {
            return res.status(404).json({
                message:
                    "Project not found or you do not have permission to add a task"
            });
        }

        const newTask = await taskModel.create({
            title,
            description,
            status,
            priority,
            dueDate,
            projectId,
            owner
        });

        return res.status(201).json({
            message: "Task created successfully",
            task: newTask
        });

    } catch (error) {
        console.error("Error creating task:", error);

        return res.status(500).json({
            message: "Error creating task",
            error: error.message
        });
    }
};

const allTask = async(req , res)=>{
    try{
        const owner = req.user.id;
        const tasks = await taskModel.find({owner});

        return res.status(200).json({
            message: "Tasks retrieved successfully",
            tasks:tasks 
        })
    }
    catch(error){
        console.error("Error retrieving tasks:", error);
        return res.status(500).json({
            message: "Error retrieving tasks",
            error: error.message
        });
    }
}

const getTaskById = async (req, res) => {
    try{
        const {id}= req.params;
        const owner = req.user.id ;

        const task  = await taskModel.findOne({_id:id , owner});

        if(!task){
            return res.status(404) . json({
                message:" Task  not found or you do not have permission to view this task"
            })
        }

        return res.status(200).json({
            message:"Task retrieved successfully",
            task:task
        })
    }
    catch(error){
        console.error("Error retrieving task:", error);
        return res.status(500).json({
            message: "Error retrieving task",
            error: error.message
        });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            status,
            priority,
            dueDate
        } = req.body;

        if (!title && !description && !status && !priority && !dueDate) {
            return res.status(400).json({
                message: "At least one field is required to update the task"
            });
        }

        const owner = req.user.id;


        const updatedTask = await taskModel.findOneAndUpdate(
            {
                _id: id,
                owner
            },
            {
                title,
                description,
                status,
                priority,
                dueDate
            },
            {
                new: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message:
                    "Task not found or you do not have permission to update this task"
            });
        }

        return res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (error) {
        console.error("Error updating task:", error);

        return res.status(500).json({
            message: "Error updating task",
            error: error.message
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const owner = req.user.id;
                console.log("Delete Task ID:", id);
console.log("Delete Task Owner:", owner);

        const deletedTask = await taskModel.findOneAndDelete({
            _id: id,
            owner
        });

        if (!deletedTask) {
            return res.status(404).json({
                message:
                    "Task not found or you do not have permission to delete this task"
            });
        }

        return res.status(200).json({
            message: "Task deleted successfully",
            task: deletedTask
        });

    } catch (error) {
        console.error("Error deleting task:", error);

        return res.status(500).json({
            message: "Error deleting task",
            error: error.message
        });
    }
};

module.exports = {
    createTask , 
    allTask , 
    getTaskById , 
    updateTask ,
     deleteTask 
};