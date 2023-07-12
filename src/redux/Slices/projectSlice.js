import { createSlice } from '@reduxjs/toolkit'
// // Slice
// const userToken = sessionStorage.getItem('authToken')
//     // ? JSON.parse(sessionStorage.getItem('user'))
//     ? sessionStorage.getItem('authToken')
//     : null
const projectSlice = createSlice({
    name: 'project',

    initialState: {
        project: [],
        projects: [],
        nftlist: [],
        projectdetails: [],
        latestprojectdetails: [],
        categories: [],
        collections: [],
        getcollections: [],
        getTitleRes:[],
        getcollectiondetails: [],
        collectiondetails: [],
        getSocialmediaIcons: [],
        getfundProjDetails: [],
        getmostProjActivity: [],
        getBuyedNftdetails: [],
        getPaymentFlow:[],
        getnftwoldetails: [],
        settings: [],
        liveProjectsPag: [],
        nftadd: [],
        nftres: [],
        nftupdate: [],
        updbanner: [],
        matic: [],
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
            // 
            state.getcollections = action?.payload?.data?.data;
        },
        getTitelResponse: (state, action) => {
            // 
            state.getTitleRes = action?.payload?.data?.data;
        },
        getSocialmediaIcons: (state, action) => {
            // 
            state.getsocial = action?.payload?.data?.data;
        },
        getCollectionDetails: (state, action) => {
            // 
            state.getcollectiondetails = action?.payload?.data?.data;
        },
        getNftwolDetails: (state, action) => {
            state.getnftwoldetails = action?.payload?.data?.data;
        },
        getNftwolDetailsPaymentflow: (state, action) => {
            state.getPaymentFlow = action?.payload?.data?.data;
        },
        nftUpd: (state, action) => {
            // 
            state.nftupdate = action?.payload?.data?.data;
        },
        nftAdd: (state, action) => {
            // 
            state.nftadd = action?.payload?.data?.data;
        },
        getfundprojdetails: (state, action) => {
            // 
            state.getfundProjDetails = action?.payload?.data?.data;
        },
        getmostprojactivity: (state, action) => {
            state.getmostProjActivity = action?.payload?.data?.data;
        },
        getbuyednftdetails: (state, action) => {
            state.getBuyedNftdetails = action?.payload?.data?.data;
        },
        getProjectList: (state, action) => {
            state.projects = action.payload?.data?.data
        },
        getMatic: (state, action) => {
            state.matic = action.payload?.data?.data
        },
        getCategoriesList: (state, action) => {
            state.categories = action?.payload?.data?.data;
        },
        getSettings: (state, action) => {
            state.settings = action?.payload?.data?.data;
        },

        getLatestProjectList: (state, action) => {
            state.projects = action.payload;
        },
        createFail: (state, action) => {
            // 
            state.message = action.payload.response.data.message
        },
        getProjectDetail: (state, action) => {
            // 
            state.projectdetails = action?.payload?.data?.data;
        },
        getCollectionDetail: (state, action) => {
            // 
            state.collectiondetails = action?.payload?.data?.data;
        },
        Nftres: (state, action) => {
            // 
            state.nftres = action?.payload?.data?.data;
        },
        getNftList: (state, action) => {
            // 
            state.nftlist = action?.payload?.data?.data;
        },
        getLatestProjectDetail: (state, action) => {
            // 
            state.latestprojectdetails = action?.payload?.data?.data;
        },
        updatebanner: (state, action) => {
            // 
            state.updbanner = action?.payload?.data?.data;
        },
        publicLiveProjects: (state, action,setPrevData) => {
            state.liveProjects[action.payload.type] = action.payload.res.data.data
            // setPrevData(state.liveProjects[action.payload.type])
            // state.liveProjects = action.payload.data.data.data
            // state.liveProjects['R'] = action.payload.data.data.data
        },
        publicLiveProjectspagination: (state, action) => {
            state.liveProjectsPag = action.payload.res.data.data
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
    publicLiveProjectspagination,
    createCollectionSuccess,
    deleteProject,
    createFail,
    getLatestProjectList,
    getCategoriesList,
    getCollections,
    getbuyednftdetails,
    getCollectionDetails,
    getSocialmediaIcons,
    getNftList,
    getCollectionDetail,
    getSettings,
    getNftwolDetails,
    getfundprojdetails,
    Nftres,
    getTitelResponse,
    updatebanner,
    getmostprojactivity,
    getNftwolDetailsPaymentflow,
    nftUpd,
    nftAdd,
    getMatic
} = projectSlice.actions;