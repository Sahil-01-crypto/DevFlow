import api from "./api"


const getCurrentUser = async()=>{
    const responce = await  api.get('/auth/me');

    return responce . data  ; 
};

export default getCurrentUser ;