import React, { useState, useRef, useEffect } from 'react'
import "assets/css/Exhibitions/Exhibitions.css"
import { Table } from 'antd';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { getExhibitionList, getExhibition } from "redux/Actions/EventExhibition";
import { setLogout } from "redux/Reducers/LoggedSlice";
import { FaPaperPlane } from "react-icons/fa";
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getTeamMembers,
  sendExhibitionChat,
  getExhibitionChat
} from "redux/Actions/EventExhibition";
import Exhibition from "../ExhibitionDetails/Exhibition"
import { Select } from 'antd';
import { companyList } from "redux/Actions/Company";
import { loctaionsCountryList } from "redux/Actions/Member";
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';
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
  MDBCardFooter,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { FaMinus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const ExhibitionTable = ({ setShowDetails }) => {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  const {
    exhibitionDetails,
    teamMember,
    isSuccess,
    exhibitionChat,
    isSend
  } = useSelector(state => state.exhibition);
  const { loggedinUserId } = useSelector(state => state.loggedin);
  console.log('loggedinUserId', loggedinUserId);
  const [eventHead, setEventHead] = useState(false);
  const SV = [];

  useEffect(() => {
    if (typeof id !== 'undefined') {
      const data = exhibitionDetails.data.find((item) => item.id == id);
      dispatch(getTeamMembers());
      const ye = data?.year.split('/');
      setEventHead(data);
      if (isSuccess) {
        if (Object.keys(isSuccess).length > 0
          && typeof isSuccess.msg !== 'undefined') {
          toast.success(`${isSuccess.msg}`, {
            toastId: 'success',
            autoClose: 1000
          })
        }
        dispatch(setInitialState(false));
        dispatch(getExhibition({ year: ye[2] }))
      }
      dispatch(getExhibitionList({ event_id: id }))
    } else {
      dispatch(getExhibitionList({}));
    }
  }, [id, isSuccess, exhibitionDetails])

  const {
    isLoading,
    tokenExp,
    exhibitionList
  } = useSelector(state => state.exhibition);

  useEffect(() => {
    if (tokenExp && Object.keys(tokenExp).length > 0
      && tokenExp.error === 'Invalid token') {
      dispatch(setLogout());
      navigate("/");
    }
  }, [tokenExp]);
  const [exhibition, setExhibition] = useState([]);
  useEffect(() => {
    let tex = [];
    if (Object.keys(exhibitionList)?.length > 0
      && Object.keys(exhibitionList?.data)?.length > 0) {
      exhibitionList?.data?.map((item, index) => {
        const SV = []; // Declare SV here

        if (item?.connect_width.length > 0) {
          item?.connect_width.map(it => {
           SV.push({
  value: it.id,
  label: (
    <div>
      {`${it.member_name}`}
      {it.unread_messages > 0 && (
        <span className="unread-messages">{it.unread_messages}</span>
      )}
    </div>
  ),
  allocatedId: item.allocated_id
});         });
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
              {item.total_unread_messages > 0 &&
                <span className="unread-messages">{item.total_unread_messages}</span>
              }
              <Select
                allowClear
                showSearch
                style={{ width: "100%", cursor: "pointer" }}
                placeholder={"Start Chat"}
                options={SV}
                onChange={(value, data) => {
                  handleOnChangeChat(value, data);
                }}
                notFoundContent="Select member"
              />
            </>
            : '-'
        })
      });
    }
    setExhibition(tex);
  }, [exhibitionList]);

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

  useEffect(() => {
    console.log('allocatedData', allocatedData)
    setInterval(() => {
      if (typeof allocatedData?.allocatedId !== 'undefined') {
        dispatch(getExhibitionChat({
          event_allocated_id: allocatedData?.allocatedId
        }));
      }
      dispatch(getExhibitionList({}));
    }, 4000);
  }, []);


  const [unreadMessages, setUnreadMessages] = useState({});

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
  // console.log('allocatedData', allocatedData);
  // console.log('exhibitionChat', exhibitionChat);
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
    // console.log('data', data);
    // console.log('value', value);
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
    dispatch(getExhibitionList({}));
    setAllocatedData(false);
    setShow(false);
    setChatMsg([]);
  }

  console.log('chatMsg', chatMsg);

  return (
    <>
      <div className="col-xl-12 col-lg-12 align-self-center w-100 mb-3">
        <Link onClick={() => setShowDetails(0)}>
          <div className="btn btn-sm readmorebtn text-white p-1">
            <i className="las la-arrow-left">
              <BsArrowLeftShort />
            </i>
            Back
          </div>
        </Link>
      </div>
      {typeof id !== 'undefined' &&
        <>
          <Exhibition
            key={`ex54`}
            item={eventHead}
            teamMember={teamMember}
          />
        </>
      }
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
          <div className='w-100' style={{ maxHeight: "300px", overflowY: "auto", whiteSpace: "pre-wrap" }}>
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
        <Modal show={show} onHide={() => onClose()}>
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
                    style={{
                      maxHeight: "300px",
                      overflowY: "auto",
                      whiteSpace: "pre-wrap",
                      scrollbarWidth: "thin",
                    }}
                    ref={chatContainerRef} // Assign the ref to the container
                  >
                    {chatMsg.length > 0 &&
                      chatMsg.map((item, index) => (
                        <div key={`c${index}`}>
                          <div
                            className={`d-flex justify-content-${item.type === "sender" ? "end" : "start"
                              }`}
                          >
                            <p className="small mb-1 text-muted">{item.date}</p>
                          </div>
                          <div
                            className={`d-flex flex-row justify-content-${item.type === "sender" ? "end" : "start"
                              }`}
                          >
                            <div>
                              <p
                                className="small p-2 ms-3 mb-3 rounded-3"
                                style={{
                                  backgroundColor: `${item.type === "sender" ? "#fcffd9" : "#e2f3ff"
                                    }`,
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {item.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </MDBCardBody>
                  <MDBCardFooter className="text-muted ">
                    {/* <MDBInputGroup className="mb-0"> */}
                    <form className="login-form">
                      <div className='col-12 d-flex flex-row gap-4'>
                        <div className="col-10 input-box" >
                          <div className="d-flex">
                            <textarea
                              rows={1}
                              className="form-control"
                              placeholder="Type message"
                              type="text"
                              aria-multiline="true"
                              role="textbox"
                              {...register("type_meg", {
                                onChange: (e) => {
                                  setMsg(e.target.value);
                                },
                                required: "Message should not be empty",
                              })}
                              onKeyDown={handleKeyDown} // Handle "Enter" key press
                              style={{ whiteSpace: "normal", lineHeight: "1.2" }}
                              value={msg}
                            />

                          </div>
                          <div>
                            {errors.type_meg &&
                              <span className="error d-block">
                                {errors.type_meg.message}
                              </span>}
                          </div>
                        </div>
                        <div className="col-1 d-flex justify-content-end">
                          <button
                            type="button" // Change the type to "button" to prevent form submission
                            className="btn bg-gradient-primary text-white "
                            style={{ borderRadius: "80px" }}
                            onClick={handleSubmit(onSubmit)} // Call onSubmit on button click
                          >
                            <FaPaperPlane />
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* </MDBInputGroup> */}
                  </MDBCardFooter>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default ExhibitionTable