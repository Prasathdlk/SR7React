import React, { useEffect, useState } from 'react'
import coming from "../../../assets/img/coming.png"
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState } from "redux/Reducers/VideoGuideSlice"
import { getVideoGuide } from "redux/Actions/videoGuide"

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
                {Object.keys(videoGuideList.data).length == 0 && 
                  <img src={coming} alt='coming' className='img-fluid ' style={{ width: "60%", height: "60%" }}  />
                }
              <div className="mt-3 row row-cols-md-2 row-cols-1">
                {Object.keys(videoGuideList).length > 0
                  && Object.keys(videoGuideList.data).length > 0
                  && videoGuideList.data.map((item) => {
                    return (item.youtube_video ? <div className="mb-4 col"><iframe width="500" height="315" src={item.youtube_video}></iframe> <br /><span>{item.title}</span></div> : item.video_file ? <div className="mb-4 col"><iframe width="500" height="315" src={item.video_file}></iframe> <br /><div style={{ fontSize:20,fontWeight:'bold',width:500 }}>{item.title}</div></div> : '')
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoGuide