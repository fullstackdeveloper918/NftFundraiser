import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CreateCollectionAction, GetCollectionsAction } from '../../redux/Actions/projectAction';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { blobToDataURl, dataURLtoBlob } from '../../utils/blobfromurl';
import UploadImage from '../../shared/Upload';
// import 'bootstrap/dist/css/bootstrap.min.css';
function MyVerticallyCenteredModal(props) {
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [short_url, setShortUrl] = useState("");
    // const [symbol, setSymbol] = useState("");
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm();
    const [image, setImage] = useState()
    const OnSubmit = (dat) => {
        // debugger
        const imageBanner = dataURLtoBlob(image)
        // 
        // data.preventDefault()
        dispatch(CreateCollectionAction({ dat, imageBanner }))
        // console.log(data?.statusCode)

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
                    Create Collection
                </Modal.Title>
                <div>
                    <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">
                    <div className='row'>
                        <div className="col-6">
                            <div className="form-group mt-3">
                                <label>Display name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    required
                                    placeholder="Enter collection name"
                                    {...register('title')}
                                // value={title}
                                // onChange={(e) => {

                                //     setTitle(e.target.value);
                                // }} 
                                />

                            </div>
                        </div>

                        <div className="col-6">
                            <div className="form-group mt-3">
                                <label>Symbol</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="symbol"
                                    required
                                    placeholder="Enter token symbol"
                                    {...register('symbol')}
                                // value={symbol}
                                // onChange={(e) => {

                                //     setSymbol(e.target.value);
                                // }} 
                                />


                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group mt-3">
                                <label>Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    required
                                    {...register('description')}
                                    // value={description}
                                    // onChange={(e) => {

                                    //     setDescription(e.target.value);
                                    // }}
                                    placeholder="Spread some words about your collection"
                                />

                            </div>

                        </div>
                        <div className="col-6">
                            <div className="form-group mt-3">
                                <label>Web URL</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    name="short_url"
                                    placeholder="Web URL"
                                    {...register('short_url')}
                                // value={short_url}
                                // onChange={(e) => {

                                //     setShortUrl(e.target.value);
                                // }} 
                                />

                            </div>
                        </div>
                        <div className="col-12 col-md-12">
                            <div className="form-group">
                                <label>Banner image</label>
                                <UploadImage
                                    imageSrc={image}
                                    // initalImag={image}
                                    setImageSrc={setImage}
                                />

                                <div >

                                    <span className='logo-dis'>Allowed types: JPG, PNG, GIF<br />Banner should be 1500 px wide x 500 px high</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="modal-footer"> */}
                    <Button type="submit" className="btn btn-primary">Create</Button>
                    {/* </div> */}
                </form>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

export default MyVerticallyCenteredModal