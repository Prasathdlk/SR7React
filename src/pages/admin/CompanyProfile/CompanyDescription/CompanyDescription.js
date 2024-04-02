// import React from 'react'
// import "assets/css/CompanyProfile/CompanyProfile.css"
// import BoldHeading from 'components/BoldHeading/BoldHeading';

// function CompanyDescription({ info, bInfo, country, branchId }) {
// console.log('info',info);
//   return (
//     <div className="col-xl-12 col-lg-8 col-md-12 mt-md-0 mt-4" >
//       <div className="profile-info">
//         <div className="widget-header">
//           {info?.strategic_type === "Strategic partner" ?
//             <BoldHeading
//               Boldheading={`Strategic Partner`}
//             />
//             : info?.strategic_type === 'License' ? 
//             <BoldHeading
//               Boldheading={`TALA ${(country) ? country : info?.main_country} powered by ${info?.company_name}`}
//             />
//             : 'TALA Management'
//           }
//         </div>
//         <br />
//         <p style={{ textAlign: "justify" }}>
//           {country && branchId
//             && Object.keys(bInfo).length > 0
//             && Object.keys(bInfo?.data)?.length > 0
//             ?
//             bInfo?.data?.headline
//             : info?.description}
//         </p>
//       </div>
//     </div>
//   )
// }

// export default CompanyDescription



import React from 'react';
import "assets/css/CompanyProfile/CompanyProfile.css";
import BoldHeading from 'components/BoldHeading/BoldHeading';

function CompanyDescription({ info, bInfo, country, branchId }) {
    const companyName = info?.company_name.toLowerCase();
    console.log(info?.company_name);

    return (
        <div className="col-xl-12 col-lg-8 col-md-12 mt-md-0 mt-4">
            <div className="profile-info">
                <div className="widget-header">
                    {companyName.includes("expedite obc") || companyName.includes("engine logistics") ? (
                        <>
                            <BoldHeading
                                Boldheading={info?.company_name}
                            />
                            <br />
                        </>
                    ) : (
                        <>
                            {companyName === "tala management" ? (
                                <>
                                    <BoldHeading
                                        Boldheading={info?.company_name}
                                    />
                                    <br />
                                </>
                            ) : (
                                // Display other companies accordingly
                                <>
                                    {companyName !== "expedite obc - strategic partner" && companyName !== "engine logistics services & solutions e.l.s" ? (
                                        <BoldHeading
                                            //Boldheading={`SR7 ${(country) ? country : info?.main_country} powered by ${info?.company_name}`}
                                            Boldheading={info?.company_name}
                                        />
                                    ) : null}
                                    <br />
                                </>
                            )}
                        </>
                    )}
                </div>                
                <p style={{ textAlign: "justify" }}>
                    {country && branchId
                        && Object.keys(bInfo).length > 0
                        && Object.keys(bInfo?.data)?.length > 0
                        ? bInfo?.data?.headline
                        : info?.description}
                </p>
            </div>
        </div>
    );
}

export default CompanyDescription;