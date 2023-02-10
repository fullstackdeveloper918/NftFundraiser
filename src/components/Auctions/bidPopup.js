
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { BidNft } from '../Wallet/interact';

function BidPopup(props) {
    // debugger
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({});
    const onSubmit = () => {
        // debugger
        BidNft(props.id, props.projid)
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
                    <div className='modal-title h4 '>Place a bid</div>
                    {/* <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a> */}
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)} className="item-form card no-hover">
                    <div className="row">

                        <div className="col-12 pb-2">
                            <label>You are about to place a bid for {props.projtitle?.toUpperCase()} from {props.projcoll?.toUpperCase()}.</label>
                        </div>
                        <div className="col-12">
                            <label>Wallet address:</label>
                            <div class="bidinput">{window.ethereum?.selectedAddress}</div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label>Your bid</label>
                                <input
                                    type="number"
                                    placeholder='Enter bid'
                                />
                            </div>
                        </div>
                        <hr />

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