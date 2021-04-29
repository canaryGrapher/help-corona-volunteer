import React, { Fragment, useState } from 'react'
import Resourcearea from './components/Resourcearea'
import Requestarea from './components/Requestarea'
import { CustomerServiceFilled, FundFilled, FundOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'

function App() {
  const [selectedTab, setSelectedTab] = useState(<Resourcearea />)
  const [selectedTabName, setSelectedTabName ] = useState("Resource")
  
  const changeToResource = () => {
    setSelectedTab(<Resourcearea />)
    setSelectedTabName("Resource")
  }
  const changeToRequest = () => {
    setSelectedTab(<Requestarea />)
    setSelectedTabName("Request")
  }
  
  const ResourceTabDesign = selectedTabName === "Resource" ? <FundFilled className="fs-2 text-dark" /> : <FundOutlined className="fs-2 text-offwhite" />
  const RequestTabDesign = selectedTabName === "Request" ? <HeartFilled className="fs-2 text-dark" /> : <HeartOutlined className="fs-2 text-offwhite" />
  const ResourceSubtext = selectedTabName === "Resource" ? "text-dark fw-bold" : "text-white"
  const RequestSubtext = selectedTabName === "Request" ? "text-dark fw-bold" : "text-white"
  const ResourceTabContainer = selectedTabName === "Resource" ? "bg-white d-flex flex-column my-3 py-2 allow-select" : "d-flex flex-column my-3 py-2 allow-select"
  const RequestTabContainer = selectedTabName === "Request" ? "bg-white d-flex flex-column my-3 py-2 allow-select" : "d-flex flex-column my-3 py-2 allow-select"
  
  return (
    <Fragment>
      <div className="App p-0 m-0 row">
        <div className="col-md-1 d-md-flex flex-column d-none text-center text-white position-relative p-0 m-0 side-bar">
          <div className="position-absolute text-center w-100">
            <h1 className="text-white mx-auto mt-3 mb-0"><CustomerServiceFilled /></h1>
            <p className="text-white text-center fw-bold mt-0">Volunteer</p>
          </div>
          <div className="d-flex flex-column justify-content-center h-100">
            <div className={ResourceTabContainer} onClick={changeToResource}>
              {ResourceTabDesign}
              <p className={ResourceSubtext}>Your leads</p>
            </div>
            <div className={RequestTabContainer} onClick={changeToRequest}>
              {RequestTabDesign}
              <p className={RequestSubtext}>Requests</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-11 d-flex main-area ps-md-3 m-0 p-0">
          {selectedTab}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
