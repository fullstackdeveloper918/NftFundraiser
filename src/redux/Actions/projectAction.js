import axios from "axios";
import {
    createProjectSuccess,
    deleteProduct,
    getProjectDetail,
    getProjectList,
    createFail,
    publicLiveProjects,
    deleteProject
} from "../Slices/projectSlice";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Redirect } from 'react-router-dom';
import swal from "sweetalert";

export const CreateProjectAction = (params) => async dispatch => {
    // sessionStorage.setItem('authToken', JSON.stringify(action.payload.dat
    try {
        const token = sessionStorage.getItem('authToken')
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
        if (res.status === 200) {
            swal("Created!", "Project created successfully!", "success").then(function () {
                window.location = "/projectlist";
            });

        }

    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message)
            dispatch(createFail(e))
        }
    }
}

export const ProjectDetail = (id) => async dispatch => {
    // 
    const token = sessionStorage.getItem('authToken')
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
        // console.log(res)
        dispatch(getProjectDetail(res));
    } catch (e) {
        //  
        return console.error(e.message);
    }
}

export const ProjectList = () => async dispatch => {
    const token = sessionStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/project/list`,
            config)

        // console.log(res?.data?.data[0]?.image, 'proj')
        await dispatch(getProjectList(res.data?.data));

    } catch (e) {
        return console.error(e.message);
    }
}


export const getPublicLiveProjects = createAsyncThunk(
    "auth/liveProjects",
    async (cursor, thunkAPI) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getLatestProjects?page=${cursor}`, config)

            thunkAPI.dispatch(publicLiveProjects(res));

        } catch (e) {
            if (e?.response?.data) {
                thunkAPI.dispatch()
            }
        }
    })

export const UpdateProject = (id, params) => async dispatch => {
    // 
    const token = sessionStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            transformRequest: formData => formData
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/projects/update/${id.id}`,
            params, config)
        // 
        console.log(res, 'proj')
        await dispatch(getProjectDetail(res));
    } catch (e) {
        //  
        return console.error(e.message);
    }
}

export const DeleteProject = (id) => async dispatch => {
    // 
    const token = sessionStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_API}api/projects/destroy/${id}`,
            config)
        // 
        console.log(res, 'proj')
        await dispatch(deleteProject(res));
    } catch (e) {
        //  
        return console.error(e.message);
    }
}