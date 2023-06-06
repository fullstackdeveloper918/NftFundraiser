import Modal from 'react-bootstrap/Modal';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Controller, set, useForm } from 'react-hook-form';
import JoditEditor from 'jodit-react';
import { Form } from 'antd';
import { UpdateOrganizationAction } from '../../../redux/Actions/authAction';

function DescEdit(props) {
    const editor = useRef(null);

    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    const { handleSubmit, formState: { errors }, setValue, control } = useForm({});
    const [description, setDescription] = useState();
    useEffect(() => {
        if (userdet && Object.keys(userdet).length) {
            setValue("organization_name", userdet?.organization_detail?.organization_name)
            setValue("description", userdet?.organization_detail?.description)
            setValue("banner_image", userdet?.organization_detail?.banner_image)
            setValue("logo", userdet?.organization_detail?.logo)

            // preview_imag: nftdetail.preview_imag,


            setDescription(userdet?.organization_detail?.description)
        }
    }, [userdet])
    const OnSubmit = (data) => {
        try {
            const formData = new FormData()
            formData.append('organization_name', '')
            formData.append('banner_image', "")
            formData.append('description', description)
            formData.append('logo', "")
            dispatch(UpdateOrganizationAction(formData, userdet?.organization_detail?.id, props, userdet?.user_id))
        } catch (error) {
            console.log('error', error)
        }
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
                    <label className='modal-title h4 '>Description</label>   <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
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
                            <button className="btn btn-primary banner-update" type="submit">Update</button>
                        </div>
                    </div>



                </form>
            </Modal.Body>

        </Modal >
    );
}

export default DescEdit