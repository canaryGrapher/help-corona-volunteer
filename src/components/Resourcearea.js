import React, { useState, useEffect } from 'react'
import { Typography, Card, List, Divider, Modal, Button, Input, Form, Select } from 'antd'
import ResourceSider from './ResourceSider'
import axios from 'axios'
import constants from '../Constants'
import districts from '../Districtdata'
import state from '../Statenames'

const { Title, Paragraph } = Typography

const Resourcearea = () => {
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const [loadingState, setLoadingState] = useState(false)
    const [fetchedData, setFetchedData] = useState(null)
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Fill in the form to file your lead');
    const [selectedState, setSelectedState] = useState("Nothing")
    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setModalText("Please submit using the form submit button")
        setConfirmLoading(true);
    };

    const handleCancel = () => {
        setVisible(false);
        if(confirmLoading === "samosa") {
            return null
        }
    };
    const onFinish = (values) => {
        axios.post(`${constants.URL}/api/resources/new/${constants.API_KEY}`, {
            name: values.name,
            phone: values.phone,
            state: values.state,
            district: values.district,
            info: values.info,
            type: values.type,
            creator: values.creator
        }).then(res => {
            if (res.data === "Inserted") {
                setVisible(false);
                setConfirmLoading(false);
            }
            else {
                alert("There was an error, please try that again.")
                setVisible(false);
                setConfirmLoading(false);
            }
        })
        const reversalState = !loadingState
        setLoadingState(reversalState)
    };

    const onFinishFailed = (errorInfo) => {
    };
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${constants.URL}/api/resources/details/${constants.API_KEY}`)
                .then(async res => {
                    if (res.data === "Error") {
                        setFetchedData(null)
                    }
                    else {
                        setFetchedData(res.data)
                    }
                })
        }
        fetchData()
        setLoadingState(true)
    }, [visible, loadingState])

    const StateSelect = state.map(item => {
        return (
            <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
        )
    })

    const changeState = async (e) => {
        setSelectedState(e)
    }

    const districtObjects = districts.map(item => {
        let optionContainer;
        if (item.state.toLowerCase().replace(/\s/g, '') === selectedState.toLowerCase().replace(/\s/g, '')) {
            const data = item.districts.map(district => {
                return <Select.Option key={district} value={district}>{district}</Select.Option>
            })
            optionContainer = data;
            return optionContainer
        }
        return 0
    })

    const volunteerName = fetchedData ? `${fetchedData.firstname} ${fetchedData.lastname}` : "Error"
    const volunteerDetails = fetchedData ? <div><p className="m-0">Phone: {fetchedData.phone}</p><p className="m-0">Email: {fetchedData.email}</p></div> : "Contact admin"
    return (
        <div className="row w-100 m-0 p-0">
            <div className="d-none d-md-block col-md-3 d-flex flex-md-column information-tab py-4 px-3">
                <Card title="Volunteer Portal" className="w-100 text-start mx-auto">
                    <Title className="mb-2">{volunteerName}</Title>
                    {volunteerDetails}
                </Card>
                <div className="text-start">
                    <Paragraph>Since India is a big country and with a huge population, we have thought of dividing volunteers based on the regions they'll cover.</Paragraph>
                    <ul>
                        <li> Northern</li>
                        <li> Western</li>
                        <li> Central</li>
                        <li> Eastern</li>
                        <li> Southern</li>
                    </ul>
                    <Paragraph>Each of you, take a region, and all the states that lie in that region will be covered. I'll be providing each one of you with an .exe file (runs on windows PC) and you will be able to upload the vetted information on the website with it.</Paragraph>
                    <Divider orientation="left">Your role</Divider>
                    <ol>
                        <List.Item><Typography.Text mark>[1]</Typography.Text> Find the data regarding available plasma donors, oxygen beds, etc.</List.Item>
                        <List.Item><Typography.Text mark>[2]</Typography.Text> Personally verify the data. See if the phone number is available, or not, and get any other information you might find useful.</List.Item>
                        <List.Item><Typography.Text mark>[3]</Typography.Text> Input the data that you have gathered into this app.</List.Item>
                        <List.Item><Typography.Text mark>[4]</Typography.Text> If the resource is exhausted, delete it.</List.Item>
                        <List.Item><Typography.Text mark>[5]</Typography.Text> You can get more people to help you, but let me know about that. Each of you will get a customized software, so we'll know if anyone is pulling any funny business.</List.Item>
                        <List.Item><Typography.Text mark>[6]</Typography.Text> This is serious as lots of life depends on it, so verified data is a must.</List.Item>
                    </ol>
                    <Paragraph className="fw-bold text-center">Thanks for being a part of the cause.</Paragraph>
                </div>
            </div>
            <div className="col-12 col-md-9 text-start p-3 side-panel-display h-100 p-0 m-0" style={{ overfloyX: "hidden", overflowY: "scroll" }}>
                <div className="h-100">
                    <div className="d-flex flex-row">
                        <Title>Your leads</Title>
                        <Button type="primary" className="position-absolute" style={{ right: "30px" }} shape="round" onClick={showModal}>
                            New lead
                        </Button>
                    </div>
                    <Modal style={{ top: 20 }} title="Basic Modal" visible={visible} onOk={handleOk} onCancel={handleCancel} footer={[
                        <Button key="back" onClick={handleCancel}>
                            Close
                        </Button>
                    ]}
                    >
                        <p>{modalText}</p>
                        <Form
                            {...layout}
                            name="Lead Submission"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Lead Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your lead\'s name' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Phone number"
                                name="phone"
                                rules={[{ required: true, message: 'Please enter lead\'s phone number number' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Information"
                                name="info"
                                rules={[{ required: true, message: 'Please enter information about the lead' }]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                label="Lead type"
                                name="type"
                                rules={[{ required: true, message: 'Please enter the lead type' }]}
                            >
                                <Select>
                                    <Select.Option value="beds">Beds</Select.Option>
                                    <Select.Option value="oxygen">Oxygen</Select.Option>
                                    <Select.Option value="plasma">Plasma Donor</Select.Option>
                                    <Select.Option value="ventilator">Ventilators</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="State"
                                name="state"
                                rules={[{ required: true, message: 'Please enter the state' }]}
                            >
                                <Select onChange={changeState} showSearch>
                                    {StateSelect}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="District"
                                name="district"
                                rules={[{ required: true, message: 'Please enter the district' }]}
                            >
                                <Select showSearch>
                                    <Select.Option value="all">All Districts</Select.Option>
                                    {districtObjects}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Add Lead
                            </Button>
                            </Form.Item>
                        </Form>

                    </Modal>
                    <div>
                        <ResourceSider loadingState={loadingState} />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Resourcearea;