import { createSlice } from '@reduxjs/toolkit'
// Slice
const userToken = sessionStorage.getItem('authToken')
    // ? JSON.parse(sessionStorage.getItem('user'))
    ? sessionStorage.getItem('authToken')
    : null
const projectSlice = createSlice({
    name: 'project',

    initialState: {
        project: [],
        projects: [],
        projectdetails: [],
        liveProjects: [],
        // liveProjects: {
        //     LatestProjects: {},
        //     RecentCampaigns: {}
        // },
        message: {},
    },
    reducers: {
        createProjectSuccess: (state, action) => {
            state.project = action.payload;
        },
        getProjectList: (state, action) => {
            state.projects = action.payload;
        },
        // getTopFundraiser: (state, action) => {
        //     debugger
        //     state.fundraiser = action.payload;
        // },
        getLatestProjectList: (state, action) => {
            state.projects = action.payload;
        },
        createFail: (state, action) => {
            // 
            state.message = action.payload.response.data.message
        },
        getProjectDetail: (state, action) => {
            state.projectdetails = action?.payload?.data?.data;
        },
        publicLiveProjects: (state, action) => {
            // debugger
            // state.liveProjects['LatestProjects'] = action.payload.data.data.data
            state.liveProjects = action.payload.data.data.data
            // state.liveProjects['R'] = action.payload.data.data.data
        },
        deleteProject: (state, action) => {
            const { id } = action.payload?.data?.data;
            state.projects = state.projects.filter(item => item.id !== id)
        }
    },
});

export const projectReducer = projectSlice.reducer

export const {
    createProjectSuccess,
    getProjectList,
    getProjectDetail,
    publicLiveProjects,
    deleteProject,
    createFail,
    getLatestProjectList,
} = projectSlice.actions;