import axios from "axios";
import { createProjectSuccess, getProjectDetail, getProjectList } from "../Slices/projectSlice";

export const CreateProjectAction = (params) => async dispatch => {
    // localStorage.setItem('authToken', JSON.stringify(action.payload.dat
    try {
        const token = localStorage.getItem('authToken')
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            transformRequest: formData => formData
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/projects/store`,
            params, config)
        dispatch(createProjectSuccess(res));

    } catch (e) {
        return console.error(e.message);
    }
}

export const ProjectDetail = (id) => async dispatch => {
    // debugger
    const token = localStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/project/details/${id.id}`,
            config)
        // console.log(res?.data?.data[0]?.image, 'proj')
        console.log(res)
        dispatch(getProjectDetail(res));
    } catch (e) {
        // debugger 
        return console.error(e.message);
    }
}

export const ProjectList = () => async dispatch => {
    const token = localStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/project/list`,
            config)
        // console.log(res?.data?.data[0]?.image, 'proj')
        dispatch(getProjectList(res));
    } catch (e) {
        // debugger 
        return console.error(e.message);
    }
}