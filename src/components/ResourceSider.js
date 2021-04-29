import React, { useState, useEffect } from 'react';
import Cards from './blocks/Cards'
import axios from 'axios'
import constants from '../Constants'

const ResourceSider = (props) => {
    const [sideState, setSideState] = useState("Nothing")
    const [requireRefresh, setRequireRefresh] = useState(false)
    useEffect(() => {
        const getResponse = async () => {
            const individualData = await axios.get(`${constants.URL}/api/resources/list/${constants.API_KEY}`)
            if (individualData.data === "Error") {
                setSideState("Nothing")
            }
            else {
                setSideState(individualData.data)
            }
        }
        getResponse()
    }, [requireRefresh, props.loadingState])
    const deleteLeadNow = () => {
        const newState = !requireRefresh;
        setRequireRefresh(newState)
    }
    const noLeadsPlaceHolder = <p>No leads yet.</p>
    const fetchedLeadsAffix = sideState === "Nothing" ? noLeadsPlaceHolder : sideState.map(element => {
        return (
            <Cards key={element._id} objectID={element._id} district={element.district} info={element.info} name={element.name} state={element.state} typething={element.type} phone={element.phone} deleteLead={deleteLeadNow} />
        )
    });
    return (
        <div className="row overflow-scroll h-100">
            {fetchedLeadsAffix}
        </div>
    );
};

export default ResourceSider;