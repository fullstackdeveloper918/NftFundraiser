import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CreateCollectionAction, GetCollectionsAction } from '../../redux/Actions/projectAction';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { blobToDataURl, dataURLtoBlob } from '../../utils/blobfromurl';
import UploadImage from '../../shared/Upload';
import { Loader } from '@react-three/drei';
function MyVerticallyCenteredModal(props) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm();
    const [image, setImage] = useState()
    const OnSubmit = (dat) => {
        const imageBanner = dataURLtoBlob(image)
        dispatch(CreateCollectionAction({ dat, imageBanner, props, setLoading }))
    }
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        {loading ? (

                            <>Please wait ...</>
                        ) : (
                            <>
                                Create Collection
                            </>
                        )
                        }
                    </Modal.Title>
                    <div>
                        <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">
                        {loading ? (
                            <Loader />

                        ) : (
                            <><div className='row'>
                                <div className="col-6">
                                    <div className="form-group mt-3">
                                        <label>Display name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            aria-invalid={errors.title ? "true" : "false"}
                                            placeholder="Enter collection name"
                                            {...register('title', { required: true })} />
                                    </div>
                                    {errors.title?.type === 'required' && <p style={{ color: 'red' }} role="alert">collection name is required</p>}
                                </div>
                                <div className="col-6">
                                    <div className="form-group mt-3">
                                        <label>Symbol</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="symbol"
                                            aria-invalid={errors.symbol ? "true" : "false"}
                                            placeholder="Enter token symbol"
                                            {...register('symbol', { required: true })} />
                                        {errors.symbol?.type === 'required' && <p style={{ color: 'red' }} role="alert">symbol is required</p>}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group mt-3">
                                        <label>Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            aria-invalid={errors.description ? "true" : "false"}
                                            {...register('description', { required: true })}
                                            // value={description}
                                            // onChange={(e) => {
                                            //     setDescription(e.target.value);
                                            // }}
                                            placeholder="Spread some words about your collection" />
                                        {errors.description?.type === 'required' && <p style={{ color: 'red' }} role="alert">description is required</p>}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group mt-3">
                                        <label>Web URL</label>
                                        <input
                                            type="text"
                                            className="form-control"

                                            name="short_url"
                                            placeholder="Web URL"
                                            {...register('short_url', { required: true })} />
                                        {errors.short_url?.type === 'required' && <p style={{ color: 'red' }} role="alert">Web URL is required</p>}
                                    </div>
                                </div>
                                <div className="col-12 col-md-12">
                                    <div className="form-group">
                                        <label>Banner image</label>
                                        <UploadImage
                                            imageSrc={image}
                                            // initalImag={image}
                                            setImageSrc={setImage} />
                                        <div>
                                            <span className='logo-dis'>Allowed types: JPG, PNG, GIF<br />Banner should be 1500 px wide x 500 px high</span>
                                        </div>
                                    </div>
                                </div>
                            </div><Button key="create-collection" type="submit" className="btn btn-primary">Create</Button></>

                        )}
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default MyVerticallyCenteredModal