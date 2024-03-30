import React, { useState, useEffect, useRef } from 'react'
import "assets/css/Exhibitions/Exhibitions.css"
import { Table } from 'antd';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { getExhibitionList } from "redux/Actions/EventExhibition";
import { useParams, Link } from 'react-router-dom';
import {
  sendExhibitionChat,
  getExhibitionChat
} from "redux/Actions/EventExhibition";
import EventBanner from "./EventBanner"
import { Select } from 'antd';
import { companyList } from "redux/Actions/Company";
import { loctaionsCountryList } from "redux/Actions/Member";
import { RotatingLines } from 'react-loader-spinner';
import { setInitialState } from "redux/Reducers/EventExhibitionSlice";
import { markAsReadConnctMssage } from "redux/Actions/EventExhibition";
import { BsArrowLeftShort } from "react-icons/bs";
import Modal from 'react-bootstrap/Modal';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { IoMdClose } from "react-icons/io";

const EventAttendees = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const [show, setShow] = useState(false);
  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      key: 'company_name'
    },
    Table.EXPAND_COLUMN,
    {
      title: 'Members Name',
      dataIndex: 'member_name',
      key: 'member_name'
    },
    {
      title: 'Team Member Name',
      dataIndex: 'team_members',
      key: 'team_members'
    },
    {
      title: 'Other Member Name',
      dataIndex: 'other_team_members',
      key: 'other_team_members'
    },
    {
      title: 'Location',
      dataIndex: 'country',
      key: 'country'
    },
    {
      title: 'Event Name',
      dataIndex: 'exhibition_name',
      key: 'exhibition_name',
    },
    {
      title: 'Event Month',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Booth No',
      dataIndex: 'booth_number',
      key: 'booth_number'
    },
    {
      title: 'Connect',
      dataIndex: 'connecticon',
      key: 'connect'
    },

  ];

  const dispatch = useDispatch();
  let { id } = useParams();
  const {
    exhibitionDetails,
    isSuccess,
    exhibitionChat,
    isSend
  } = useSelector(state => state.exhibition);
  const { loggedinUserId } = useSelector(state => state.loggedin);

  useEffect(() => {
    dispatch(getExhibitionList({}));
  }, [id, isSuccess, exhibitionDetails])

  const {
    isLoading,
    exhibitionList
  } = useSelector(state => state.exhibition);
  const [exhibition, setExhibition] = useState([]);

  useEffect(() => {
    let tex = [];
    if (Object.keys(exhibitionList)?.length > 0
      && Object.keys(exhibitionList?.data)?.length > 0) {
      exhibitionList?.data?.map((item, index) => {
        let SV = [];
        if (item?.connect_width.length > 0) {
          item?.connect_width.map(it => {
            SV.push({
              value: it.id,
              label: (<div className="d-flex flex-row gap-1" style={{ fontSize: "12px" }}>
                {`${it.member_name}`}
                {it.unread_messages !== 0 ? (
                  <div className='col-12 d-flex justify-content-start'>
                    < div className="unread-messages-dropdown"> {it.unread_messages}</div>
                  </div>
                ) : ''
                }
              </div >),
              allocatedId: item.allocated_id
            });
          })
        }

        tex.push({
          key: index,
          allocated_id: item.allocated_id ? item.allocated_id : '-',
          arrival: item.arrival ? item.arrival : '-',
          attended_at: item.attended_at ? item.attended_at : '-',
          attending: item.attending ? item.attending : '-',
          booth_number: item.booth_number ? item.booth_number : '-',
          company_exhibiting: item.company_exhibiting ? item.company_exhibiting : '-',
          company_id: item.company_id ? item.company_id : '-',
          company_name: item.company_name ? item.company_name : '-',
          connect: item.connect ? item.connect : '-',
          country: item.country ? item.country : '-',
          departure: item.departure ? item.departure : '-',
          email: item?.member_email ? item?.member_email : '-',
          event_date: item?.event_date ? item?.event_date : '-',
          exhibition_name: item?.exhibition_name ? item?.exhibition_name : '-',
          id: item.member_id ? item.member_id : '-',
          is_canceled: item.is_canceled ? item.is_canceled : '-',
          member_email: item.member_email ? item.member_email : '-',
          member_id: item.member_id ? item.member_id : '-',
          member_name: item.member_name ? item.member_name : '-',
          month: item.month ? item.month : '-',
          other_team_members: item.other_team_members ? item.other_team_members : '-',
          team_members: item.team_members ? item.team_members : '-',
          connecticon: item?.connect_width.length > 0 ?
            <>
              {item.total_unread_messages > 0 && !show && 
                <div className='col-12 d-flex justify-content-end'>
                  <div className="unread-messages">{item.total_unread_messages}</div>
                </div>
              }
              <Select
                // allowClear
                // showSearch
                value={{
                  label: "Start Chat",
                }}
                style={{ width: "100%", cursor: "pointer", fontSize: "13px" }}
                placeholder={"Start Chat"}
                options={SV}
                onChange={(value, data) => {
                  handleOnChangeChat(value, data);
                }}
                notFoundContent="Select member"
                className='startchat'
              />
            </>
            : '-'
        })
      });
    }
    setExhibition(tex);
  }, [exhibitionList]);
  // console.log('exhibition',exhibition);
  const { companyListData } = useSelector(state => state.company);
  const [company, setCompany] = useState([]);
  useEffect(() => {
    let company = [];
    if (Object.keys(companyListData).length > 0
      && companyListData.data.length) {
      companyListData.data.map(item => {
        company.push({
          value: item.company_name,
          label: item.company_name
        })
      })
    }
    setCompany(company);
  }, [companyListData]);

  const { countryList } = useSelector(state => state.member);
  const [country, setCountry] = useState([]);
  useEffect(() => {
    let country = [];
    if (Object.keys(countryList).length > 0
      && countryList.data.length) {
      countryList.data.map(item => {
        country.push({
          value: item,
          label: item
        })
      })
    }
    setCountry(country);
  }, [countryList]);

  useEffect(() => {
    dispatch(companyList());
    dispatch(loctaionsCountryList());
  }, []);


  const [chatMsg, setChatMsg] = useState([]);
  const [msg, setMsg] = useState('');
  const [allocatedData, setAllocatedData] = useState(false);

  const onSubmit = (data) => {
    const exc = {
      receiver_id: allocatedData.value,
      event_allocated_id: allocatedData.allocatedId,
      message: data.type_meg
    };
    dispatch(sendExhibitionChat(exc));
  };

  useEffect(() => {
    setInterval(() => {
      if (typeof allocatedData?.allocatedId !== 'undefined') {
        dispatch(getExhibitionChat({
          event_allocated_id: allocatedData?.allocatedId
        }));
      }
      dispatch(getExhibitionList({}));
    }, 4000);
  }, [allocatedData]);


  const [SCD, setSCD] = useState({});
  const handleOnChange = (value, name) => {
    setSCD({ [name]: value })
    let finaldata = {};
    if (typeof id !== 'undefined') {
      finaldata.event_id = id;
    }
    if (typeof value !== 'undefined') {
      finaldata[name] = value;
    }
    dispatch(getExhibitionList(finaldata));
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleKeyDown = (e) => {
    // Handle "Enter" key press
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line in textarea
      handleSubmit(onSubmit)();
    } else if (e.key === 'Enter' && e.shiftKey) {
      // Insert newline character in the textarea
      setMsg((prevMsg) => prevMsg);
    }
  };


  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMsg]);

  useEffect(() => {
    let msg = [];
    if (Object.keys(exhibitionChat).length > 0
      && typeof exhibitionChat.data !== 'undefined'
      && Object.keys(exhibitionChat.data).length > 0
      && typeof exhibitionChat.data.messages !== 'undefined'
      && exhibitionChat.data.messages.length > 0
    ) {
      exhibitionChat.data.messages.map(item => {
        let type = "";
        if (item.sender_id === loggedinUserId
          && item.receiver_id === parseInt(allocatedData.value)) {
          type = 'sender';
        }
        else if (item.sender_id === parseInt(allocatedData.value)
          && (item.receiver_id === parseInt(allocatedData.value)
            || item.receiver_id === loggedinUserId)) {
          type = 'receive';
        }
        if (type !== '') {
          msg.push({
            message: item.message,
            date: item?.send_on,
            type: type
          });
        }
      })
    }
    setChatMsg(msg);
  }, [exhibitionChat])


  useEffect(() => {
    if (isSend) {
      setMsg('');
      dispatch(getExhibitionChat({
        event_allocated_id: allocatedData.allocatedId
      }));
      dispatch(setInitialState());
    }
  }, [isSend])

  const handleOnChangeChat = (id, data) => {
    if (typeof id !== 'undefined') {
      dispatch(markAsReadConnctMssage({ sender_id: data.value }));
      setAllocatedData(data);
      setShow(true);
      dispatch(getExhibitionChat({
        event_allocated_id: data.allocatedId
      }));
    }
  }

  const onClose = () => {
    dispatch(markAsReadConnctMssage({ sender_id: allocatedData.value }));
    dispatch(getExhibitionList({}));
    setAllocatedData(false);
    setShow(false);
    setChatMsg([]);
  }

  return (
    <>
      <EventBanner />
      <div className="col-xl-12 col-lg-12 align-self-center w-100 mb-3">
        <Link to="/exhibitions">
          <div className="btn btn-sm readmorebtn text-white p-1">
            <i className="las la-arrow-left">
              <BsArrowLeftShort />
            </i>
            Back
          </div>
        </Link>
      </div>

      <div className="layout-pxx-spacing col-xl-12 col-lg-4 col-md-12 col-12 col-sm-12 mb-4">
        <div className="statbox widget box box-shadow">
          <div className="widget-header">
            <div className="col-12 d-flex flex-md-row flex-column mb-5 ">
              <div className="col-12 col-md-4">
                <h4 className='annualTitles'>Exhibition</h4><br />
              </div>
              <div className='col-12 d-flex flex-md-row flex-column col-md-8 justify-content-md-end justify-content-start gap-3'>
                <div className='col-12 col-md-5 d-flex justify-content-end  contact-options'>
                  <Select
                    value={SCD?.company}
                    allowClear
                    showSearch
                    style={{ width: "100%", marginTop: "10px" }}
                    placeholder={'Select Company Name'}
                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                    optionFilterProp={'children'}
                    options={company}
                    onChange={(value) => {
                      handleOnChange(value, 'company');
                    }}
                  />
                </div>
                <div className='col-12 col-md-5 d-flex justify-content-end  contact-options'>
                  <Select
                    value={SCD?.country}
                    allowClear
                    showSearch
                    style={{ width: "100%", marginTop: "10px" }}
                    placeholder={'Select Country'}
                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                    optionFilterProp={'children'}
                    options={country}
                    onChange={(value) => {
                      handleOnChange(value, 'country');
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='w-100'>
            {!isLoading ?
              <Table
                scroll={{
                  x: 600,
                }}
                columns={columns}
                expandable={{
                  expandedRowRender: (record) => (
                    <div
                      style={{
                        margin: 0,
                      }}
                    >
                      Arrival Date - {record.arrival}<br />
                      Departure Date - {record.departure}
                    </div>
                  ),
                }}
                dataSource={exhibition}
                pagination={{
                  defaultPageSize: 20,
                  showSizeChanger: true,
                  pageSizeOptions: ['20', '50', '100']
                }}
              />
              :
              <div className="col-xl-12 col-lg-12" style={{ margin: "15% 40%" }}>
                <RotatingLines
                  strokeColor="#FF6700"
                  strokeWidth="5"
                  animationDuration="1.00"
                  width="70"
                  visible={true}
                />
              </div>
            }
          </div>
        </div>
        <Modal show={show} onHide={() => setShow(false)} >
          <Modal.Body>
            <MDBRow className="d-flex justify-content-center">
              <MDBCol md="12" lg="12" xl="12">
                <MDBCard>
                  <MDBCardHeader
                    className="d-flex justify-content-between align-items-center p-3"
                    style={{ borderTop: "4px solid #FF6700" }}
                  >
                    <h5 className="mb-0">Chat messages</h5>
                    <div className="d-flex flex-row align-items-center">
                      <IoMdClose
                        className="me-3 text-muted"
                        onClick={() => onClose()}
                        style={{ fontSize: "18px", cursor: "pointer" }}
                      />
                    </div>
                  </MDBCardHeader>

                  <MDBCardBody
                    // style={{
                    //   maxHeight: "500px",
                    //   overflowY: "scroll",
                    //   scrollbarWidth: "thin",
                    // }}
                    className='chatBody'
                    ref={chatContainerRef}
                  >
                    {chatMsg.length > 0 &&
                      chatMsg.map((item, index) => {
                        return (<div key={`c${index}`}>
                          {/* <div className={`d-flex flex-row justify-content-${item.type === 'sender' ? "end" : "start"}`}>
                            <div>
                              <p className="small p-2 ms-3 mb-3 rounded-3"
                                style={{ backgroundColor: `${item.type === 'sender' ? "#fcffd9" : "#e2f3ff"}` }} >
                                {item.message}
                              </p>
                            </div>
                          </div> */}
                          <div className={`msg ${item.type === 'sender' ? "right-msg" : "left-msg"}`}>
                            <div className="msg-bubble">
                              <div className="msg-text">
                                {item.message}
                              </div>
                            </div>
                          </div>
                          <div className={`d-flex justify-content-${item.type === 'sender' ? "end" : "start"}`}>
                            <p className="small time-text-muted">{item.date}</p>
                          </div>
                        </div>
                        )
                      })}

                  </MDBCardBody>
                  <div className='card-footer p-3'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="d-flex flex-column">
                        <div className='msger-inputarea  d-flex flex-row'>
                          <textarea type="text" className="col-12 msger-input "
                            rows={1}
                            onKeyDown={handleKeyDown}
                            value={msg}
                            placeholder="Enter your message..."
                            {...register("type_meg", {
                              onChange: (e) => {
                                setMsg(e.target.value);
                              },
                              required: "Message should not be empty",
                            })}
                          />
                          <button type="submit" className="msger-send-btn" onClick={handleSubmit(onSubmit)}>Send</button>
                        </div>
                        <div>
                          {errors.type_meg &&
                            <span className="error d-block px-2">
                              {errors.type_meg.message}
                            </span>}
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* </MDBCardFooter> */}
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default EventAttendees