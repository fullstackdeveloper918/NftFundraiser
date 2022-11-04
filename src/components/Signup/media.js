import React from 'react';
import 'antd/dist/antd.css';
// import './index.css';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
import { GetSocialMediaIcons } from '../../redux/Actions/projectAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { color } from '@mui/system';


const { Option } = Select;

const areas = [
    { label: 'Beijing', value: 'Beijing' },
    { label: 'Shanghai', value: 'Shanghai' },
];

const sights = {
    Beijing: ['Tiananmen', 'Great Wall'],
    Shanghai: ['Oriental Pearl', 'The Bund'],
};

const SocialMedia = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };

    const handleChange = () => {
        form.setFieldsValue({ sights: [] });
    };
    const dispatch = useDispatch()
    // const SightsKeys = keyof typeof sights;
    const socialmedia = useSelector(state => {
        return state?.getSocialmediaIcons?.getsocial
    })
    useEffect(() => {

        dispatch(GetSocialMediaIcons())
    }, [])


    return (
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.List name="users">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item>
                                    <Select style={{ width: 130 }}>
                                        {socialmedia?.map((option, key) => (
                                            <Option key={key.id} value={option.id}>
                                                {option.title}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'last']}
                                    rules={[{ required: true, message: 'Missing link' }]}
                                >
                                    <Input placeholder="Social link" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add field
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SocialMedia;



