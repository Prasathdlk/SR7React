import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import "assets/css/Exhibitions/Exhibitions.css"
import { useDispatch, useSelector } from 'react-redux';
import { getExhibitionBanner } from "redux/Actions/EventExhibition";
import { Link } from 'react-router-dom';

const EventBanner = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExhibitionBanner());
  }, [dispatch])
  const { bannerList } = useSelector(state => state.exhibition);

  return (

    <div className="layout-pxx-spacing">
      <div className="row pt-3">
        <div className="col-lg-12 col-md-12 col-xl-12 col-12" style={{paddingBottom:"17px"}}>
          <div className='statbox exhibitionBannerCard box box-shadow'>
            <div className='custom-carousel'>
              <div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 p-0">
                    <Carousel >
                      {Object.keys(bannerList).length > 0 &&
                        bannerList.data.length > 0 &&
                        bannerList.data.map((item, index) => {
                          return (
                            <div className='col-xl-12' key={`cr${index}`}>
                              <img src={item?.exh_banner_url} className='img-fluid conferenceBanners' />
                              <div className='col-12 d-flex justify-content-md-start justify-content-center justify-content-sm-center justify-content-xl-start justify-content-lg-start flex-row flex-md-column d-md-flex'>
                                <div className=''>
                                </div>

                                <div className='headingBtnEvent'>
                                  <Link to={'/exhibitions'} >
                                    View & Submit Events
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EventBanner