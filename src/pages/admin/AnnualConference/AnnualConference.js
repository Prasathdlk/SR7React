import React, { useRef, useEffect, useState } from 'react'
import AnnualConferenceCard from "./AnnualConferenceCard/AnnualConferenceCard"
import KeyPoints from "./KeyPoints/KeyPoints.js"
import OurPartners from './OurPartners/OurPartners.js'
import JoinUs from "./JoinUs/JoinUs"
import ListAttendenceDummy from './ListAttendence/ListAttendenceDummy'
import {
  getSponsersList,
  getAttendeeList,
  getConferenceBanner,
  getKeyEventsList
} from "redux/Actions/AnnualConference"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import ListAttendence from './ListAttendence/ListAttendence'
import { RotatingLines } from 'react-loader-spinner';
import { saveAs } from "file-saver";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import conf_9 from "assets/img/2024Con.png"
import conf9_logo from "assets/img/9con_logo.png"

const AnnualConference = () => {
  const dispatch = useDispatch();
  const [sponser, setSpomser] = useState('');
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const { isLoading, conferenceBanner } = useSelector(state => state.annualconference);

  useEffect(() => {
    //const year = new Date().getFullYear();
    const year = 2025;
    dispatch(getAttendeeList({ year }));
    dispatch(getSponsersList({ year }));
    dispatch(getKeyEventsList({ year }));
    dispatch(getConferenceBanner({ year }));
    window.scrollTo(0, 0);
  }, [])
  const {
    sponsersList,
    attendeeList,
    keyEventsList } = useSelector(state => state.annualconference);
  const scrollRef = useRef(null);

  const handlebtnClick = (e) => {
    var year = e.target.value;
    // var showcurrentyear  = {'$(year==="2024")'}
    dispatch(getAttendeeList({ year }));
    dispatch(getSponsersList({ year }));
    dispatch(getKeyEventsList({ year }));
    dispatch(getConferenceBanner({ year }));
  }

  const downloadFile = (url) => {
    (async () => {
      saveAs(url, "doc-file");
    })();
  }
  return (
    <div className="layout-px-spacing" >
      <div className="row layout-spacing pt-4">
        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4'>
          <div className='widget-content widget-content-area' style={{ marginBottom: "25px", padding: "10px 20px" }}>
            {/* <AnnualConferenceCard /> */}
            <div className="widget-header">
              <div className="row">
                {!isLoading ?
                  <div className="col-lg-12 col-md-12 p-0">
                    <Carousel
                      removeArrowOnDeviceType={["mobile"]}
                      responsive={responsive}
                    >
                      {Object?.keys(conferenceBanner)?.length > 0
                        && Object?.keys(conferenceBanner?.data)?.length > 0 &&
                        <div className='anual-banner'>
                          {/* <img src={conf_9} className='img-fluid conferenceBanner' /> */}
                          {conferenceBanner?.data?.banner_url && <img src={conferenceBanner?.data?.banner_url} className='img-fluid conferenceBanner' /> }
                          <div className="col-12 d-flex flex-column justify-content-center carousel-captions ">
                            <h3 className='carousel-titles px-5' style={{ fontSize: "45px" }}>
                              { conferenceBanner?.data?.logo_url && <img src={conferenceBanner?.data?.logo_url} className='img-fluid annualBannerLogo' width="25%" /> }
                            </h3>
                            {/* <h5>Days left for the Conference </h5> */}
                            { conferenceBanner?.data?.reg_date && <h5 style={{ marginTop: "10px", fontWeight: "800" }} className='annualBannerTitles'>{conferenceBanner?.data?.reg_date}</h5> }
                            { conferenceBanner?.data?.place &&  <div style={{ fontWeight: "600", fontSize: "16px" }} className='annualBannerTitles'>{conferenceBanner?.data?.place}</div> }
                            { conferenceBanner?.data?.link_text && <div className='mt-md-3 mt-1'>
                                    <button type="button" className="btn btn-primarys mr-2">
                                        {/* Download Conference Images & Videos */}
                                        <a target='_blank' href={`${conferenceBanner?.data?.document_url}`}>{conferenceBanner?.data?.link_text}</a>
                                    </button>
                                  </div> }
                          </div>
                        </div>
                      }
                    </Carousel>
                  </div>
                  : <div className="col-xl-12 col-lg-12" style={{ margin: "15% 40%" }}>
                    <RotatingLines
                      strokeColor="#FF0091"
                      strokeWidth="5"
                      animationDuration="1.00"
                      width="70"
                      visible={true}
                    />
                  </div>}
              </div>
            </div>
          </div>
          <div className='d-flex flex-row' style={{ marginBottom: "25px" }}>
            <button
              className="btn btn-primaryss mr-2"
              value="2025"
              onClick={(e) => handlebtnClick(e)}>
              2025
            </button>
            {/* <button
              className="btn btn-primaryss mr-2"
              value="2023"
              onClick={(e) => handlebtnClick(e)}>
              2023
            </button> */}
          </div>
          {conferenceBanner?.data?.sub_banner_url && <div className='widget-content widget-content-area' style={{ marginBottom: "25px", padding: "10px 20px" }}>
            {/* <AnnualConferenceCard /> */}
            <div className="widget-header">
              <div className="row">
                {!isLoading ?
                  <div className="col-lg-12 col-md-12 p-0">
                    <Carousel
                      removeArrowOnDeviceType={["mobile"]}
                      responsive={responsive}
                    >
                      {Object?.keys(conferenceBanner)?.length > 0
                        && Object?.keys(conferenceBanner?.data)?.length > 0 &&
                        <div className='anual-banner'>
                          {/* <img src={conf_9} className='img-fluid conferenceBanner' /> */}
                          {conferenceBanner?.data?.sub_banner_url && <img src={conferenceBanner?.data?.sub_banner_url} className='img-fluid conferenceBanner' /> }
                          <div className="col-12 d-flex flex-column justify-content-center carousel-captions1">
                            { conferenceBanner?.data?.link_text1 && <div>
                                    <button type="button" className="btn btn-primarys mr-2">
                                        {/* Download Conference Images & Videos */}
                                        <a target='_blank' style={{fontSize:"16px"}} href={`${conferenceBanner?.data?.sub_document_url}`}>{conferenceBanner?.data?.link_text1}</a>
                                    </button>
                                  </div> }
                          </div>
                        </div>
                      }
                    </Carousel>
                  </div>
                  : <div className="col-xl-12 col-lg-12" style={{ margin: "15% 40%" }}>
                    <RotatingLines
                      strokeColor="#FF0091"
                      strokeWidth="5"
                      animationDuration="1.00"
                      width="70"
                      visible={true}
                    />
                  </div>}
              </div>
            </div>
          </div> }
          <div className='widget-content widget-content-area' style={{ marginBottom: "25px" }}>
            <KeyPoints keyEventsList={keyEventsList} />
          </div>
          <div className='widget-content widget-content-area' style={{ marginBottom: "25px" }}>
            <OurPartners
              scrollRef={scrollRef}
              sponsersList={sponsersList}
              setSpomser={setSpomser}
            />
          </div>
          <div className='widget-content widget-content-area' style={{ marginBottom: "25px" }}>
            <ListAttendence attendeeList={attendeeList} />
          </div>
            <div className='widget-content widget-content-area' style={{ marginBottom: "25px" }}>
              <JoinUs
                ref={scrollRef}
                sponsersList={sponsersList}
                sponser={sponser}
              />
            </div>
        </div>
      </div>
    </div>
  )
}

export default AnnualConference