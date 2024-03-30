import React, { useEffect,useState } from 'react'
import "assets/css/MemberExpiry/MemberExpiry.css"
import InsideMemberExpiry from "./InsideMemberExpiry/InsideMemberExpiry"
import { getLicensesExpire } from "redux/Actions/Member";
import { useDispatch, useSelector } from 'react-redux';

const MemberExpiry = () => {
  const [SC, setSC] = useState(false);
  const dispatch = useDispatch();
  const { expireList } = useSelector(state => state.member);
  useEffect(() => {
    window.scrollTo(0, 0);
  },[])
  useEffect(() => {
    dispatch(getLicensesExpire({
      status: "expired"
    }));
  }, [])
  useEffect(() => {
    if (SC || SC === '') {
      dispatch(getLicensesExpire({ status: SC }));
    }
  }, [SC])

  console.log("getLicensesExpire",getLicensesExpire);

  console.log("SC===========>",SC);
  return (
    <div className="layout-px-spacing">
      <div className="row layout-spacing pt-4">
        <InsideMemberExpiry
          licensesList={expireList}
          setSC={setSC}
          />
      </div>
    </div>
  )
}

export default MemberExpiry