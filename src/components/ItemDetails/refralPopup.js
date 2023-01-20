import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CreateCollectionAction } from '../../redux/Actions/projectAction';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    InstapaperShareButton,
    InstapaperIcon,
    LineShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    LinkedinIcon,
    EmailIcon,
} from "react-share";
import {
    FacebookShareCount,
    HatenaShareCount,
    OKShareCount,
    PinterestShareCount,
    RedditShareCount,
    TumblrShareCount,
    VKShareCount
} from "react-share";
import { Tooltip } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
function ReferalPopup(props) {

  const [copy, setCopy] = useState(false)
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [short_url, setShortUrl] = useState("");
    // const [symbol, setSymbol] = useState("");
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({});
    const OnSubmit = (data) => {
        // dispatch(CreateCollectionAction(data))
    }
    const url = window.location.href + `?refid=${props.userRef}`
    // const Refurl = window.location.href + '/' + props.id + '/' + props.userRef
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header >
                {window.ethereum?.selectedAddress ? (

                <Modal.Title id="contained-modal-title-vcenter">
                    Refer your friends
                    <p>Earn Royalties When You Share: <br />10% of NFT for first level referral, 5% for second, 1% for all others</p>


                </Modal.Title>
                ):(
            <Modal.Title id="contained-modal-title-vcenter">
                           
                                <p>Earn When You Share: <br />20% of NFT sales for first level referral </p>
<p style={{color:"red"}}>Connect your wallet to earn referral income in MATIC when you share projects</p>


                            </Modal.Title>
                )}
                <div>
                    <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
                </div>
            </Modal.Header>
            <Modal.Body>
                <form className="item-form card no-hover">
                    <div className="row">

                        <div className="col-10 p-0">

                            <div className="form-group m-0">
                                {/* <label>Display name</label> */}
                                <input
                                    type="text"
                                    className="form-control"
                                    name="display_name"
                                    value={url}
                                // required
                                // placeholder="Enter collection name"
                                // {...register('title')}
                                // value={title}
                                // onChange={(e) => {

                                //     setTitle(e.target.value);
                                // }} 
                                />


                            </div>
                            {/* <FacebookShareCount url={"shareUrl"}>
                            {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
                        </FacebookShareCount> */}


                            <hr />
                            <div className="refer-icons">
                                <TwitterShareButton url={url} title="Share project when logged in with wallet to earn 20% of NFT sales" > <TwitterIcon size={32} round={true} /></TwitterShareButton>
                                <FacebookShareButton url={url} title="Share project when logged in with wallet to earn 20% of NFT sales" > <FacebookIcon size={32} round={true} /></FacebookShareButton>
                                <WhatsappShareButton url={url} title="Share project when logged in with wallet to earn 20% of NFT sales" ><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
                                <TelegramShareButton url={url} title="Share project when logged in with wallet to earn 20% of NFT sales" ><TelegramIcon size={32} round={true} /></TelegramShareButton>
                                <InstapaperShareButton url={url} title="Share project when logged in with wallet to earn 20% of NFT sales" >  <InstapaperIcon size={32} round={true} /></InstapaperShareButton>
                                <LinkedinShareButton url={url} title="Share project when logged in with wallet to earn 20% of NFT sales" > <LinkedinIcon size={32} round={true} /></LinkedinShareButton>
                                <EmailShareButton url={url} title="Share project when logged in with wallet to earn 20% of NFT sales" ><EmailIcon size={32} round={true} /></EmailShareButton>
                            </div>
                        </div>
                        <div className="col-2 p-0 text-right">
                            <CopyToClipboard text={url} >
                                <div className='copy'>

                                    <a> <i className="fa-sharp fa-solid fa-copy" onClick={() => setCopy(true)} onMouseLeave={()=> setCopy(false)}></i></a>
                                </div>
                            </CopyToClipboard>
                            {copy == true && 
                            <span>Copied!</span>
                            
                        }
                        
                            
                        </div>
                    </div>


                </form>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

export default ReferalPopup