import { Form, Input, } from 'antd';
import Modal from 'react-bootstrap/Modal';
import React, { Fragment, useEffect,   } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/lib/modal/style/css';
import 'antd/lib/button/style/css'

import { UpdateOrganizationAction } from '../../../redux/Actions/authAction';


const EditName = (props) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const userdet = useSelector(state => {
        return state?.user?.userdetail
    })

    useEffect(() => {
        form.setFieldsValue({
            nfts: [{
                organization_name: userdet?.organization_detail?.organization_name,
                description: userdet?.organization_detail?.description,
                banner_image: userdet?.organization_detail?.banner_image,
                logo: userdet?.organization_detail?.logo

                // preview_imag: nftdetail.preview_imag,
            }]
        })
    })

    const onFinish = async (values) => {
        
        try {
            const formData = new FormData()
            formData.append('organization_name', values?.nfts?.map(x =>
                x.organization_name))
            formData.append('banner_image', "")
            formData.append('description', "")
            formData.append('logo', "")
            dispatch(UpdateOrganizationAction(formData, userdet?.organization_detail?.id, props, userdet?.user_id))
        } catch (error) {
            console.log('error', error)
        }
    }
    return (
        <div className="main-create" >
           
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
           
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update organization
                    </Modal.Title>
                    <div>
                        <a><i class="fa-regular fa-xmark-large" style={{ color: '#fff' }} onClick={props.onHide}>X</i></a>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className='col-12 item-form card no-hover'>
                        <Form form={form} name="dynamic_form_nest_item"
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
                                                            <label>Organization Name</label>
                                                            <div>
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[name, "organization_name"]}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Missing  organization_name',
                                                                        },
                                                                    ]}
                                                                >
                                                                    {/* <label>Name</label> */}
                                                                    <Input placeholder="Organization name" />
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
                                    <button className="btn btn-primary banner-update" type="submit">Update </button>
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
export default EditName;