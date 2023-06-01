import { Button, Form, Input, } from 'antd';
import Modal from 'react-bootstrap/Modal';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/lib/modal/style/css';
import 'antd/lib/button/style/css'
import swal from 'sweetalert';
import { GetUserAction, UpdateOrganizationAction } from '../../../redux/Actions/authAction';
import UploadImage from '../../../shared/Upload';
import { blobToDataURl, dataURLtoBlob } from '../../../utils/blobfromurl';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const EditBanner = (props) => {
    const dispatch = useDispatch()
    const [imageSrc, setImageSrc] = useState('');
    const [form] = Form.useForm()

    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    console.log('userdet', userdet)

    useEffect(() => {
        form.setFieldsValue({
            nfts: [{
                organization_name: userdet?.organization_detail?.organization_name,
                description: userdet?.organization_detail?.description,
                banner_image: userdet?.organization_detail?.banner_image,
                logo: userdet?.organization_detail?.logo

                // preview_imag: nftdetail.preview_imag,
            }]
        })
    })

    const onSubmit = async () => {
        
        try {
            const formData = new FormData()
            const banner_image = dataURLtoBlob(imageSrc)
            formData.append('organization_name', '')
            formData.append('banner_image', banner_image)
            formData.append('description', '')
            formData.append('logo', "")
            dispatch(UpdateOrganizationAction(formData, userdet?.organization_detail?.id,props, userdet?.user_id))
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
                <Modal.Title id="contained-modal-title-vcenter">
                    Banner Image
                </Modal.Title>
                <div>
                    <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
                </div>
            </Modal.Header>
            <Modal.Body>
                <>
                    <div className="banner_img">
                        <div>
                            <UploadImage
                                imageSrc={imageSrc}
                                setImageSrc={setImageSrc}
                            />
                        </div>
                        <button onClick={onSubmit} className="btn btn-primary banner-update">Update</button>
                    </div>
                </>
            </Modal.Body>
        </Modal >
    );
};
export default EditBanner;