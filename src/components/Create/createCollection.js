import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CreateCollectionAction } from '../../redux/Actions/projectAction';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import 'bootstrap/dist/css/bootstrap.min.css';
function MyVerticallyCenteredModal(props) {
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [short_url, setShortUrl] = useState("");
    // const [symbol, setSymbol] = useState("");
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({});
    const OnSubmit = (data) => {
        dispatch(CreateCollectionAction(data))
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
                    Collection
                </Modal.Title>
                <div>
                    <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">

                    <div className="col-12">
                        <div className="form-group mt-3">
                            <label>Display name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="display_name"
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

                    <div className="col-12">
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
                    <div className="col-12">
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
                    <div className="col-12">
                        <div className="form-group mt-3">
                            <label>Short url</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                name="short_url"
                                placeholder="Enter short url"
                                {...register('short_url')}
                            // value={short_url}
                            // onChange={(e) => {

                            //     setShortUrl(e.target.value);
                            // }} 
                            />

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