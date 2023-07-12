import Modal from 'react-bootstrap/Modal';
import { UpdateProject } from '../../redux/Actions/projectAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import { CityList, StateList } from '../../redux/Actions/authAction';
import { useHistory } from 'react-router-dom';

function DesPopup(props) {
    const editor = useRef(null);
const history = useHistory();
    const [country, setCountry] = useState()
    const [type, setType] = useState()
    const dispatch = useDispatch()
    const { handleSubmit, formState: { errors }, setValue, control } = useForm({});
    const [description, setDescription] = useState();

    const projdetail = useSelector(state => {
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
            setValue("number_of_nft", projdetail.number_of_nft)
            setValue("start_date", projdetail.start_date)
            setValue("end_date", projdetail.end_date)
            setValue("type", projdetail.type)
            setValue('category_id', projdetail.category_id)
            setType(projdetail.type)
            setCountry(projdetail.country)
            setDescription(projdetail.description)
            setValue("image", projdetail.image)
            const formData = new FormData()
            formData.append('country_id', projdetail.country)
            formData.append('state_id', projdetail.state)
            dispatch(StateList(formData))
            dispatch(CityList(formData))
        }
    }, [projdetail]);

    const OnSubmit = (data) => {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('description', description)
        formData.append('state', data.state)
        formData.append('country', data.country)
        formData.append('city', data.city)
        formData.append('address', data.address)
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

        dispatch(UpdateProject(props, formData,history))
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header >

                <div className='d-flex justify-content-between w-full'>
                <label className='modal-title h4 '>Description</label>  <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">
                    <div className="row">

                        <div className="col-12">
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

        </Modal >
    );
}

export default DesPopup