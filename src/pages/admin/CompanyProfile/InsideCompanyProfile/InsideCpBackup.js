// import React, { useEffect, useState } from 'react'
// import "assets/css/CompanyProfile/CompanyProfile.css"
// import BoldHeading from 'components/BoldHeading/BoldHeading';
// // import { VectorMap } from "react-jvectormap";
// import { MDBVectorMap } from 'mdb-react-vector-maps';
// import { MDBBtn } from 'mdb-react-ui-kit';
// const convertLatLongToXY = (latitude, longitude, mapWidth, mapHeight) => {
//   const x = ((longitude + 180) * (mapWidth / 346.82)) + 474;
//   const y = ((mapHeight / 2) - (mapWidth * Math.log(Math.tan((Math.PI / 4) + (latitude * Math.PI / 358.80))) / (2 * Math.PI))) + 72;
//   return { x, y };
// };
// const InsideCompanyProfile = ({ data, info, bInfo, country, branchId }) => {

//   const [markers, setMarkers] = useState([]);
//   const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
//   const [pinRegions, setPinRegion] = useState('GB');
//   useEffect(() => {
//     const mapContainer = document.getElementById('map-3');
//     const mapWidth = mapContainer.offsetWidth;
//     const mapHeight = mapContainer.offsetHeight;
//     setMapDimensions({ width: mapWidth, height: mapHeight });
//   }, []);
//   useEffect(() => {
//     if (data
//       && mapDimensions.width
//       && mapDimensions.height) {
//       const updatedMarkers = data
//         .filter(item => item.latitude && item.longitude)
//         .map(item => {
//           const { x, y } = convertLatLongToXY(item.latitude, item.longitude, mapDimensions.width, mapDimensions.height);
//           return {
//             x,
//             y,
//             label: `${item.city}`,
//             // type: 'bullet',
//             fill: '#1D4AEB',
//           };
//         });

//       setMarkers(updatedMarkers);
//     }// eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [data]);

//   return (
//     <div className="col-xl-12 col-lg-8 col-md-12 mt-4" >
//       <div className="profile-info">
//         <div className="widget-header">
//           <BoldHeading
//             Boldheading="Company Location"
//           />
//         </div>
//         <br />
//         <MDBVectorMap
//           id="map-3"
//           data-mdb-vector-map-init
//           map='world'
//           style={{ backgroundColor: "#1b4d70", overflow: "hidden", position: 'relative' }}
//           selectFill='#81C784'
//           hoverFill='#A5D6A7'
//           readonly
//           markers={markers}      
//         />

//       </div>
//     </div>
//   )
// }

// export default InsideCompanyProfile
