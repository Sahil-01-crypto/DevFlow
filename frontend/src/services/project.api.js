import api from "./api";

const createProject = async (projectData) => {
    const response = await api.post("/projects" , projectData);

    return response.data.project;


}
const getProjects = async () => {
    const response = await api.get("/projects");

    const projects = response.data.projects.map((project) => ({
        ...project,
        id: project._id,
    }));

    return projects;
};

const editProject = async (projectId, updatedData) => {
    const response = await api.put( `/projects/${projectId}` , updatedData);

    return response.data.project;

}

const deleteProject = async (projectId) =>{
    const response = await api.delete(`/projects/${projectId}`)
    


    return response.data.message ; 
}






export default {createProject, getProjects , editProject , deleteProject};