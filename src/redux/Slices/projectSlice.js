import { createSlice } from '@reduxjs/toolkit'
// Slice
const userToken = localStorage.getItem('authToken')
    // ? JSON.parse(localStorage.getItem('user'))
    ? localStorage.getItem('authToken')
    : null
const projectSlice = createSlice({
    name: 'project',

    initialState: {
        project: [],
        projects: [],
        projectdetails: []
    },
    reducers: {
        createProjectSuccess: (state, action) => {
            state.project = action.payload;
        },
        getProjectList: (state, action) => {
            state.projects = action.payload.data.data;
        },
        getProjectDetail: (state, action) => {
            state.projectdetails = action?.payload?.data?.data;
        },

    },
});

export const projectReducer = projectSlice.reducer

export const {
    createProjectSuccess,
    getProjectList,
    getProjectDetail,

} = projectSlice.actions;