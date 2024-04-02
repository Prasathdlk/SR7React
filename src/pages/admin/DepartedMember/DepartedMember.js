import React, { useEffect } from 'react'
import Cards from 'components/Cards/Cards'
import DepartedTable from "./DepartedTable/DepartedTable"
import { getLicensesDeparted } from "redux/Actions/Member";
import { useDispatch, useSelector } from 'react-redux';

const DepartedMember = () => {
  const dispatch = useDispatch();
  const { departedList } = useSelector(state => state.member);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  useEffect(() => {
    dispatch(getLicensesDeparted({
      status: "departed"
    }));
  }, [])
  const para = <>
    Below is a list of members who have left SR7 Networks. Please review this updated list carefully before initiating any unpaid invoice claims or addressing other unresolved issues. <br />Please note that our resolution centre will not address unpaid claims for departed members after their departure date. <br />To ensure efficient handling of your claims, it is important to promptly notify us of any outstanding invoices related to the listed departed. 
  </>

  return (
    <div className="layout-px-spacing">
      <div className="row layout-spacing pt-4">
        <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
          <Cards
            heading="Departed Members"
            Para={para}
          />
        </div>
        <DepartedTable
          licensesList={departedList} />
      </div>
     
    </div>
  )
}

export default DepartedMember