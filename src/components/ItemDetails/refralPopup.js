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
import { Instagram } from '@material-ui/icons';
// import 'bootstrap/dist/css/bootstrap.min.css';
function MyVerticallyCenteredModal(props) {
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [short_url, setShortUrl] = useState("");
    // const [symbol, setSymbol] = useState("");
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({});
    const OnSubmit = (data) => {
        // dispatch(CreateCollectionAction(data))
    }
    const url = window.location.href + '/' + props.userRef
    // const Refurl = window.location.href + '/' + props.id + '/' + props.userRef
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Refer your friends
                </Modal.Title>
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
                                <TwitterShareButton url={'www.twitter.com' + '/' + url} title="Reffral code "> <TwitterIcon size={32} round={true} /></TwitterShareButton>
                                <FacebookShareButton url={'www.facebook.com' + '/' + url} title="Reffral code "> <FacebookIcon size={32} round={true} /></FacebookShareButton>
                                <WhatsappShareButton url={'https://web.whatsapp.com/' + '/' + url} title="Reffral code "><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
                                <TelegramShareButton url={'www.telegram.com' + '/' + url} title="Reffral code "><TelegramIcon size={32} round={true} /></TelegramShareButton>
                                <InstapaperShareButton url={'www.instagram.com' + '/' + url} title="Reffral code ">  <InstapaperIcon size={32} round={true} /></InstapaperShareButton>
                                <LinkedinShareButton url={'www.linkedin.com' + '/' + url} title="Reffral code ">  <LinkedinIcon size={32} round={true} /></LinkedinShareButton>
                                <EmailShareButton url={'www.gmail.com' + '/' + url} title="Reffral code " ><EmailIcon size={32} round={true} /></EmailShareButton>
                            </div>
                        </div>
                        <div className="col-2 p-0 text-right">
                            <CopyToClipboard text={url}>
                                <div className='copy'>

                                    <a> <i className="fa-sharp fa-solid fa-copy"></i></a>
                                </div>
                            </CopyToClipboard>
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

export default MyVerticallyCenteredModal