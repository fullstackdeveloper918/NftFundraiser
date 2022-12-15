import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CreateCollectionAction, GetCollectionsAction, UpdateBanner } from '../../redux/Actions/projectAction';
import { useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
function Banner(props) {
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [short_url, setShortUrl] = useState("");
    // const [symbol, setSymbol] = useState("");
    const [bannerimage, setBannerimage] = useState()
    console.log('banner', bannerimage)
    const dispatch = useDispatch()

    const submit = (data) => {
        const formData = new FormData()
        formData.append('image', bannerimage)
        // debugger
        // data.preventDefault()
        dispatch(UpdateBanner(formData, props.id))
        // console.log(data?.statusCode)

    }
    // FIles States
    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);

    // FIle Picker Ref because we are not useing the standard File picker in

    const filePicekerRef = useRef(null);

    const previewFile = (e) => {
        // Reading New File (open file Picker Box)
        const reader = new FileReader();

        // Gettting Selected File (user can select multiple but we are choosing only one)
        const selectedFile = e?.target?.files[0];
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }

        // As the File loaded then set the stage as per the file type
        reader.onload = (readerEvent) => {
            if (selectedFile.type.includes("image")) {
                setImagePreview(readerEvent.target.result);
                setBannerimage(e?.target?.files[0])
            } else if (selectedFile.type.includes("video")) {
                setVideoPreview(readerEvent.target.result);
            }
        };
    }

    const clearFiles = () => {
        setImagePreview(null);
        setVideoPreview(null);
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
                    Project Banner
                </Modal.Title>
                <div>
                    <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="banner_img">
                    <div className="item-form card no-hover">





                        {/* <div className="col-12">
                        <div className="form-group mt-3">
                            <label>Banner Image</label>
                            <input
                                type="file"
                                className="form-control"
                                required
                                name="image"
                                {...register('image')}
                            // value={short_url}
                            // onChange={(e) => {

                            //     setShortUrl(e.target.value);
                            // }} 
                            />

                        </div>
                    </div> */}
                        <div className="btn-container">
                            <input

                                ref={filePicekerRef}
                                className="form-control"
                                accept="image/*, video/*"
                                onChange={previewFile}

                                // setBannerimage={(e) => e?.target?.files[0]}
                                // {...register('image')}
                                type="file"
                                name="image"
                                // {...register('image')}
                                hidden
                            />
                            <div>
                                <button className="btn" onClick={() => filePicekerRef?.current.click()}>
                                    Upload Image <i class="fa-solid fa-upload"></i>
                                </button>
                                {(imagePreview || videoPreview) && (
                                    <button className="btn" onClick={clearFiles}>
                                        x
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="preview">
                            {imagePreview != null && <img src={imagePreview} alt="" />}
                            {videoPreview != null && <video controls src={videoPreview}></video>}
                        </div>
                        {/* </div> */}

                        {/* <div className="modal-footer"> */}
                        {/* </div> */}
                    </div >
                    <Button onClick={submit} className="btn btn-primary banner-update">Update</Button>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal >
    );
}

export default Banner

