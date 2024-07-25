import React, { useState, useEffect } from 'react'
import "assets/css/MyAccount.css"
import "assets/css/UploadFile.css"
import Modal from 'react-bootstrap/Modal';
import { Tabs } from 'antd';
import profileUpload from "assets/img/noimg.jpg"
import MySocialNetwork from './MySocialNetwork';
import ChangePassword from './ChangePassword';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setIsUpdate, setNetwork } from "redux/Reducers/MemberSlice";
import { updateProfile, memberProfile } from "redux/Actions/Member";
import { getAirportData } from "redux/Actions/Member";
import { companyProfile } from "redux/Actions/Company";
import { ToastContainer, toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Select from 'react-select'
import Search from 'react-select'
import CompanyInformation from './CompanyInformation';
import { getBranches } from "redux/Actions/Company";
const { TabPane } = Tabs;

const ImgUpload = ({
  onChange,
  src
}) =>
  <div className=''>
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload fas" >
        <img htmlFor="photo-upload" src={src} />
      </div>
      <input id="photo-upload" type="file" className='inputFields' onChange={onChange} />
    </label>
  </div>

const MyAccount = ({ show, setShow }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const { memberProfileData, isUpdate, network, airportData } = useSelector(state => state.member);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const [file, setFile] = useState(false);
  const [countryCode, setCountryCode] = useState('')
  const [phoneCountry, setPhoneCountry] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneError, setphoneError] = useState(false)
  const { cBranch } = useSelector(state => state.company);
  // const { companyId } = useSelector(state => state.loggedin);
  // console.log('airportData',airportData)
  useEffect(() => {
    dispatch(getAirportData());
    if (Object.keys(cBranch).length === 0) {
      dispatch(getBranches({
        company_id: memberProfileData.data?.company_id
      }));
    }
  }, [])
  useEffect(() => {
    if (isUpdate) {
      if (network) {
        reset();
      }
      if (Object.keys(isUpdate).length > 0
        && typeof isUpdate.msg !== 'undefined') {
        toast.success(`${isUpdate.msg}`, {
          toastId: 'success',
          autoClose: 1000
        })
      }
      setTimeout(() => {
        dispatch(companyProfile(memberProfileData?.data?.company_id));
        dispatch(memberProfile());
        dispatch(setIsUpdate(false));
      }, 1000);
    }
  }, [isUpdate])

  const [DB, setDB] = useState('');
  const [DA, setDA] = useState('');

  useEffect(() => {
    if (Object.keys(memberProfileData).length > 0
      && typeof memberProfileData.data !== 'undefined'
      && Object.keys(memberProfileData.data).length > 0) {
      setValue('first_name', `${memberProfileData.data?.first_name}`);
      setValue('last_name', `${memberProfileData.data?.last_name}`);
      setValue('phone', `${memberProfileData.data?.phone}`);
      setValue('email', `${memberProfileData.data?.email}`);
      setValue('designation', `${memberProfileData.data?.designation}`);
      setImagePreviewUrl(memberProfileData.data?.profile_logo_url);
      setPhoneCountry(memberProfileData.data?.code);
      dispatch(getBranches({
        company_id: memberProfileData.data?.company_id
      }));
      setDB({
        label: memberProfileData.data?.branch_name,
        value: memberProfileData.data?.branch_id
      });
      setDA({
        label: memberProfileData.data?.code,
        value: ""
      });
    }
  }, [memberProfileData])
  // console.log('memberProfileData', memberProfileData);
  const [bList, setBList] = useState([]);
  useEffect(() => {
    let list = [];
    if (Object.keys(cBranch).length > 0
      && typeof cBranch.data !== 'undefined'
      && Object.keys(cBranch.data).length > 0
      && typeof cBranch?.data?.branches !== 'undefined'
      && cBranch?.data?.branches.length > 0
    ) {
      cBranch?.data?.branches.map(item => {
        list.push({
          label: item.branch_name,
          value: item.id
        })
      })
    }
    setBList(list);
  }, [cBranch])

  const [airPort, setAirPort] = useState([]);
  useEffect(() => {
    let at = [];
    if (Object.keys(airportData).length > 0
      && typeof airportData.data !== 'undefined'
      && Object.keys(airportData.data).length > 0
      && airportData?.data?.length > 0
    ) {
      airportData?.data?.map(item => {
        at.push({
          label: item.code,
          value: item.code
        })
      })
    }
    setAirPort(at);
  }, [airportData])

  const onSubmit = async (fdata) => {
    dispatch(setNetwork(false));
    var formdata = new FormData();
    formdata.append("first_name", fdata.first_name);
    formdata.append("last_name", fdata.last_name);
    formdata.append("phone", phoneNumber);
    formdata.append("country_code", countryCode);
    formdata.append("email", fdata.email);
    formdata.append("designation", fdata.designation);
    if (typeof DB.value !== "undefined" && DB.value !== '') {
      formdata.append("branch_id", DB.value);
    }
    if (typeof DA.value !== "undefined" && DA.value !== "") {
      formdata.append("code", DA.value);
    }
    if (file) {
      formdata.append("profile_logo", file);
    }
    if (phoneNumber?.length == 0 || phoneNumber?.length == 1 || phoneNumber?.length == 2 || phoneNumber?.length == 3 || phoneNumber?.length == 4) {
      setphoneError(true);
      return false;
    }
    setphoneError(false);
    dispatch(updateProfile(formdata));
  }
  const photoUpload = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file)
      setImagePreviewUrl(reader.result)
    }
    reader.readAsDataURL(file);
  }
  const uploadButton = (
    <div>
      <LoadingOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const onValueChange = (value, data) => {
    setphoneError(false);
    setPhoneNumber(value)
    setCountryCode(data.countryCode);
  }

  let initialValue = memberProfileData.data?.phone

  return (
    <div>
      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-80w" >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>My Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex flex-row'>
            <div className='col-12'>
              <Tabs type="card">
                <TabPane key="static-1" tab="My General Information">
                  <div>
                    <div className='col-12 d-flex justify-content-center mt-3'>
                      <h4>GENERAL<span style={{ color: "#FF6700" }}> INFORMATION</span>
                      </h4>
                    </div>
                    <div className='col-12 d-flex flex-md-column flex-xl-column flex-lg-column  flex-sm-column  flex-column'>
                      <div className='mt-3 col-md-12 col-12 d-flex flex-column flex-md-row flex-xl-row flex-lg-row justify-content-center gap-5'>
                        <div>
                          <div className='col-12 col-md-12 d-flex justify-content-center justify-content-md-center'>
                            <ImgUpload onChange={photoUpload}
                              src={imagePreviewUrl ? imagePreviewUrl : profileUpload} />
                          </div>
                          <div className="d-flex justify-content-center align-items-center mb-2">Upload Profile</div>
                        </div>
                      </div>
                      <div className='col-12 col-md-9 col-xl-9 col-sm-12 col-lg-9'>
                        <div className="row">
                          <form className="login-form mt-4"
                            onSubmit={handleSubmit(onSubmit)}
                            encType="multipart/form-data"
                            style={{ paddingRight: "30px", marginTop: "20px" }}>

                            <div className="col-md-12 clearfix">
                              <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                                  <label>First Name</label>
                                </div>
                                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                                  <input type="text"
                                    readOnly
                                    className="keyword-input col-12"
                                    {...register("first_name", {
                                      required: "First name should not be empty..",
                                    })} />
                                  {errors.first_name && <span className="col-12 error d-block d-flex justify-content-end">{errors.first_name.message}</span>}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 clearfix">
                              <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                                  <label>Last Name</label>
                                </div>
                                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                                  <input type="text"
                                    readOnly
                                    className="keyword-input col-12"
                                    {...register("last_name", {
                                    })} />
                                  {errors.last_name && <span className="col-12 error d-block d-flex justify-content-end">{errors.last_name.message}</span>}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 clearfix">
                              <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                                  <label>Phone</label>
                                </div>
                                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                                  <PhoneInput
                                    className="col-12"
                                    prefix="+"
                                    countryCodeEditable={false}
                                    country={phoneCountry.toLowerCase()}
                                    inputProps={{
                                      name: 'phone-number',
                                    }}
                                    {...register("phone", {
                                      required: "Phone should not be empty",
                                    })}
                                    onChange={(value, data) => onValueChange(value, data)}
                                    placeholder="Phone number"
                                    value={initialValue}
                                  />
                                  {errors.phone && <span className="col-12 error d-block d-flex justify-content-end">{errors.phone.message}</span>}
                                  {phoneError && <span className="col-12 error d-block d-flex justify-content-end">Phone number should not be empty</span>}
                                </div>
                              </div>
                            </div>

                            <div className="col-md-12 clearfix mt-3">
                              <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                                  <label>Branch</label>
                                </div>
                                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                                  <Select
                                    value={DB}
                                    className='branchSelect'
                                    options={bList}
                                    isSearchable={true}
                                    placeholder="Select Branch"
                                    onChange={(value) => {
                                      setDB(value);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-12 clearfix mt-3">
                              <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                                  <label>Airport Code</label>
                                </div>
                                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                                  <Select
                                    value={DA}
                                    className='branchSelect'
                                    options={airPort}
                                    isSearchable={true}
                                    placeholder="Select Branch"
                                    onChange={(value) => {
                                      setDA(value);
                                    }}
                                    onKeyDown={e => {
                                      dispatch(getAirportData({ code: e.target.value }));
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 clearfix mt-3">
                              <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                                  <label>Designation</label>
                                </div>
                                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                                  <input type="text"
                                    className="keyword-input col-12"
                                    {...register("designation", {
                                      required: "Designation should not be empty",
                                    })} />
                                  {errors.designation &&
                                    <span className="col-12 error d-block d-flex justify-content-end">{errors.designation.message}</span>
                                  }
                                </div>
                              </div>
                            </div>

                            <div className="col-md-12 clearfix">
                              <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                                  <label>Email Address</label>
                                </div>
                                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                                  <input type="text"
                                    className="keyword-input col-12"
                                    readOnly
                                    {...register("email", {
                                      required: "Email should not be empty",
                                    })} />
                                  {errors.email && <span className="col-12 error d-block d-flex justify-content-end">{errors.email.message}</span>}
                                </div>
                              </div>
                            </div>
                            <div className='col-12 d-flex justify-content-end mb-4 mt-3'>
                              <button type="submit" className="text-white btn btn-sm readmorebtn mr-2">Submit</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane key="static-2" tab="Company Information">
                  <CompanyInformation
                    Upload={Upload}
                    uploadButton={uploadButton}
                  />
                </TabPane>
                <TabPane tab={`My Social Network`} key={`social-network`}>
                  <MySocialNetwork />
                </TabPane>
                <TabPane tab={`Change Your Password`} key={`change-password`}>
                  <ChangePassword />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Modal.Body>
        <ToastContainer />
      </Modal>
    </div>
  )
}

export default MyAccount