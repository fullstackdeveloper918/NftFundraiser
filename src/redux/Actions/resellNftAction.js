import axios from "axios";
import swal from "sweetalert";
import { getResell, getReselldetails } from "../Slices/resellNftSlice";
import { LogsAction } from "./logsAction";

export const ResellAction = (params) => async dispatch => {
   
    // sessionStorage.setItem('authToken', JSON.stringify(action.payload.dat
    // const [loading, setLoading] = useState(false)
    // setLoading(true)
    if(params?.location?.pathname === '/all/resll/nfts'){
        params.setLoading(true)
    }
    try {
        // 
        const config = {
            headers: {
                // 'Content-Type': 'multipart/form-data'
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getResaleNft?page=${params.count}&search_keyword=`,
            "", config)
        // swal('success', res.response?.data?.message, 'success')
        dispatch(getResell(res));
        if(params?.location?.pathname === '/all/resll/nfts'){
            params.setLoading(false)
        }
        return res?.data?.data;
    } catch (e) {
        if(params?.location?.pathname === '/all/resll/nfts'){
            params.setLoading(false)
        }
        dispatch(LogsAction(e))
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const ResellActionDetails = (slug) => async dispatch => {
    // sessionStorage.setItem('authToken', JSON.stringify(action.payload.dat
    // const [loading, setLoading] = useState(false)
    // setLoading(true)
    try {
        // 
        const config = {
            headers: {
                // 'Content-Type': 'multipart/form-data'
                'Content-Type': 'application/json',
            },
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getResaleNftByIdx/${slug.slug}`,
            slug, config)
        console.log("resproj", res)
        dispatch(getReselldetails(res));
    } catch (e) {
        dispatch(LogsAction(e))
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}