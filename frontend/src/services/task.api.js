import api from "./api";

const getTasks = async () => {
    const response = await api.get("/tasks");

    const tasks = response.data.tasks.map((task) => ({
        ...task,
        id: task._id,
    }));

    console.log("Fetched tasks:", tasks);

    return tasks;
};

const createTask =  async(taskData)   =>{
    const response = await api.post("/tasks" ,taskData);

    return response.data.task;
}

const deleteTask = async(taskId) =>{
    const response = await api.delete(`/tasks/${taskId}`);

    return response.data.message ; 
}
const editTask = async (taskId, updatedData) => {
    const response = await api.put(`/tasks/${taskId}`, updatedData);

    return response.data.task;
};

export default { createTask , getTasks ,deleteTask , editTask};