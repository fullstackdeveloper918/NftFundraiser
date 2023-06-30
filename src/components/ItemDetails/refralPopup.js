import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    InstapaperShareButton,
    InstapaperIcon,
    LinkedinShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    LinkedinIcon,
    EmailIcon,
} from "react-share";

import { useLocation } from 'react-router';
function ReferalPopup(props) {
    const location = useLocation();
    const [copy, setCopy] = useState(false)
 
  
    const url = window.location.href + `?refid=${props.userRef}`
    const userprojurl = `https://app.karmatica.io/projects/${props.id}` + `?refid=${props.userRef}`
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className=' align-items-start'>
                {window.ethereum?.selectedAddress ? (

                    <Modal.Title id="contained-modal-title-vcenter">
                        Refer your friends
                        <p>Earn Royalties When You Share: <br />30% of NFTs for first level and 5% for secondary referrals.</p>


                    </Modal.Title>
                ) : (
                    <Modal.Title id="contained-modal-title-vcenter ">

                        <p>Earn When You Share: <br />30% of NFT sales for first level referral </p>
                        <p style={{ color: "red" }}>Connect your wallet to earn referral income in MATIC when you share projects</p>


                    </Modal.Title>
                )}
                <div>
                    <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
                </div>
            </Modal.Header>
            <Modal.Body className='refer-frnd'>
                <form className="item-form card no-hover">
                    <div className="row">

                        <div className="col-10 p-0">

                            <div className="form-group m-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="display_name"
                                    value={location.pathname === `/projnftdetails/${props.id}` ? userprojurl : url}
                                    disabled={window.ethereum?.selectedAddress && sessionStorage.getItem('authToken') ? false : true}
                               
                                />


                            </div>
                         


                            <hr />
                            <div className="refer-icons">
                                {location.pathname === `/projnftdetails/${props.id}` ? (
                                    <>  <TwitterShareButton url={userprojurl} title="Share project when logged in with wallet to earn 30% of NFT sales" > <TwitterIcon size={32} round={true} /></TwitterShareButton>
                                        <FacebookShareButton url={userprojurl} title="Share project when logged in with wallet to earn 30% of NFT sales" > <FacebookIcon size={32} round={true} /></FacebookShareButton>
                                        <WhatsappShareButton url={userprojurl} title="Share project when logged in with wallet to earn 30% of NFT sales" ><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
                                        <TelegramShareButton url={userprojurl} title="Share project when logged in with wallet to earn 30% of NFT sales" ><TelegramIcon size={32} round={true} /></TelegramShareButton>
                                        <InstapaperShareButton url={userprojurl} title="Share project when logged in with wallet to earn 30% of NFT sales" >  <InstapaperIcon size={32} round={true} /></InstapaperShareButton>
                                        <LinkedinShareButton url={userprojurl} title="Share project when logged in with wallet to earn 30% of NFT sales" > <LinkedinIcon size={32} round={true} /></LinkedinShareButton>
                                        <EmailShareButton url={userprojurl} title="Share project when logged in with wallet to earn 30% of NFT sales" ><EmailIcon size={32} round={true} /></EmailShareButton></>
                                ) : (

                                    <><TwitterShareButton url={url} title="Share project when logged in with wallet to earn 30% of NFT sales"><TwitterIcon size={32} round={true} /></TwitterShareButton>
                                        <FacebookShareButton url={url} title="Share project when logged in with wallet to earn 30% of NFT sales"> <FacebookIcon size={32} round={true} /></FacebookShareButton>
                                        <WhatsappShareButton url={url} title="Share project when logged in with wallet to earn 30% of NFT sales"><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
                                        <TelegramShareButton url={url} title="Share project when logged in with wallet to earn 30% of NFT sales"><TelegramIcon size={32} round={true} /></TelegramShareButton>
                                        <InstapaperShareButton url={url} title="Share project when logged in with wallet to earn 30% of NFT sales">  <InstapaperIcon size={32} round={true} /></InstapaperShareButton>
                                        <LinkedinShareButton url={url} title="Share project when logged in with wallet to earn 30% of NFT sales"> <LinkedinIcon size={32} round={true} /></LinkedinShareButton>
                                        <EmailShareButton url={url} title="Share project when logged in with wallet to earn 30% of NFT sales"><EmailIcon size={32} round={true} /></EmailShareButton></>
                                )
                                }
                            </div>
                        </div>
                        <div className="col-2 p-0 text-right">
                            {location.pathname === `/projnftdetails/${props.id}` ? (
                                <CopyToClipboard text={userprojurl} >
                                    <div className='copy'>

                                        <a> <i className="fa-sharp fa-solid fa-copy" onClick={() => setCopy(true)} onMouseLeave={() => setCopy(false)} disabled={window.ethereum?.selectedAddress && sessionStorage.getItem('authToken') ? false : true}></i></a>
                                    </div>
                                </CopyToClipboard>
                            ) : (

                                <CopyToClipboard text={url} >
                                    <div className='copy'>

                                        <a> <i className="fa-sharp fa-solid fa-copy" onClick={() => setCopy(true)} onMouseLeave={() => setCopy(false)} disabled={window.ethereum?.selectedAddress && sessionStorage.getItem('authToken') ? false : true}></i></a>
                                    </div>
                                </CopyToClipboard>
                            )}
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

export default ReferalPopup