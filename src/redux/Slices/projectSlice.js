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
        latestprojectdetails: [],
        categories: [],
        collections: [],
        getcollections: [],
        getcollectiondetails: [],
        getSocialmediaIcons: [],
        // liveProjects: [],
        liveProjects: {
            LatestProjects: [],
            RecentCampaigns: []
        },
        message: {},
    },
    reducers: {
        createProjectSuccess: (state, action) => {
            state.project = action.payload;
        },
        createCollectionSuccess: (state, action) => {
            state.collections = action.payload;
        },
        getCollections: (state, action) => {
            // debugger
            state.getcollections = action?.payload?.data?.data;
        },
        getSocialmediaIcons: (state, action) => {
            // debugger
            state.getsocial = action?.payload?.data?.data;
        },
        getCollectionDetails: (state, action) => {
            // debugger
            state.getcollectiondetails = action?.payload?.data?.data;
        },
        getProjectList: (state, action) => {
            state.projects = action.payload;
        },
        getCategoriesList: (state, action) => {
            state.categories = action?.payload?.data?.data;
        },

        getLatestProjectList: (state, action) => {
            state.projects = action.payload;
        },
        createFail: (state, action) => {
            // 
            state.message = action.payload.response.data.message
        },
        getProjectDetail: (state, action) => {
            // debugger
            state.projectdetails = action?.payload?.data?.data;
        },
        getLatestProjectDetail: (state, action) => {
            // debugger
            state.latestprojectdetails = action?.payload?.data?.data;
        },
        publicLiveProjects: (state, action) => {
            state.liveProjects[action.payload.type] = action.payload.res.data.data.data
            // state.liveProjects = action.payload.data.data.data
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
    getLatestProjectDetail,
    publicLiveProjects,
    createCollectionSuccess,
    deleteProject,
    createFail,
    getLatestProjectList,
    getCategoriesList,
    getCollections,
    getCollectionDetails,
    getSocialmediaIcons
} = projectSlice.actions;