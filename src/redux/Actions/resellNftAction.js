import axios from "axios";
import swal from "sweetalert";
import { getResell, getReselldetails } from "../Slices/resellNftSlice";

export const ResellAction = () => async dispatch => {
    // localStorage.setItem('authToken', JSON.stringify(action.payload.dat
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
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}api/getResaleNft`,
            "", config)
        console.log("resproj", res)
        dispatch(getResell(res));
    } catch (e) {
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}
export const ResellActionDetails = (slug) => async dispatch => {
    // localStorage.setItem('authToken', JSON.stringify(action.payload.dat
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
        if (e?.response?.data.message) {
            swal('error', e.response.data.message, 'error')
        }
    }
}