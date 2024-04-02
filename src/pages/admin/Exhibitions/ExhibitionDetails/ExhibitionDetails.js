import React, { useState, useEffect } from 'react'
import "assets/css/Exhibitions/Exhibitions.css"
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTeamMembers,
  getExhibition,
} from "redux/Actions/EventExhibition";
import AddEvent from './AddEvent';
import Exhibition from './Exhibition';
import EventBanner from "../ExhibitionTable/EventBanner"
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { FiInbox } from "react-icons/fi"
import { ToastContainer, toast } from 'react-toastify';
import { setInitialState } from "redux/Reducers/EventExhibitionSlice";
import { Link } from "react-router-dom";

const ExhibitionDetails = () => {
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  useEffect(() => {
    const data = {};
    data.event = 1;
    if (year) {
      data.year = year
    };
    if (month) { data.month = month }
    dispatch(getExhibition(data));
  }, [month]);

  const onChange = (date, dateString) => {
    if (dateString !== '') {
      setMonth(moment(dateString).format('MM'));
      setYear(moment(dateString).format('YYYY'));
    } else {
      setMonth(false);
    }
  };
  const { isSuccess, isError } = useSelector(state => state.exhibition);
  useEffect(() => {
    if (isSuccess) {
      if (Object.keys(isSuccess).length > 0
        && typeof isSuccess.msg !== 'undefined') {
        toast.success(`${isSuccess.msg}`, {
          toastId: 'success',
          autoClose: 1000
        })
      }
      const data = {};
      data.event = 1;
      dispatch(setInitialState(false));
      dispatch(getExhibition(data));
    }
    if (isError) {
      if (typeof isError !== 'undefined'
        && Object.keys(isError)?.length > 0
        && typeof isError?.error !== 'undefined'
        && Object.keys(isError.error)?.length > 0
        && typeof isError?.error?.exhibitions !== 'undefined'
        && isError?.error?.exhibitions?.length > 0) {
        toast.error(`${isError?.error?.exhibitions[0]}`, {
          toastId: 'error',
          autoClose: 1000
        })
      }
      dispatch(setInitialState(false));
    }
  }, [isSuccess, isError]);


  const dispatch = useDispatch();
  const {
    teamMember,
    exhibitionDetails,
  } = useSelector(state => state.exhibition);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getTeamMembers());
  }, []);

  const [isTrash, setIsTrash] = useState(true)
  const exhbitionHandle = (event) => {
    if(exhibitionDetails.allTrash == 1)
    {
      setIsTrash(false);
    }
    else
    {
      exhibitionDetails.data.map((data) => {
        const isTrashed = data.is_trash === 1
        setIsTrash(isTrashed)
      })
    }
    setActive(event.target.id);
  }
  const exhbitionUpcomingHandle = (event) => {
    if(exhibitionDetails.allTrash == 1)
    {
      setIsTrash(true);
    }
    else
    {
      exhibitionDetails.data.map((data) => {
        const isTrashed = data.is_trash === 0
        setIsTrash(isTrashed)
      })
    }
    setActive(event.target.id);
  }

  const [active, setActive] = useState("1");

  return (
    <div className="layout-px-spacing">
      <EventBanner />
      <ToastContainer />
      <div className="row layout-spacing layout-top-spacing" id="cancel-row">
        <div className="col-lg-12">
          <div className="widget-content searchable-container grid">
            <div className="card-box">
              <div className="row">
                <div className="col-xl-12 col-lg-12 align-self-center d-flex flex-md-row flex-column w-100">
                  <div className='col-12 col-md-3 mb-3 mb-md-0 mb-xl-0 mb-lg-0 d-flex justify-content-center justify-content-md-start justify-content-xl-start justify-content-lg-start'>
                    <Space direction="vertical">
                      <DatePicker onChange={onChange} className='datepicker' picker="month" />
                    </Space>
                  </div>
                  <div className='col-12 col-md-9 d-flex flex-md-row flex-column justify-content-center gap-3'>
                    <div className='col-12 col-md-2 col-xl-2 col-lg-2 d-flex justify-content-center mb-3 mb-md-0'>
                      <button type="button" style={{ fontSize: "13px" }} onClick={() => setShow(true)}
                        className='col-12 btn btn btn-outline-dark contactUs' href="https://youtube.com/c/shortcode"
                      >
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        <div className=''> Add Event</div>
                      </button>
                    </div>
                    <div className='col-12 col-md-3 col-xl-3 col-lg-3 d-flex justify-content-center mb-3 mb-md-0'>
                      <button
                        key={1}
                        id={"1"}
                        type="button"
                        style={{ fontSize: "13px" }}
                        className={active === "1" ? "col-12 btn btnactive" : "col-12 btn btn-outline-dark"}
                        onClick={exhbitionUpcomingHandle}
                      >
                        Upcoming Events
                      </button>
                    </div>
                    <Link to="/exhibitions/attendees" className='col-12 col-md-3 col-xl-3 col-lg-3 d-flex justify-content-center mb-3 mb-md-0'>
                      <button type="button"
                        key={3}
                        id={"3"}
                        className={active === "3" ? "col-12 btn btnactive" : "col-12 btn btn-outline-dark"}
                        style={{ fontSize: "13px" }}
                      >
                        Event Attendees

                      </button>
                    </Link>
                    <div className='col-12 col-md-3 col-xl-3 col-lg-3 d-flex justify-content-center mb-3 mb-md-0'>
                      <button type="button"
                        key={2}
                        id={"2"}
                        className={active === "2" ? "col-12 btn btnactive" : "col-12 btn btn-outline-dark"}
                        style={{ fontSize: "13px" }}
                        onClick={exhbitionHandle}
                      >
                        View Past Events
                      </button>
                    </div>

                    {/* <div className="col-12 col-md-3 col-xl-3 col-lg-3 d-flex justify-content-center mb-3 mb-md-0">
                      <button type="button" style={{ fontSize: "13px" }} onClick={() => setShow(true)}
                        className='btn btn btn-outline-dark contactUs' href="https://youtube.com/c/shortcode"
                      >
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        <div className=''> Add Event</div>
                      </button>
                    </div>
                    <div className="col-12 col-md-3 col-xl-3 col-lg-3 d-flex justify-content-center mb-3 mb-md-0">
                      <button
                        key={1}
                        id={"1"}
                        type="button"
                        style={{ fontSize: "13px" }}
                        className={active === "1" ? "btn btnactive" : "btn btn-outline-dark"}
                        onClick={exhbitionUpcomingHandle}
                      >
                        Upcoming Events
                      </button>
                    </div>
                    <Link to="/exhibitions/attendees" className="col-12 col-md-3 col-xl-3 col-lg-3 d-flex justify-content-center mb-3 mb-md-0">                   
                        <button type="button"
                          key={3}
                          id={"3"}
                          className={active === "3" ? "btn btnactive" : "btn btn-outline-dark"}
                          style={{ fontSize: "13px" }}
                        >
                          Event Attendees

                        </button>                     
                    </Link>
                    <div className="col-12 col-md-3 col-xl-3 col-lg-3 d-flex justify-content-center mb-3 mb-md-0">
                      <button type="button"
                        key={2}
                        id={"2"}
                        className={active === "2" ? "btn btnactive" : "btn btn-outline-dark"}
                        style={{ fontSize: "13px" }}
                        onClick={exhbitionHandle}
                      >
                        View Past Events
                      </button>
                    </div> */}
                  </div>

                  <AddEvent show={show} setShow={setShow} />
                </div>
              </div>
            </div>
            {isTrash === false ?
              <div className="col-xl-12 col-md-12 col-sm-12 col-12 mt-4">
                <h5 style={{ textAlign: "center", color: "white", backgroundColor: "#FF0091", padding: "15px" }}>
                  Past Events
                </h5>
              </div>
              :
              <div className="col-xl-12 col-md-12 col-sm-12 col-12 mt-4">
                <h5 style={{ textAlign: "center", color: "white", backgroundColor: "#FF0091", padding: "15px" }}>
                  Upcoming Events
                </h5>
              </div>
            }
            {Object.keys(exhibitionDetails).length > 0
              && exhibitionDetails.data.length > 0 && exhibitionDetails.allTrash == 0 && isTrash 
              ? exhibitionDetails.data.map((item, index) => {
                return (
                  <Exhibition
                    key={`ex${index}`}
                    item={item}
                    teamMember={teamMember}
                    isTrash={isTrash}
                  />
                )
              }) : Object.keys(exhibitionDetails).length > 0
              && exhibitionDetails.data.length > 0 && exhibitionDetails.allTrash == 1  && !isTrash || exhibitionDetails.allTrash == 0  && !isTrash
              ? exhibitionDetails.data.map((item, index) => {
                return (
                  <Exhibition
                    key={`ex${index}`}
                    item={item}
                    teamMember={teamMember}
                    isTrash={isTrash}
                  />
                )
              }) :
              <div className="card-box col-lg-12" style={{ marginTop: "25px" }}>
                <div className='d-flex flex-column justify-content-center dataNotfound'>
                  <div className='d-flex justify-content-center'>
                    <FiInbox style={{ fontSize: "30px", color: "#666666" }} />
                  </div>
                  <div className='d-flex justify-content-center' style={{ color: "#666666" }}>
                    Data not found...
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExhibitionDetails