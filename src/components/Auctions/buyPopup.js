import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CreateCollectionAction } from '../../redux/Actions/projectAction';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Loader from '../Loader/loader';
import { Tooltip } from 'react-bootstrap';
import { useLocation } from 'react-router';
// import 'bootstrap/dist/css/bootstrap.min.css';
function BuyPopup(props) {
    const location = useLocation();
    const [copy, setCopy] = useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({});
    const OnSubmit = (data) => {
    }
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