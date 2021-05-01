import React from 'react';
import axios from 'axios'
import { Typography, Row, Popconfirm, message } from 'antd'
import { DeleteFilled, QuestionCircleOutlined } from '@ant-design/icons'
import constants from '../../Constants'
// Destructuring elements from Typgrography component
const { Title, Paragraph } = Typography

const Cards = (handles) => {
    const deleteAction = async () => {
        const deleteRequest = await axios.delete(`${constants.URL}/api/resources/close/${constants.API_KEY}/${handles.typething}/${handles.objectID}`)
        if (deleteRequest.data === "Deleted") {
            message.error("Deleted")
        }
        handles.deleteLead()
    }
    const phoneLink = "tel:" + handles.phone;
    let timestamp = handles.objectID.toString().substring(0, 8)
    let date = new Date(parseInt(timestamp, 16) * 1000)
    var diff = (Date.now() - date) / 1000;
    diff /= 60;
    const setElapsedMinutes = diff > 60 ? ((diff / 60) > 24 ? <span>{(Math.abs(Math.round(diff / (60 * 24))))} day(s) ago</span> : <span>{Math.abs(Math.round(diff / 60))} hour(s) ago</span>) : <span>{Math.abs(Math.round(diff))} minute(s) ago</span>;
    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }
    return (
        <div className="col-12 col-md-6 col-lg-4 p-1" key={handles.identifier}>
            <div className="card bg-light border-3">
                <div className="card-body">
                    <Paragraph className="mb-0 text-dark">Updated: {setElapsedMinutes}</Paragraph>
                    <Title className="card-title text-dark mt-1 mb-0 fs-2">{handles.district + ", " + titleCase(handles.state)}</Title>
                    <Paragraph className="text-dark mt-0 mb-0 fs-5">Type: {handles.typething.charAt(0).toUpperCase() + handles.typething.substring(1)}</Paragraph>
                    <Paragraph className="fw-bold text-dark mt-2 mb-0 fs-5">Name:</Paragraph>
                    <Paragraph className="card-text text-dark mt-0">{handles.name}</Paragraph>
                    <Paragraph className="fw-bold text-dark mt-2 mb-0 fs-5">Information:</Paragraph>
                    <Paragraph className="card-text text-dark mt-0">{handles.info}.</Paragraph>
                    <Row className="d-flex flex-row justify-content-around m-0 p-0 w-100">
                        <a href={phoneLink} className="btn text-white" style={{ backgroundColor: "#3225ab" }}>{handles.phone}</a>
                        <Popconfirm
                            placement="leftBottom"
                            title="Confirm delete operation?"
                            onConfirm={() => deleteAction(handles.objectID)}
                            okText="Yes"
                            cancelText="No"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        >
                            <DeleteFilled className="text-danger fs-3" style={{ cursor: "pointer" }} />
                        </Popconfirm>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Cards

