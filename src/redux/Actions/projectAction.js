import axios from "axios";
import {
    createProjectSuccess,
    deleteProduct,
    getProjectDetail,
    getProjectList,
    createFail,
    publicLiveProjects,
    deleteProject,
    getLatestProjectList,
    getTopFundraiser,
    getLatestProjectDetail,
    getCategoriesList,
    createCollectionSuccess,
    getCollections,
    getCollectionDetails,
    getSocialmediaIcons
} from "../Slices/projectSlice";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Redirect } from 'react-router-dom';
import swal from "sweetalert";

export const CreateProjectAction = (params) => async dispatch => {
    // sessionStorage.setItem('authToken', JSON.stringify(action.payload.dat
    try {
        const token = sessionStorage.getItem('authToken')
        // debugger
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
        console.log("resproj", res)
        dispatch(createProjectSuccess(res));
        if (res.status === 200) {
            swal("success", res.data.message, 'success')
                .then(function () {
                    window.location = "/projectlist";
                });

        }

    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
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
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/project/details/${id}`,
            config)
        // console.log(res?.data?.data[0]?.image, 'proj')
        console.log('details', res)
        dispatch(getProjectDetail(res));
    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const LatestProjectDetail = (id) => async dispatch => {
    // 
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getLatestProjectDetails/${id}`,
            config)
        // console.log(res, 'ressssss')
        dispatch(getLatestProjectDetail(res));
    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
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
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}


export const getPublicLiveProjects = createAsyncThunk(
    "auth/liveProjects",
    async (params, thunkAPI) => {
        try {
            const { type, projectType } = params
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getLatestProjects?page=&latitude=&longitude=&search_keyword=&type=${type}&category_id=`, config)
            // console.log(res, 'projres')
            thunkAPI.dispatch(publicLiveProjects({
                res: res,
                type: projectType,
            }));
            // thunkAPI.dispatch(publicLiveProjects(res));

        } catch (e) {
            if (e?.response?.data.message) {
                swal('error', e.response.data.message, 'error')
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
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/projects/update/${id}`,
            params, config)
        // 
        // console.log(res, 'proj')
        await dispatch(getProjectDetail(res));
        if (res.status === 200) {
            swal("success", res.data.message, 'success').then(function () {
                window.location = "/projectlist";
            });

        }
    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
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
        // console.log(res.status, 'proj')
        await dispatch(deleteProject(res));
        if (res.status === 200) {
            swal("success", res.data.message, 'success').then(function () {
                window.location = "/projectlist";
            });

        }
    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}

export const CategoriesAction = () => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getCategories`, config)
        // console.log(res, 'catres')
        dispatch(getCategoriesList(res));

    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}

export const CreateCollectionAction = (params) => async dispatch => {
    try {
        const token = sessionStorage.getItem('authToken')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/createCollection`,
            params, config)
        dispatch(createCollectionSuccess(res));
        if (res.status === 200) {
            swal("success", res.data.message, 'success')
            // .then(function () {
            //     window.location = "/projectlist";
            // });

        }

    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
            dispatch(createFail(e))
        }
    }
}

export const GetCollectionsAction = () => async dispatch => {
    const token = sessionStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getCollection`,
            config)

        await dispatch(getCollections(res));

    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const GetCollectionDetails = (id) => async dispatch => {
    const token = sessionStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getCollectionById/${id}`,
            config)

        await dispatch(getCollectionDetails(res));

    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const GetSocialMediaIcons = () => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getSocialMediaIcon`,
            config)
        // console.log('social', res)
        await dispatch(getSocialmediaIcons(res));

    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}