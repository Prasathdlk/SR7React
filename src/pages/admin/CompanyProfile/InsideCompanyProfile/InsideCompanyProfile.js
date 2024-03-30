import React, { useEffect, useState } from 'react'
import "assets/css/CompanyProfile/CompanyProfile.css"
import BoldHeading from 'components/BoldHeading/BoldHeading';
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import location_logo from "assets/img/location.png";
const InsideCompanyProfile = ({ data, info, bInfo, country, branchId }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDUUQPcnJ2yyGf8cr14xOMJE7qIz3SLwvw",
  });
  const [activeMarker, setActiveMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 40.3947365, lng: 49.6898045 });
  const [zoom, setZoom] = useState(2);
  const [tooltip, setTooltip] = useState(false);
  const [loader, setloader] = useState(true);
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
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    let updatedMarkers = [];
    let head_item = "";
    let branch_item = "";
    if (data[0]?.headquarters) {
        data.map((item,index) => {
          if (item.latitude
            && item.longitude || item.c_latitude && item.c_longitude) {
              if(item.headquarters == item.branch_name)  //branchId !== 'undefined' && branchId == item.id &&
              {
                updatedMarkers.push({
                  id: index,
                  name:  `${item.city ? item.city : item.branch_name}`,
                  position: { lat: Number(item.latitude ? item.latitude : item.c_latitude), lng: Number(item.longitude ? item.longitude  : item.c_longitude ) },
                  icon: item.headquarters == item.branch_name ? location_logo : location_logo
                });
                head_item = item;
              }
              // else if(branchId === 'undefined' || branchId === false)
              // {
              //   updatedMarkers.push({
              //     id: index,
              //     name:  `${item.city}`,
              //     position: { lat: Number(item.latitude), lng: Number(item.longitude) },
              //     icon: (item.headquarters == item.branch_name) ? 'https://staging.tala.aero/backend/core/public/uploads/marker.png' : 'https://staging.tala.aero/backend/core/public/uploads/marker1.png'
              //   });

              //   if(item.headquarters == item.branch_name)
              //   {
              //     head_item = item;
              //   }

              // }
          }
        });

        if(head_item)
        {
          setCenter({ lat: Number(head_item.latitude), lng: Number(head_item.longitude) });
          setZoom(3);
        }
        else if(branch_item)
        {
          setCenter({ lat: Number(branch_item.latitude), lng: Number(branch_item.longitude) });
          setZoom(8);
        }
        else
        {
          setCenter({ lat: 40.3947365, lng: 49.6898045 });
          setZoom(2);
        }

        setMarkers(updatedMarkers);  
    }
  }, [data]);  //branchId
  return (
    <div className="col-xl-12 col-lg-8 col-md-12 mt-4" >
      <div className="profile-info">
        <div className="widget-header">
          <BoldHeading
            Boldheading="Company Location"
          />
        </div>
        <br />
        <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
        <div data-mdb-vector-map-init>
          <div className="">            
            <div style={{ height: "70vh", width: "100%" }}>
              {isLoaded ? (
                <GoogleMap
                 // center={{ lat: 40.3947365, lng: 49.6898045 }}
                 center={center}
                  zoom={zoom}
                  mapContainerStyle={{ width: "100%", height: "70vh" }}
                >
                  {typeof (data) !== 'undefined'
                    && data.length > 0 && markers !== 'undefined' && markers.map(({ id, name, position, icon }) => (
                      <MarkerF
                        key={id}
                        position={position}
                        icon={icon}
                        onMouseOver={() => handleActiveMarker(id)}
                        onMouseOut={() => handleActiveMarker()}
                      >
                        {activeMarker === id ? (
                          <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                            <div style={{ width:'100px',height:'20px',textAlign:'center', overflow:'hidden',fontWeight:'bold'}} onMouseLeave={() => closeTooTip()}>
                                {name}
                            </div>
                          </InfoWindowF>
                        ) : null}
                      </MarkerF>
                    ))}
                </GoogleMap>
              ) : null}
            </div></div></div>
          </div>
      </div>
    </div>
  )
}

export default InsideCompanyProfile