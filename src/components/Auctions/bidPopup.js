
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { BidNft } from '../Wallet/interact';




function BidPopup(props) {
    const dispatch = useDispatch()
const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({});
const onSubmit = ()=>{
    debugger
    BidNft(props.id,props.projid)
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
                    <a>Place a bid</a>
                    {/* <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a> */}
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)} className="item-form card no-hover">
                    <div className="row">

                        <div className="col-12">
                            <label>You are about to place a bid for SICKOS from SICKOS COLLECTIVE collection.</label>
                        </div>
                        <div className="col-12">
                            <span>{window.ethereum?.selectedAddress}</span>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label>Your bid</label>
                                <input
                                    type="number"
                                    placeholder='Enter bid'
                                />

                                {/* <textarea value={value} onChange={setDescription}></textarea> */}




                            </div>
                        </div>
                        <hr />
                        <div className="col-12">
                            <div className="form-group">
                                
                               

                                {/* <textarea value={value} onChange={setDescription}></textarea> */}




                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn w-100 mt-3 mt-sm-4" type="submit">Pay with wallet </button>
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

export default BidPopup