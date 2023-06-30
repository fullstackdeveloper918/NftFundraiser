import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard'
;
import { ModalHeader } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
function WidgetPopup(props) {
    const [copy, setCopy] = useState(false)
    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
           <ModalHeader className='html_boxheader'>
           <div>
                    <a><i class="fa-regular html_box-close fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
                </div>
           </ModalHeader>
            <Modal.Body className='refer-frnd html-box'>
                <form className="item-form card no-hover">
                    <div className="row html_boxrow">

                        <div className=" p-0">

                            <div className="form-group m-0">
                                {/* <label>Display name</label> */}
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name="display_name"
                                    value={props.data}
                                    
                                   
                                />


                            </div>
                           
                        </div>
                        <div className=" p-0 copy_text">
                            

                                <CopyToClipboard text={props.data} >
                                    <div className='copy'>

                                        <a> <i className="fa-sharp fa-solid fa-copy" onClick={() => setCopy(true)} onMouseLeave={() => setCopy(false)} disabled={window.ethereum?.selectedAddress && sessionStorage.getItem('authToken') ? false : true}></i></a>
                                    </div>
                                </CopyToClipboard>
                           
                            {copy === true &&
                                <span className='copytext'>Copied!</span>

                            }


                        </div>
                    </div>


                </form>
            </Modal.Body>
          
        </Modal>
    );
}

export default WidgetPopup