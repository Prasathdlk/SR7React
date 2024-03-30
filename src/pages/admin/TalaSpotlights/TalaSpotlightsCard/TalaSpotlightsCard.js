import React, { useEffect } from 'react';
import "assets/css/Spotlights/Spotlights.css";
import TalaSearch from '../TalaSearch/TalaSearch';
import SpotlightListing from "components/Spotlight/SpotlightListing";
import { useNavigate } from "react-router-dom";
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotlightBanner } from "redux/Actions/Spotlight";
import { Link } from 'react-router-dom';

const TalaSpotlightsCard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpotlightBanner());
  }, [])
  const { spotlightBanner } = useSelector(state => state.spotlight);
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/spotlightsubmission")

  }
  const { spotlightListing } = useSelector(state => state.spotlight);
  return (
    <>
      <div className="col-lg-12 col-md-12 col-xl-12 col-12 layout-spacing mt-4" >
        <div className='statbox exhibitionBannerCard box box-shadow'>
          <div className='custom-carousel'>
            <div>
              <div className="row">
                <div className="col-lg-12 col-md-12 p-0">
                  <Carousel >
                    <div className='col-xl-12'>
                      {/* <div className="overflow-hidden"> */}
                      {Object.keys(spotlightBanner).length > 0
                        && Object.keys(spotlightBanner.data).length
                        && spotlightBanner.data.map((item, index) => {
                          // const thumbnail = item.thumbnails.split(',');
                          const thumbnail = item.thumbnail;
                          return (<img key={`sp${index}`}
                            src={thumbnail} className='img-fluid conferenceBanners' />)
                        })
                      }
                      <div className='mt-5 submitSpotlight'>
                        {/* <button type="primary" shape="round" size={`lfarge`} onClick={handleClick} className='btnForsubmitSpotlight'>
                          Submit Spotlights
                        </button> */}
                        <button type="submit"
                          className="col-12 btn bg-gradient-primarys text-white " onClick={handleClick}>
                          Submit Spotlights
                        </button>
                      </div>
                    </div>
                    {/* </div> */}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-12 col-lg-6 col-md-12 col-sm-12 col-12 layout-spacing'>
        <div className='widget widget-table-one'>
          <div className='widget-content' >
            <div className="col-xl-12 col-md-12 col-sm-12 col-12">
              <br /> <h4 style={{ textAlign: "center" }}>SR7 Spotlights</h4><br />
            </div>
            <TalaSearch />
            <div className="row">
              {/* <div className="widget-content mt-3" style={{ paddingRight: "15px" }}> */}
              {/* <div className="d-flex flex-row"> */}
              {Object.keys(spotlightListing).length > 0
                && spotlightListing.data.length > 0
                &&
                spotlightListing.data.map((item, index) => {
                  const thumbnail = item.thumbnail ? item.thumbnail.split(',') : [];
                  return (
                    <div key={index} className=" col-12 col-xl-4 col-md-12 col-lg-4 py-3" >
                      <div className="card widget overflow-hidden p-0">
                        {thumbnail.length > 0 &&
                          <img className="card-img-top" src={thumbnail[0]} alt="Card image cap" />
                        }
                        <div className="p-3" style={{ minHeight: "280px" }}>
                          <Link to={`/sr7spotlights/details/${item.id}`} >
                            <div className="text-black">
                              <h6 className="mb-3 strong" style={{ fontWeight: "600", fontSize: "17px" }}>{item.title}</h6>
                            </div>
                          </Link>
                          <h6 className="mb-2" style={{ fontSize: "11px" }}>Category : &nbsp;{item.category_title}</h6>
                          <h6 className="mb-3" style={{ fontSize: "11px" }}>Published on : &nbsp;{item?.publish_date} </h6>
                          <p className="mb-3 paraSpotlight" style={{ fontSize: "14px", color: "#515050" }}>
                            <span dangerouslySetInnerHTML={{ __html: item.description.slice(0, 200) }} >
                            </span>
                          </p>
                        </div>
                        <div className="col-12 card-footer">
                          <Link to={`/sr7spotlights/details/${item.id}`} >
                            <div className="d-flex col-12 justify-content-center btn btn-sm text-white readmorebtn">
                              <div > Read More</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default TalaSpotlightsCard