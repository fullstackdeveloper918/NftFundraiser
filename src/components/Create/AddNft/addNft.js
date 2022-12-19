
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'react-bootstrap/Modal';
import React, { Fragment, useEffect, useState, useRef, useMemo, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { create } from 'ipfs-http-client'
import { useDispatch, useSelector } from 'react-redux';
import { AddNft, CreateProjectAction, GetCollectionsAction, NftList, UpdateNft, uploadNFT } from '../../../redux/Actions/projectAction';
import MyVerticallyCenteredModal from '../createCollection';
import styles from '../styles/styles.module.scss'
import 'antd/lib/form/style/css';
import 'antd/lib/upload/style/css';
import { Collapse } from 'antd';
import 'antd/lib/modal/style/css';
import 'antd/lib/button/style/css'
import JoditEditor from 'jodit-react'
import Loader from '../../Loader/loader';
import { useParams } from 'react-router';
import { dataURLtoBlob } from '../../../utils/blobfromurl';
import UploadImage from '../../../shared/Upload';
import { useFormData } from '../Context/context';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
// import ImgCrop from 'antd-img-crop';
// import Contact from './../../../themes/contact';

const AddNFT = ({ props, current, next, prev }) => {

    const editor = useRef(null);
    const [fileList, setFileList] = useState([])
    const { setFormValues } = useFormData();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    // console.log(data, 'formdta')
    const [count, setCount] = useState(0);
    // const [nft_description, setNft_description] = useState([])
    // console.log('nft_description', nft_description)

    const [modalShow, setModalShow] = React.useState(false);
    const [modalShoww, setModalShoww] = React.useState(false);
    const [nft_collection_id, setNft_collection_id] = useState({ 0: "0" });
    console.log(nft_collection_id, "sdfasf")
    const [items, setItems] = useState([]);
    const [coldata, setColData] = useState();
    const [allcol, setAllColl] = useState()
    const [description, setDescription] = useEffect()
    const [form] = Form.useForm()

    const [image, setImage] = useState('')

    const [loading, setLoading] = useState(false)
    const handleDecrement = () => {
        setCount(prevCount => prevCount - 1);
    };
    const id = useParams()

    const defaultValues = {
        setNft_description: '',
    }
    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm({
        mode: "all",


    });


    const dispatch = useDispatch()
    // const { data, setFormValues, prevValues } = useFormData();

    const OnSubmit = (data) => {
        setFormValues({ ...data, description });
        // localStorage.setItem('country', JSON.stringify(country))
        next();
    }


    const { Panel } = Collapse;
    const [expandIconPosition, setExpandIconPosition] = useState('end');

    const onPositionChange = (newExpandIconPosition) => {
        setExpandIconPosition(newExpandIconPosition);
    };
    const onChange = (key) => {
        console.log(key);
    };
    const nfts = [
        {
            key: 0,
            name: 'Wheat Flour',
            amount: 1000
        },

    ];
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const fileProps = {
        name: "file",
        multiple: false,
        beforeUpload: () => {
            return false;
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                let reader = new FileReader();
                reader.readAsDataURL(info.file);
                // setUploadedImage(info.file);
            }
        }
    };

    return (
        // <section className="author-area">
        <div className={current === 0 ? styles.showForm : styles.hideForm}>
            {loading ? (
                <Loader />
            ) : (
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                // centered
                >
                    <Modal.Header >
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update NFT
                        </Modal.Title>
                        <div>
                            <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form onSubmit={handleSubmit(OnSubmit)} className="item-form card no-hover">
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        {/* {type == 1 && ( */}

                                        <div className="form-group mt-3">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="title"
                                                placeholder="Name"
                                                {...register("title", { required: true })}
                                                aria-invalid={errors.title ? "true" : "false"}
                                            />
                                            {errors.title?.type === 'required' && <p style={{ color: 'red' }} role="alert">Title is required</p>}

                                        </div>
                                        {/* )} */}
                                    </div>
                                    <div className="col-12">
                                        <label>Description</label>
                                        <div className="form-group">


                                            <Controller
                                                control={control}
                                                name="description"
                                                defaultValue=""
                                                render={({ field: { value, onChange } }) => {
                                                    return <JoditEditor
                                                        ref={editor}
                                                        // value={description}

                                                        // config={config}
                                                        value={description}
                                                        placeholder="start typing"
                                                        tabIndex={1} // tabIndex of textarea
                                                        onBlur={newContent => setDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                                                        onChange={setDescription}
                                                    />
                                                }}
                                            />
                                            {errors.description?.type === 'required' && <p style={{ color: 'red' }} role="alert">Description is required</p>}
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button className="btn w-100 mt-3 mt-sm-4 mb-3" type="submit">Next </button>
                                    </div>
                                </div>
                            </form>

                        </div>


                    </Modal.Body>
                </Modal>

            )
            }
        </div >
    );
};
export default AddNFT;