import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CreateCollectionAction, UpdateProject } from '../../redux/Actions/projectAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    InstapaperShareButton,
    InstapaperIcon,
    LineShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    LinkedinIcon,
    EmailIcon,
} from "react-share";
import {
    FacebookShareCount,
    HatenaShareCount,
    OKShareCount,
    PinterestShareCount,
    RedditShareCount,
    TumblrShareCount,
    VKShareCount
} from "react-share";
import JoditEditor from 'jodit-react';
import { useParams } from 'react-router';
import { CityList, StateList } from '../../redux/Actions/authAction';
// import 'bootstrap/dist/css/bootstrap.min.css';
function DesPopup(props) {
    const editor = useRef(null);
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [short_url, setShortUrl] = useState("");
    // const [symbol, setSymbol] = useState("");
    const [country, setCountry] = useState()
    const [type, setType] = useState()
    const dispatch = useDispatch()
    const id = useParams()
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({});
    const [description, setDescription] = useState();

    // const url = window.location.href + '/' + props.userRef
    // const Refurl = window.location.href + '/' + props.id + '/' + props.userRef
    const projdetail = useSelector(state => {
        // 
        return state?.projectdetails?.projectdetails
    })
    useEffect(() => {
        if (projdetail && Object.keys(projdetail).length) {

            setValue("title", projdetail.title)
            setValue("address", projdetail.address)
            setValue("description", projdetail.description)
            setValue('state', projdetail.state)
            setValue('country', projdetail.country)
            setValue('city', projdetail.city)
            setValue("price", projdetail.price)
            setValue("number_of_nft", projdetail.number_of_nft)
            setValue("start_date", projdetail.start_date)
            setValue("end_date", projdetail.end_date)
            setValue("type", projdetail.type)
            setValue('category_id', projdetail.category_id)

            setType(projdetail.type)
            setCountry(projdetail.country)
            // setState(projdetail.state)
            // setCity(projdetail.city)
            setDescription(projdetail.description)
            console.log(projdetail.state, 'edit state')
            console.log(projdetail.city, 'edit city')
            setValue("image", projdetail.image)
            const formData = new FormData()
            // formData.append('country_id', event?.currentTarget?.value)
            formData.append('country_id', projdetail.country)
            formData.append('state_id', projdetail.state)
            dispatch(StateList(formData))
            dispatch(CityList(formData))

        }
    }, [projdetail]);

    const OnSubmit = (data) => {
        const formData = new FormData()

        // formData.append('image', data.image[0])
        formData.append('title', data.title)
        formData.append('description', description)
        formData.append('state', data.state)
        formData.append('country', data.country)
        formData.append('city', data.city)
        formData.append('address', data.address)
        formData.append('price', data.price)
        formData.append('number_of_nft', data.number_of_nft)
        if (data?.type == 1) {

            formData.append('start_date', '')
            formData.append('end_date', '')
        } else {

            formData.append('start_date', data.start_date)
            formData.append('end_date', data.end_date)
        }
        formData.append('type', data.type)
        formData.append('category_id', data.category_id)


        dispatch(UpdateProject(props.id, formData))
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header >

                <div>
                    <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">
                    <div className="row">

                        <div className="col-12">
                            <label>Description</label>
                            <div className="form-group">

                                <Controller
                                    control={control}
                                    name="description"
                                    defaultValue=""
                                    render={({ field: { value, onChange } }) => {
                                        return <JoditEditor
                                            ref={editor}
                                            value={value}
                                            // config={config}

                                            placeholder="start typing"
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={newContent => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                                            onChange={newContent => { }}
                                        />
                                    }}
                                />
                                {/* <textarea value={value} onChange={setDescription}></textarea> */}



                                {errors.description?.type === 'required' && <p style={{ color: 'red' }} role="alert">Description is required</p>}
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn w-100 mt-3 mt-sm-4" type="submit">Update</button>
                        </div>
                    </div>



                </form>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal >
    );
}

export default DesPopup