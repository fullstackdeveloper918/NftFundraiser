import axios from "axios";
import {
    createProjectSuccess,
    getProjectDetail,
    getProjectList,
    createFail,
    publicLiveProjects,
    deleteProject,
    getLatestProjectDetail,
    getCategoriesList,
    createCollectionSuccess,
    getCollections,
    getCollectionDetails,
    getSocialmediaIcons,
    getNftList,
    getSettings,
    getNftwolDetails,
    getfundprojdetails,
    updatebanner,
    nftUpd,
    nftAdd,
    getMatic,
    getmostprojactivity,
    getbuyednftdetails
} from "../Slices/projectSlice";
import { createAsyncThunk } from '@reduxjs/toolkit'
import swal from "sweetalert";

export const CreateProjectAction = (params, setLoading, history) => async dispatch => {
    // localStorage.setItem('auth_token', JSON.stringify(action.payload.dat
    // const [loading, setLoading] = useState(false)
    // setLoading(true)
    try {
        const token = localStorage.getItem('authToken')
        // 
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
        // console.log("resproj", res)
        dispatch(createProjectSuccess(res));

        if (res.status === 200) {
            setLoading(false)
            swal({ title: "success", text: res.data.message, icon: 'success', buttons: false, timer: 1500 })
                .then(() => {
                    history.push("/projectlist");
                });

        }

    } catch (e) {
        if (e?.response?.data.message) {
            setLoading(false)
            swal('error', e.response.data.message, 'error')
            dispatch(createFail(e))
        }
    }
}

export const ProjectDetail = (slug) => async dispatch => {
    // 
    const token = localStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/project/details/${slug}`,
            config)
        // console.log(res?.data?.data[0]?.image, 'proj')
        // console.log('details', res)
        dispatch(getProjectDetail(res));
    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const LatestProjectDetail = (slug) => async dispatch => {
    // debugger
    // 
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getLatestProjectDetails/${slug}`,
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
    const token = localStorage.getItem('authToken')
    // setLoading(true)
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
        // setLoading(false)

    } catch (e) {
        if (e?.response?.data.message) {
            // setLoading(false)
            swal('error', e.response.data.message, 'error')
        }
    }
}

export const NftList = (slug) => async dispatch => {
    const token = localStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getNftDetailByIdx/${slug}`,
            config)

        // console.log(res, 'proj')
        await dispatch(getNftList(res));


    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const uploadNFT = async (params) => {
    // debugger
    // const [loading, setLoading] = useState()
    // setLoading(true)
    const token = localStorage.getItem('authToken')
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        },
        // transformRequest: formData.append('image', params)
    }
    const formData = new FormData();

    formData.append("image", params);
    return axios
        .post(`${process.env.REACT_APP_BACKEND_API}api/ipfsHash/Nfft`,
            formData, config)
        .then(function (response) {
            // setLoading(false)
            // console.log(response, 'resss')
            return {
                success: true,
                data: response.data,
            };
        })
        .catch(function (error) {
            // swal('error!', 'NFT not uploaded', 'error')
            // uploadNFT(setLoading(false))
        });
    // formData.append('image',params)

    // const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/ipfsHash/Nfft`,
    //     params, config)
    // 
    // console.log('rasasses', res)
    // return res
    // await dispatch(Nftres(res))

}


export const getPublicLiveProjects = createAsyncThunk(
    "auth/liveProjects",

    async (params, thunkAPI) => {
        try {
            const { projectType } = params
            const latitude = localStorage.getItem('latitude')
            const longitude = localStorage.getItem('longitude')
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getLatestProjects?page=&latitude=${latitude}&longitude=${longitude}&search_keyword=&category_id=&type`, config)
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

export const UpdateProject = (props, params) => async dispatch => {
    const token = localStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            transformRequest: formData => formData
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/projects/update/${props}`,
            params, config)
        // 
        // console.log(res, 'proj')
        await dispatch(getProjectDetail(res));
        if (res.status === 200) {
            swal("success", res.data.message, 'success').then(function () {
                window.location = `/projnftdetails/${props}`;
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
    const token = localStorage.getItem('authToken')
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
            dispatch(ProjectList())
            // swal("success", res.data.message, 'success').then(function () {
            //     window.location = "/projectlist";
            // });

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


export const GetCollectionsAction = () => async dispatch => {
    const token = localStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getCollection`,
            config)
        // console.log('colres', res)
        await dispatch(getCollections(res));

    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const CreateCollectionAction = ({ dat, imageBanner, props }) => async dispatch => {
    try {
        const formData = new FormData()
        formData.append('title', dat.title)
        formData.append('description', dat.description)
        formData.append('short_url', dat.short_url)
        formData.append('symbol', dat.symbol)
        formData.append('image', imageBanner)
        const token = localStorage.getItem('authToken')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            transformRequest: formData => formData
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/createCollection`, formData,
            config)
        // dispatch(GetCollectionsAction)
        await dispatch(createCollectionSuccess(res));
        if (res?.status === 200) {

            await dispatch(GetCollectionsAction());
            props.onHide(false)
            // swal("success", 'Collection Created', 'success')
            // .then(function () {
            //     onClick={() => props.onHide()}
            // });

        }

    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
            dispatch(createFail(e))
        }
    }
}
export const GetCollectionDetails = (id) => async dispatch => {
    const token = localStorage.getItem('authToken')
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

export const UpdateCollection = (id, params) => async dispatch => {
    // 
    const token = localStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            transformRequest: formData => formData
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/updateContract/${id}`,
            params, config)
        // 
        // console.log(res, 'coll rres')
        await dispatch(getLatestProjectDetail(res));
        // if (res.status === 200) {
        //     swal("success", res.data.message, 'success').then(function () {
        //         window.location = "/projectlist";
        //     });

        // }
    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const GetSettings = () => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getSettings`,
            config)
        // 
        // console.log(res, 'sett rres')
        await dispatch(getSettings(res));

        // if (res.status === 200) {
        //     swal("success", res.data.message, 'success').then(function () {
        //         window.location = "/projectlist";
        //     });

        // }
    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}

export const GetNftwol = ({ slug }) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getNftDetailByIdxWithoutLogin/${slug}`,
            config)

        await dispatch(getNftwolDetails(res));

    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const GetfundraiserProject = (slug) => async dispatch => {
    // 
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getProjectByfundraiserIdx/${slug}`,
            config)

        await dispatch(getfundprojdetails(res));

    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}

export const UpdateBanner = (formData, params) => async dispatch => {
    // 
    const token = localStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            transformRequest: formData => formData
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/projects/image_update/${params}`,
            formData, config)
        // 
        // console.log(res, 'coll rres')
        await dispatch(updatebanner(res));

        if (res.status === 200) {
            swal("success", "updated", 'success').then(function () {
                dispatch(ProjectDetail(params))
                dispatch(LatestProjectDetail(params))
                // window.location = "/projectlist";
            });

        }
    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const UpdateNft = (formData, props, setLoading) => async dispatch => {
    // debugger

    const token = localStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            transformRequest: formData => formData
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/nft/update/${props.id}/${props.nft_id?.id}`,
            formData, config)
        // 
        // console.log(res, 'coll rres')
        await dispatch(nftUpd(res));

        if (res.status === 200) {
            swal("success", "updated", 'success')
            setLoading(false)
            dispatch(NftList(props.nft_id?.id))
            dispatch(ProjectDetail(props.id))
            // .then(function () {
            //     window.location = `/nft/details/${props.nft_id?.id}?project=${props.id}`;

            // });

        }
    } catch (e) {
        if (e?.response?.data.message) {
            setLoading(false)
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const AddNftAction = (formData, projid, slug, setLoading) => async dispatch => {
    const token = localStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            transformRequest: formData => formData
        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/nft/create/${projid}`,
            formData, config)
        // 
        // console.log(res, 'coll rres')
        await dispatch(nftAdd(res));

        if (res.status === 200) {
            setLoading(false)
            swal("success", "updated", 'success').then(function () {
                // dispatch(ProjectDetail(props.id))
                // dispatch(LatestProjectDetail(params))
                window.location = `/projnftdetails/${slug.id}`;
            });

        }
    } catch (e) {
        if (e?.response?.data.message) {
            setLoading(false)
            swal('error', e.response.data.message, 'error')
        }
    }
}

export const GetMatic = () => async dispatch => {

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json',

            },

        }
        // 
        const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=cad`,
            config
        )
        await dispatch(getMatic(res))
        console.log('res', res)
    } catch (error) {
        // console.log("error");
    }
};
export const getBid = (id) => async dispatch => {
    try {
        const token = localStorage.getItem('authToken')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },

        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/getBidsDetailByIdx/${id}}`,
            config)
        await dispatch(res)
        console.log('res bid', res)
    } catch (error) {
        // console.log("error");
    }
};
export const UpdateBId = ({ id, status }) => async dispatch => {
    // debugger
    try {
        const token = localStorage.getItem('authToken')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },

        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/change_bids_status/${id}}`,
            { status: status }, config)
        await dispatch(res)
        console.log('res bid', res)
    } catch (error) {
        // console.log("error");
    }
};

export const GetMostactivityProject = () => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getMostActivityProject`,
            config)

        await dispatch(getmostprojactivity(res));

    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const GetbuyedNftDetails = (slug) => async dispatch => {
    const token = localStorage.getItem('authToken')
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getPurchaseNftDetailByIdx/${slug?.slug}`,
            config)

        await dispatch(getbuyednftdetails(res));

    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}

export const ResellNft = (params, props) => async dispatch => {
    // debugger
    try {
        const token = localStorage.getItem('authToken')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },

        }
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_API}api/create_resale_nft`,
            params, config)
        await dispatch(res())
        if (res?.status === 200) {
            await dispatch(GetbuyedNftDetails(props.slug?.slug))
            props.onHide(false)
        }
    } catch (e) {
        // console.log("error");
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
};