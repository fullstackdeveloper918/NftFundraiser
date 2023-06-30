import {  Form, Input, } from 'antd';
import Modal from 'react-bootstrap/Modal';
import React, { Fragment, useEffect, useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetCollectionsAction, NftList, UpdateNft, uploadNFT } from '../../redux/Actions/projectAction';
import 'antd/lib/form/style/css';
import 'antd/lib/upload/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/button/style/css'

import swal from 'sweetalert';

const EditNftName = (props) => {
    // 
    const [nftFileType, setNFtFileType] = useState('Image')
    const [nft] = useState()
    const [Pimage, setPimage] = useState()
    const [previewnft, setPreviewnft] = useState()
    const [source, setSource] = useState()
    const [nft_collection_id, setNft_collection_id] = useState({ 0: "0" });
    const [form] = Form.useForm()
    const [image, setImage] = useState()
    const [loading, setLoading] = useState(false)
    const defaultValues = {
        setNft_description: '',
    }
    const ipfsBaseUrl = 'https://ipfs.karmatica.io/ipfs/'
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetCollectionsAction())
        dispatch(NftList(props?.nft_id?.id))
    }, [props?.nft_id?.id,dispatch])
  
    const nftdetail = useSelector(state => {
        return state.projectdetails.nftlist
    })
 
   
    
    useEffect(() => {
        form.setFieldsValue({
            nfts: [{
                nft_name: nftdetail.title,
                nft_description: nftdetail.description,
                nft_collection_id: nftdetail.collection_id,
                nft_image: nftdetail.image,
                preview_imag: nftdetail.preview_imag,
            }]
        })
        setImage(nftdetail.image)
        setNFtFileType(nftdetail.extention)
        setPreviewnft(nftdetail.preview_imag)
        setNft_collection_id(nftdetail.collection_id)
    }, [form, nftdetail])
    const onFinish = async (values) => {
        // 
        try {
            setLoading(true)
            if (source) {
                const nftImagepromises = [uploadNFT(nft)]
                const imagesRes = await Promise.all(nftImagepromises).then(res => res)
                const addedImage = imagesRes?.map(x => ipfsBaseUrl + x?.data?.data?.image_hash)
                var str = addedImage;
                var check = str.includes("https://ipfs.io/ipfs/undefined");
                if (check === false) {
                    const formData = new FormData()
                    formData.append('image', addedImage)
                    formData.append('title', values?.nfts?.map(x =>
                        x.nft_name
                    ))
                    formData.append('collection_id', nft_collection_id)
                    formData.append('preview_imag', Pimage)
                    formData.append('extention', nftFileType)
                    formData.append('description', values?.nfts?.map(x => x.nft_description))
                    dispatch(UpdateNft(formData, props, setLoading))
                } else {
                    swal('error!', 'Nft not uploaded', 'error')
                }
            } else {
                const formData = new FormData()
                formData.append('image', image)
                formData.append('title', values?.nfts?.map(x =>
                    x.nft_name
                ))
                formData.append('extention', nftFileType)
                formData.append('preview_imag', previewnft)
                formData.append('collection_id', nft_collection_id)
                formData.append('description', values?.nfts?.map(x => x.nft_description))
                dispatch(UpdateNft(formData, props, setLoading))
            }
        } catch (error) {
        }
    };
    const nfts = [
        {
            key: 0,
            name: 'Wheat Flour',
            amount: 1000
        },
    ];
    return (
        <div className="main-create" >
           
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
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
                    <div className='col-12 item-form card no-hover'>
                        <Form form={form} name="dynamic_form_nest_item" initialValues={{
                            nfts: nfts, defaultValues
                        }}
                            onFinish={(event) => onFinish(event)}
                            autoComplete="off" className="item-form card no-hover">
                            <Form.List name="nfts">
                                {(fields, { add, remove }) => (
                                    <>
                                        <>
                                            {fields.map(({ key, name, ...restField }, index) => (
                                                <Fragment>
                                                    <div className="row relative">
                                                        <div className="col-12">
                                                            <label>Name</label>
                                                            <div>
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[name, "nft_name"]}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Missing  name',
                                                                        },
                                                                    ]}
                                                                >
                                                                    {/* <label>Name</label> */}
                                                                    <Input placeholder="Name" />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            ))}
                                        </></>
                                )}
                            </Form.List>
                            <Form.Item>
                                <div className="col-12">
                                    <button className="btn w-100 mb-3" type="submit">Update </button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
            {/* )} */}
        </div >
    );
};
export default EditNftName;