import React, { useEffect, useState } from 'react';
import "assets/css/Dashboard/VisitedProfile.css";
import BoldHeading from 'components/BoldHeading/BoldHeading';
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import visit_logo from "assets/img/visit.png";
const VisitedProfile = ({ visitedProfiles }) => {
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({ lat: 40.3947365, lng: 49.6898045 });
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDUUQPcnJ2yyGf8cr14xOMJE7qIz3SLwvw",
  });
  const [activeMarker, setActiveMarker] = useState(null);
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
  useEffect(() => {
    if (visitedProfiles && visitedProfiles.data) {
      const updatedMarkers = visitedProfiles.data
        .filter(item => item.latitude && item.longitude)
        .map((item, index) => {
          return {
            id: index,
            name: `${item?.first_name} ${item?.last_name} - ${item?.company_name}`,
            position: { lat: Number(item?.latitude), lng: Number(item?.longitude) },
          };
        });

      setMarkers(updatedMarkers);
    }
  }, [visitedProfiles]);
  return (
    <div className="col-xl-8 col-lg-6 col-md-12 col-sm-12 col-12 layout-spacing" style={{ marginTop: "10px" }}>
      <div className="widget widget-chart-one" id="map-1">
        <BoldHeading
          Boldheading="Members who visited your profile"
        />
         <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
          <div data-mdb-vector-map-init>

            <div className="">

              <div style={{ height: "450px", width: "100%" }}>
                {isLoaded ? (
                  <GoogleMap
                    //   center={{ lat: 40.3947365, lng: 49.6898045 }}
                    center={center}
                    zoom={2}
                    //onMouseOver={() => setActiveMarker(null)}
                    mapContainerStyle={{ width: "100%", height: "450px" }}
                  >
                    {markers.map(({ id, name, position }) => (
                      <MarkerF
                        key={id}
                        position={position}
                        icon = {visit_logo}
                        onMouseOver={() => handleActiveMarker(id)}
                        onMouseOut={() => handleActiveMarker()}
                      >
                        {activeMarker === id ? (
                          <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                            <div style={{ width:'120px',height:'60px',textAlign:'center', overflow:'hidden',fontWeight:'bold'}} onMouseLeave={() => closeTooTip()}>
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
    </div>
  );
};

export default VisitedProfile;