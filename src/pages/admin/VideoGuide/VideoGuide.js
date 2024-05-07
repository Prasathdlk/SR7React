import React, { useEffect, useState } from 'react'
import coming from "../../../assets/img/coming.png"
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState } from "redux/Reducers/VideoGuideSlice"
import {getVideoGuide} from "redux/Actions/videoGuide"

const VideoGuide = () => {

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
              {videoGuideList?.data?.youtube_video ? <iframe width="500" height="315" src={videoGuideList?.data?.youtube_video}></iframe> : videoGuideList?.data?.vimeo_video  ? <iframe width="500" height="315" src={ videoGuideList?.data?.vimeo_video}></iframe> : videoGuideList?.data?.video_file  ? <iframe width="500" height="315" src={ videoGuideList?.data?.video_file}></iframe> : <img src={coming} alt='coming' className='img-fluid ' style={{ width: "60%", height: "60%" }} /> }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoGuide