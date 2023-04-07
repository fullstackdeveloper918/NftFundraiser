import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UpdateBanner } from '../../redux/Actions/projectAction';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import UploadImage from '../../shared/Upload'
import { dataURLtoBlob } from '../../utils/blobfromurl'
import { GetUserAction, UpdateProfileAction } from '../../redux/Actions/authAction';
function AvatarUpload(props) {
    const [imageSrc, setImageSrc] = useState('');
    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })
    console.log(userdet.avatar)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetUserAction())
    }, [])
    const submit = () => {
        const formData = new FormData()
        const avatar = dataURLtoBlob(imageSrc)
        formData.append('avatar', avatar)
        formData.append('username', userdet.username)
        dispatch(UpdateProfileAction(formData, props))
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
                    User Image
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
                        <Button onClick={submit} className="btn btn-primary banner-update">Update</Button>
                    </div>
                </>
            </Modal.Body>
        </Modal >
    );
}
export default AvatarUpload