import Modal from 'react-bootstrap/Modal';
import Loader from '../Loader/loader';
function BuyPopup(props) {
    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="loading"
        >
            {props.loading &&
                <><Loader />
                    <div className="form-group m-0">
                        <span>Processing...</span>
                    </div>
                </>
            }
        </Modal>
    );
}
export default BuyPopup