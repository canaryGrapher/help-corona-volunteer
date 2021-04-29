import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import constants from '../Constants'
import { List, Typography, Tooltip, Popconfirm, message } from 'antd';
import { DeleteFilled, PhoneFilled, QuestionCircleOutlined } from '@ant-design/icons';

const Requestarea = () => {
    const [requireRefresh, setRequireRefresh] = useState(true)
    const [fetchedData, setFetchedData] = useState([{
        "entrynumber": 1,
        "name": "Jane Doe",
        "phone": "+34123456789",
        "location": "Dummy Location",
        "info": "Lorem ipsum dolor",
        "closed": false,
        "_id": "1"
    }])
    useEffect(() => {
        const fetchData = async () => {
            let requestItems = await axios.get(`${constants.URL}/api/requests/view/${constants.API_KEY}`)
            setFetchedData(requestItems.data)
        }
        fetchData()
        setRequireRefresh(false)
    }, [requireRefresh])

    const handleOk = async (pointerData) => {
        const returnedDeleteString = await deleteData(pointerData)
        if(returnedDeleteString) {
            return null
        }
        message.success("Successfully deleted")

    };

    const deleteData = async (requestPointer) => {
        const deletedReq = await axios.put(`${constants.URL}/api/requests/close/${constants.API_KEY}/${requestPointer}`)
        setRequireRefresh(true)
        return deletedReq
    }

    const listData = [];
    for (let i = 0; i < fetchedData.length; i++) {
        listData.push({
            title: `${fetchedData[i].name}`,
            description: `${fetchedData[i].location}`,
            phone: `${fetchedData[i].phone}`,
            phonelink: `tel:${fetchedData[i].phone}`,
            content: `${fetchedData[i].info}`,
            identifier: `${fetchedData[i]._id}`,
            query: `${fetchedData[i].entrynumber}`
        });
    }

    return (
        <Fragment>
            <div className="container text-start py-3" style={{ overflowY: "scroll" }}>
                <Typography.Title>Help Requests</Typography.Title>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                        },
                        pageSize: 10,
                    }}
                    dataSource={listData}
                    renderItem={item => (
                        <List.Item key={item._id}>
                            <List.Item.Meta
                                title={<p className="m-0 p-0">{"#" + item.query + "\t" + item.title}</p>}
                                description={item.description}
                            />
                            <div className="row">
                                <div className="col-md-10 col-12">
                                    {item.content}
                                </div>
                                <div className="col-md-1 col-12 pt-2 pt-md-0">
                                    <Tooltip title={item.phone}>
                                        <a href={item.phonelink}>
                                            <PhoneFilled className="text-primary fs-4 me-2" />
                                        </a>
                                    </Tooltip>
                                    <Popconfirm
                                        placement="leftBottom"
                                        title="Confirm delete operation?"
                                        onConfirm={() => handleOk(item.identifier)}
                                        okText="Yes"
                                        cancelText="No"
                                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                    >
                                        <DeleteFilled className="text-danger fs-4 me-2" style={{ cursor: "pointer" }} />
                                    </Popconfirm>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </Fragment>
    );
}

export default Requestarea;