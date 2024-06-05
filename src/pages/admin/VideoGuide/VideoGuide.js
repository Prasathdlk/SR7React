import React, { useEffect, useState } from 'react'
import coming from "../../../assets/img/coming.png"
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState } from "redux/Reducers/VideoGuideSlice"
import { getVideoGuide } from "redux/Actions/videoGuide"
import './VideoGuide.css';
import Carousel from "react-multi-carousel";
import { Link } from 'react-router-dom';

const VideoGuide = () => {


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideoGuide());
    window.scrollTo(0, 0);
  }, [])
  const {
    isSuccess,
    error,
    videoGuideList
  } = useSelector(state => state.videoGuide);


  return (
    <div className="layout-px-spacing">
      <div className="row layout-spacing pt-4">
        <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
          <div className="widget-content widget-content-area br-6 ">
            <h4 className="table-header" style={{ fontSize: "1.25rem" }}>Video Guide</h4>
            <br /><br />
            <div className='d-flex justify-content-center'>
              {Object.keys(videoGuideList?.data).length == 0 &&
                <img src={coming} alt='coming' className='img-fluid ' style={{ width: "60%", height: "60%" }} />
              }
            </div>
            <div className="widget-content mt-3" style={{ paddingRight: "15px" }}>
          <div className="row">
            <Carousel
              removeArrowOnDeviceType={["mobile"]}
              responsive={responsive}
            >
              {videoGuideList?.data?.length > 0 &&
                videoGuideList?.data?.map((item, index) => {
                  // console.log("itemAnnouncement---------------->", item)
                  const thumbnail = item.thumbnail;
                  return (
                    <div className=" col-12 p-md-3 p-4" key={`we${index}`}>
                      <div className="card widget overflow-hidden p-0">
                        {thumbnail.length > 0 &&
                          <img className="card-img-top" src={thumbnail} alt="Card image cap" />
                        }
                        <div className="p-3" style={{ minHeight: "200px" }}>
                          <Link to={`/announcements/details/${item.id}`}>
                            <div className="text-black">
                              <h6 className="mb-3 strong" style={{ fontWeight: "600", fontSize: "17px", height: "60px" }}>
                                {item?.title}
                              </h6>
                            </div>
                          </Link>

                          {/* <h6 className="mb-3" style={{ fontSize: "11px" }}>
                            Published on : {item?.publish_date}
                          </h6> */}
                          <p className="mb-3 paraSpotlight1" style={{ fontSize: "14px", color: "#515050" }}>
                            <span dangerouslySetInnerHTML={{ __html: item?.description.slice(0, 200) }} ></span></p>
                        </div>

                        <div className="col-12 card-footer">
                          <Link to={`/videoguide/details/${item.id}`}>
                            <div className="d-flex col-12 justify-content-center btn btn-sm readmorebtn text-white">
                              <div > Read More</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })

              }
            </Carousel> 
          </div>
        </div>
            {/* <div className='d-flex justify-content-center'>
              {Object.keys(videoGuideList?.data).length == 0 &&
                <img src={coming} alt='coming' className='img-fluid ' style={{ width: "60%", height: "60%" }} />
              }
              <div className="mt-3 row row-cols-md-2 row-cols-1">
                {Object.keys(videoGuideList).length > 0
                  && Object.keys(videoGuideList?.data).length > 0
                  && videoGuideList?.data.map((item) => {
                    return (item.youtube_video ? <div className="mb-4 col" ><iframe className='responsiveIframe'  src={item.youtube_video} ></iframe> <div className='responsiveIframeDiv'>{item.title}</div></div> : item.video_file ? <div className="mb-4 col" >
                    <video className='responsiveIframe' controls><source src={item.video_file} type="video/mp4" /></video> <div className='responsiveIframeDiv'>{item.title}</div></div> : '')
                  })
                  //<iframe  className='responsiveIframe'  src={item.video_file} autoplay="false"></iframe>
                }
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoGuide