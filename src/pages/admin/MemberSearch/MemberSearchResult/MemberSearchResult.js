import React, { useEffect, useState } from 'react'
import "assets/css/MemberSearch/MemberSearch.css"
import BoldHeading from 'components/BoldHeading/BoldHeading'
import { useDispatch, useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { setClickedMember } from "redux/Reducers/LoggedSlice";
import { Link } from 'react-router-dom';
import location_logo from "assets/img/location.png";


import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

const columns = [
  {
    title: 'Company Name',
    dataIndex: 'companyname',
  },
  {
    title: 'Members Name',
    dataIndex: 'membername',
  },
  {
    title: 'Country',
    dataIndex: 'country',
  },
  {
    title: 'Branch',
    dataIndex: 'city',
  },
  {
    title: 'Airport Code',
    dataIndex: 'airportcode',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const MemberSearchResult = ({Links}) => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDUUQPcnJ2yyGf8cr14xOMJE7qIz3SLwvw",
  });
  const [activeMarker, setActiveMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 30.04540687476013, lng: 31.236161024613633 });
  const [zoom, setZoom] = useState(2);
  const [tooltip, setTooltip] = useState(false);
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      setTooltip(true);
    }
    setActiveMarker(marker);
  };
  const closeTooTip = () => {
    setTooltip(false);
    setActiveMarker(null);
  }
  const handleMapClick = (event) => {
    // Update the center state based on the clicked position
    setCenter({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };
  const dispatch = useDispatch();
  const { isLoading,
    memberSearchResult,
    companyBranches } = useSelector(state => state.member);
  const [companyData, setCompnayData] = useState([]);
  const navigate = useNavigate()
  const [rowSeleted, setRowSelected] = useState(-1);
  useEffect(() => {
    if (rowSeleted >= 0) {
      if (Object.keys(memberSearchResult).length > 0
        && memberSearchResult.data.length > 0) {
        const clickedMember = memberSearchResult.data.find(item => item.id === rowSeleted);
        dispatch(setClickedMember(clickedMember));
        navigate(`/companyprofile/${clickedMember.company_id}/${clickedMember.id}`)
      }
    }
  }, [rowSeleted])

  useEffect(() => {
    let member = []
    if (Object.keys(memberSearchResult).length > 0
      && memberSearchResult.data.length > 0) {
      memberSearchResult.data.map((item, index) => {
        member.push({
          key: index,
          id: item.id,
          membername: `${item.first_name} ${item.last_name}`,
          companyname: item.company_name,
          country: item.country,
          city: item.city,
          airportcode: item.company_airport_code,
          status: item.status
        })
      })
    }
    setCompnayData(member);
  }, [memberSearchResult]);

  const [markers1, setMarkers] = useState();
  useEffect(() => {
    let updatedMarkers = [];
    let head_item = "";
    if (typeof companyBranches.data !== 'undefined'
      && companyBranches.data.length > 0) {
      companyBranches.data.map((item, index) => {
        if (item.latitude
          && item.longitude || item.c_latitude && item.c_longitude) {
            if(item.headquarters == item.branch_name)
            {
                updatedMarkers.push({
                  id: index,
                  name: <Link to={`/companyprofile/${item.company_id}`}><h5  className='company_hover'> <i class="fa-solid fa-link"></i> {item?.company_name}</h5>  <p style={{ fontWeight: 'bold', fontSize: '18px' }} ><center className='country_hover'> {item?.branch_name}</center></p> </Link>,
                  position: { lat: Number(item.latitude ? item.latitude : item.c_latitude), lng: Number(item.longitude ? item.longitude  : item.c_longitude ) },
                  icon: item.headquarters == item.branch_name ? location_logo : location_logo
                })
                head_item = item;
            }
        }
      });
    }
    let latlng = localStorage.getItem('latlng');
    let city = localStorage.getItem('city');
    if(latlng && latlng !=0)
    {
      if(city == 0)
      {
        setCenter(JSON.parse(latlng));
        setZoom(3);
      }
      else
      {
        
        if(head_item)
        {
          setCenter({ lat: Number(head_item.latitude ? head_item.latitude : head_item.c_latitude), lng: Number(head_item.longitude ? head_item.longitude  : head_item.c_longitude ) });
          setZoom(4);
        }
        else
        {
          setCenter({ lat: 30.04540687476013, lng: 31.236161024613633 });
          setZoom(2);
        }
      } 
    }
    else
    {
      if(head_item && city == "company")
      {
        setCenter({ lat: Number(head_item.latitude ? head_item.latitude : head_item.c_latitude), lng: Number(head_item.longitude ? head_item.longitude  : head_item.c_longitude ) });
        setZoom(4);
      }
      else
      {
        setCenter({ lat: 30.04540687476013, lng: 31.236161024613633 });
        setZoom(2);
      }
    }
    setMarkers(updatedMarkers);
  }, [companyBranches]);

  

  return (
    <div className="widget-content widget-content-area member-search-result">
      <div className="widget-header">
        <div className="row">
          <div className="d-flex flex-row col-xl-12 col-md-12 col-sm-12 col-12 gap-3">
            <div className="widget-header mt-1">
              <BoldHeading
                Boldheading="Members Search Result"
              />
            </div>
            <Links to="viewmap">
              <button className="btn btn-sm bg-gradient-primary text-white ">Map View</button>
            </Links>
          </div>
        </div>
      </div>
      <br />
      <div>
        {!isLoading ?
          <Table
            scroll={{
              x: 600,
            }}
            columns={columns}
            dataSource={companyData}
            pagination={{
              defaultPageSize: 20,
              showSizeChanger: true,
              pageSizeOptions: ['20', '50', '100']
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => { setRowSelected(record.id) }
              };
            }}
            locale={{
              emptyText:
                (<div
                  className="css-dev-only-do-not-override-htwhyh ant-empty ant-empty-normal">
                  <div className="ant-empty-image">
                    <svg width="64" height="41" viewBox="0 0 64 41" xmlns="https://www.w3.org/2000/svg">
                      <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                        <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7">
                        </ellipse><g fillRule="nonzero" stroke="#d9d9d9">
                          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa">
                          </path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="ant-empty-description">
                    Please Search & Select Members first
                  </div>
                </div>
                )
            }}
          />
          :
          <div className="col-xl-12 col-lg-12" style={{ margin: "15% 40%" }}>
            <RotatingLines
              strokeColor="#1D4AEB"
              strokeWidth="5"
              animationDuration="1.00"
              width="70"
              visible={true}
            />
          </div>
        }
        <div id='viewmap' style={{ color: "white" }}>.</div>
      </div>
      {/* {console.log(markers1)} */}
      <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
        <div >
          <div>
            <div style={{ height: "75vh", width: "100%" }}>
              {isLoaded ? (
                <GoogleMap
                  //center={{ lat: 40.3947365, lng: 49.6898045 }}
                  center={center}
                  zoom={zoom}
                  mapContainerStyle={{ width: "100%", height: "75vh" }}
                >
                  {markers1.map(({ id, name, position, icon }) => (
                    <MarkerF
                      key={id}
                      position={position}
                      onMouseOver={() => handleActiveMarker(id)}
                      icon = {icon}
                    >
                      {activeMarker === id ? (
                        <InfoWindowF onCloseClick={() => setActiveMarker(null)} >
                          <div style={{ fontSize: "15px", width: 'auto', height: 'auto', textAlign: 'center', overflow: 'hidden' }} onMouseLeave={() => closeTooTip()} className='infoPopWindow'>
                            {name}
                          </div>
                        </InfoWindowF>
                      ) : null}
                    </MarkerF>
                  ))}
                </GoogleMap>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberSearchResult