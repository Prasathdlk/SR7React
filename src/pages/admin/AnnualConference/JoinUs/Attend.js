import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { interestToAttend, cancelAttended, cancelSponsored } from "redux/Actions/AnnualConference"
import { companyList } from "redux/Actions/Company";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { getTeamMembers } from "redux/Actions/EventExhibition";
import { Button, Tooltip, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from "components/ScrollStyle"
import Form from 'react-bootstrap/Form';
import { FaCircle } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { IoMdAirplane } from "react-icons/io";
import { TbAlertCircle } from "react-icons/tb"

const animatedComponents = makeAnimated();

const Attend = () => {
  const from_ref = useRef();
  const to_ref = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(companyList());
    dispatch(getTeamMembers());
  }, []);
  const { isLoadingS, isSuccess } = useSelector(state => state.annualconference);
  const { teamMember } = useSelector(state => state.exhibition);
  const { companyProfileData } = useSelector(state => state.company);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const [colleague, setColleague] = useState(1);
  const [size, setsize] = useState("S");
  const { memberProfileData } = useSelector(state => state.member);
  const { conferenceBanner } = useSelector(state => state.annualconference);
  const [isFile, setIsFile] = useState(false);
  const [file, setFile] = useState(false);
  const [fileName, setFileName] = useState("Upload Boundary File");
  const [show, setShow] = useState(false);
  const [addshow, setAddShow] = useState(false);
  const [cancelshow, setCancelShow] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [fromDateVal, setFromDateVal] = useState(false);
  const [toDate, setToDate] = useState('');
  const [toDateVal, setToDateVal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [maxFile, setMaxFile] = useState(false);
  const [showMelas, setshowMelas] = useState(true);
  const [showCircle, setShowCircle] = useState(false);
  const [updateshow, setUpdateShow] = useState(false);

  useEffect(() => {
    setValue('firstname', memberProfileData?.data?.first_name)
    setValue('lastname', memberProfileData?.data?.last_name)
    setValue('companyName', memberProfileData?.data?.company_name)
    setValue('designation', memberProfileData?.data?.designation)
    setValue('email', memberProfileData?.data?.email)
    setValue('phone', memberProfileData?.data?.phone)
    setValue('country', memberProfileData?.data?.country)
    const member_status = conferenceBanner?.data?.already_interest_to_attended;
    if (member_status == 0) {
      setUpdateShow(true);
    }
    else {
      setUpdateShow(false);
    }
  }, [conferenceBanner])

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];


  const props = {
    multiple: false,
    onChange(file) {
      const fileSizeKiloBytes = file?.file?.size / 1024
      if (!allowedTypes.includes(file?.file?.type)) {
        setMaxFile(true);
        return false;
      }
      if (fileSizeKiloBytes > 10000) {
        setMaxFile(true);
        return false;
      }
      setMaxFile(false);
      setFileList([...file.fileList]);
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const [MEM, setMEM] = useState([]);
  useEffect(() => {
    let member = [];
    if (Object.keys(teamMember).length > 0
      && teamMember.data.length) {
      teamMember.data.map(item => {
        member.push({
          value: item.id,
          label: item.name,
          others: "Others"
        })
      })
    }
    member.push({
      value: 0,
      label: 'Others'
    })
    setMEM(member);
  }, [teamMember]);

  const handleFromDateChange = (e) => {
    const selectedFromDate = e.target.value;
    setFromDate(selectedFromDate);
    if (selectedFromDate)
      setFromDateVal(false)
    else
      setFromDateVal(true)

    if (toDate && selectedFromDate > toDate) {
      setToDate('');
    }
  };

  const handleToDateChange = (e) => {
    const selectedToDate = e.target.value;
    setToDate(selectedToDate);
    if (selectedToDate)
      setToDateVal(false)
    else
      setToDateVal(true)
  };

  const options = [
    { label: "S", value: "S" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "2XL", value: "2XL" },
    { label: "3XL", value: "3XL" },
  ];

  const status = conferenceBanner?.data?.status;
  const member_status = conferenceBanner?.data?.already_interest_to_attended;

  const handleMealsChange = (e) => {
    if (e.target.value == 'Others') {
      setshowMelas(false);
    }
    else {
      setshowMelas(true);
    }
  }

  const cancelHandle = (value) => {
    if (value === 'attend') {
      dispatch(cancelAttended(conferenceBanner?.data?.id))
    } else {
      dispatch(cancelSponsored(conferenceBanner?.data?.id))
    }
  }


  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setFileList([]);
        reset();
        setFromDate('');
        setToDate('');
        setColleague(1);
        setsize("S");
        setshowMelas(true);
        setShowCircle(false);
        if (isSuccess?.msg == 'Registered successfully!') {
          setAddShow(true);
          setUpdateShow(false);
        }
        else if (isSuccess?.msg == 'Updated successfully!') {
          setUpdateShow(false);
        }
        else {
          setUpdateShow(true);
        }
        setCancelShow(false);

        // setFile(false);
        setValue('firstname', memberProfileData?.data?.first_name)
        setValue('lastname', memberProfileData?.data?.last_name)
        setValue('companyName', memberProfileData?.data?.company_name)
        setValue('designation', memberProfileData?.data?.designation)
        setValue('email', memberProfileData?.data?.email)
        setValue('phone', memberProfileData?.data?.phone)
        setValue('country', memberProfileData?.data?.country)
      }, 1000);
    }
  }, [isSuccess])

  const onSubmit = async (data) => {
    setShowCircle(true);
    // console.log(fileList);

    // if (!fileList) {
    //   setFileList(true);
    //   return false;
    // } else {
    //   setFileList(false);
    // }

    // if (fromDate) {
    //   setFromDateVal(false)
    // }
    // else {
    //   setFromDateVal(true)
    //   return false;
    // }


    // if (toDate) {
    //   setToDateVal(false)
    // }
    // else {
    //   setToDateVal(true)
    //   return false;
    // }

    if (maxFile) {
      setShowCircle(false);
      return false;
    }

    if (fileList.length == 0 && member_status == 0) {
      setShowCircle(false);
      setMaxFile(true);
      let newFile = document.getElementById('uploadPhoto');
      newFile.scrollIntoView({ behavior: `smooth`, block: 'center' });
      return false;
    }


    var formdata = new FormData();
    formdata.append("companyName", data.companyName);
    formdata.append("firstname", data.firstname);
    formdata.append("lastname", data.lastname);
    formdata.append("designation", data.designation);
    formdata.append("email", data.email);
    formdata.append("country", data.country);
    formdata.append("colleagues", colleague);
    formdata.append("size", size);
    formdata.append("spouse", data.spouse);
    formdata.append("spouses", data.spouses ? data.spouses : 0);
    formdata.append("visa", data.visa);
    formdata.append("flight_no", data.flight_no == undefined ? '' : data.flight_no);
    formdata.append("d_flight_no", data.d_flight_no == undefined ? '' : data.d_flight_no);
    formdata.append("meals", data.meals);
    formdata.append("phone", data.phone);
    formdata.append("from_date", fromDate);
    formdata.append("to_date", toDate);
    formdata.append("conference_id", conferenceBanner?.data?.id);
    formdata.append("preferences", data.preferences == undefined ? '' : data.preferences);
    // formdata.append("file_path", file);
    // if (fileList.length > 0) {
    fileList.forEach((file) => {
      formdata.append('file_path', file.originFileObj);
    });
    // formdata.append("file", imageFile);
    // }
    dispatch(interestToAttend(formdata));
  }

  return (
    <>
      {!showCircle ? <div>
        {updateshow ? <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {status != 1 &&
            <div className='col-12 d-flex justify-content-center '>
              <span className="error d-block mt-5" style={{ fontSize: "18px" }}>
                Note: Registration is currently unavailable.
              </span>
            </div>
          }
          <div className="form-group row pt-5">
            <div>
              <h6 style={{ fontWeight: "700", fontSize: "17px" }}>Basic Details</h6>
              <p style={{ fontSize: "12px" }}>First Name and Last Name should be as per passport</p>
            </div>
            <div className="col-lg-6">
              <label className='mb-2 text-black fontweight'>First Name (Passport)</label>
              <input type="text" className="form-control"
                {...register("firstname", {
                  required: "Name should not be empty",
                })}
                disabled={member_status == 1 || status != 1 ? true : false}
              />
              {errors.name && <span className="error d-block">{errors.name.message}</span>}
            </div>
            <div className="col-lg-6">
              <label className='mb-2 text-black fontweight'>Second/Given Name (Passport)</label>
              <input type="text" className="form-control"
                {...register("lastname", {
                  required: "Name should not be empty",
                })}
                disabled={member_status == 1 || status != 1 ? true : false}
              />
              {errors.name && <span className="error d-block">{errors.name.message}</span>}
            </div>
            <div className="col-lg-6 mt-3">
              <label className='mb-2 text-black fontweight'>Company Name</label>
              <input type="text" className="form-control"
                {...register("companyName", {
                  required: "Name should not be empty",
                })}
                disabled={member_status == 1 || status != 1 ? true : false}
              //disabled
              />
              {errors.name && <span className="error d-block">{errors.name.message}</span>}
            </div>
            <div className="col-lg-6 mt-3">
              <label className='mb-2 text-black fontweight'>Designation</label>
              <input type="text" className="form-control"
                {...register("designation", {
                  required: "Designation should not be empty",
                })}
                disabled={member_status == 1 || status != 1 ? true : false}
              //disabled
              />
              {errors.designation && <span className="error d-block">{errors.designation.message}</span>}
            </div>
            <div className="col-lg-6 mt-3">
              <label className='mb-2 text-black fontweight'>Email Address</label>
              <input type="email" className="form-control"
                {...register("email", {
                  required: "Email should not be empty",
                })}
                disabled={member_status == 1 || status != 1 ? true : false}
              //disabled
              />
              {errors.email && <span className="error d-block">{errors.email.message}</span>}
            </div>
            <div className="col-lg-6 mt-3">
              <label className='mb-2 text-black fontweight'>Phone Number</label>
              <input type="text" className="form-control"
                {...register("phone")}
                disabled={member_status == 1 || status != 1 ? true : false}
              //disabled
              />
              {errors.phone && <span className="error d-block">{errors.phone.message}</span>}
            </div>
            <div className="col-lg-6 mt-3">
              <label className='mb-2 text-black fontweight'>Country</label>
              <input
                type="text" className="form-control"
                {...register("country")}
                disabled={member_status == 1 || status != 1 ? true : false}
              //disabled
              />
            </div>

            <div className="col-lg-12 d-flex flex-md-column flex-lg-row flex-sm-column flex-xs-column flex-column mt-4 gap-md-2 gap-lg-3 gap-2 align-items-lg-center mt-3">
              <div className='d-flex col-lg-6'>
                <label className='mb-2 text-black fontweight'>
                  Do you plan to attend the conference with your spouse?
                </label>
              </div>
              <div className='d-flex flex-row col-lg-6'>
                {member_status == 0 ? <div>
                  <input type="radio" value="yes" name="spouse" {...register("spouse", { required: "This field should not be empty" })} disabled={member_status == 1 || status != 1 ? true : false} />
                  <span className='px-1'>Yes</span>
                </div> :
                  <div>
                    <input type="radio" value="yes" disabled={member_status == 1 || status != 1 ? true : false} />
                    <span className='px-1'>Yes</span>
                  </div>
                }
                {member_status == 0 ? <div className='px-2'>
                  <input type="radio" value="no" name="spouse" {...register("spouse", { required: "This field should not be empty" })} disabled={member_status == 1 || status != 1 ? true : false} />
                  <span className='px-1'>No</span>
                </div> :
                  <div className='px-2'>
                    <input type="radio" value="no" disabled={member_status == 1 || status != 1 ? true : false} />
                    <span className='px-1'>No</span>
                  </div>
                }
              </div>
            </div>
            {errors.spouse && <span className="error d-block">{errors.spouse.message}</span>}

            {/* <div className="col-lg-12 d-flex flex-md-row flex-column mt-4 gap-md-3 gap-2 align-items-center">
            <div className=''>
              <label className='mb-2 text-black'>                
                Upload Photo
              </label>
            </div>
            <div className="d-flex flex-row ">
              <div className="flex-row col-3 mx-2">
                <Form.Control
                  type="file"
                  className="custom-file-label"
                  id="inputGroupFile01"
                  label={fileName}
                  onChange={(e) => {
                    setFile(e.target.files[0])
                    setFileName(e.target.files[0].name);
                  }}
                />
                {isFile && <span className="error d-block">This field should not be empty</span>}
              </div>
              <div className="flex-row mx-2 mt-2">(Kindly upload your professional photo in JPG, JPEG, PNG format. File size must not exceed 1 MB)</div>
            </div>
          </div> */}

            <div className="col-lg-12 d-flex flex-column flex-md-row mt-4" id="uploadPhoto">
              <div className='col-md-2 mt-2'>
                <label className='mb-2 text-black fontweight'>
                  Upload Photo
                </label>
              </div>
              <div className='col-11 d-flex flex-column flex-md-column gap-1'>
                <div className='gap-1 '>
                  <Upload
                    {...props}
                    // multiple={false}
                    maxCount={1}
                    style={{ width: "30px" }}
                    defaultFileList={[...fileList]}
                    listType="picture"
                    className="upload-list-inline attendeesPic"
                    disabled={member_status == 1 || status != 1 ? true : false}
                  >
                    <Button icon={<UploadOutlined />}>Upload here</Button>
                  </Upload>
                </div>
                <span style={{ fontSize: "12px", color: maxFile ? "red" : '' }}>(Please upload a professional photo (JPG/JPEG/PNG) less than 10MB)</span>
              </div>
            </div>

            {/* <div className="col-lg-12 d-flex flex-md-column flex-lg-row flex-sm-column flex-xs-column flex-column mt-4 gap-md-2 gap-lg-3 gap-2 align-items-lg-center">
            <div className='d-flex col-2 col-lg-2'>
              <label className='mb-2 text-black'>                
                Polo Shirt Size
              </label>
            </div>
            <div className="col-10 flex-row d-flex">
              <div className="col-3">
                <Select
                  styles={styles}
                  placeholder="Select Size"
                  options={options}
                  isSearchable={true}
                  defaultValue={options[0]}
                  onChange={(value) => setsize(value.value)}
                />
              </div>
              <div className="flex-row mx-2 mt-3"><span style={{ "color": "#1B4D70", "cursor": "pointer" }} onClick={() => setShow(true)}>(Click for size reference chart)</span></div>
            </div>
            {errors.size && <span className="error d-block">{errors.size.message}</span>}
          </div> */}

            <div className="col-lg-12 d-flex flex-column flex-md-row mt-4">
              <div className='col-md-2 mt-2'>
                <label className='mb-2 text-black fontweight'>
                  Polo Shirt Size
                </label>
              </div>
              <div className='col-lg-3'>
                <div className='gap-1 col-lg-6'>
                  <Select
                    styles={styles}
                    placeholder="Select Size"
                    options={member_status == 0 && status == 1 ? options : ''}
                    isSearchable={member_status == 1 || status != 1 ? false : true}
                    defaultValue={options[0]}
                    onChange={(value) => setsize(value.value)}
                  />
                </div>
                <div className="flex-row mt-1"><span style={{ "color": "#1B4D70", "cursor": "pointer", textDecoration: "underline" }} onClick={() => setShow(member_status == 1 || status != 1 ? false : true)}>(Click for size reference chart)</span></div>
              </div>
              {errors.size && <span className="error d-block">{errors.size.message}</span>}
            </div>

            <div className="col-lg-12 mt-4">
              <div className='mt-2'>
                <label className='mb-2 text-black fontweight'>
                  Kindly check if Thailand Visa is required for your nationality
                </label><span className='mx-1'></span>
                {member_status == 1 || status != 1 ? <span style={{ "color": "#1B4D70", "cursor": "pointer", textDecoration: "underline" }} > https://www.traveldoc.aero/</span> :
                  <a href='https://www.traveldoc.aero/' style={{ "text-decoration": "underline" }} target='_blank'> https://www.traveldoc.aero/</a>
                }
              </div>
            </div>

            <div className="col-lg-12 d-flex flex-md-column flex-lg-row flex-sm-column flex-xs-column flex-column mt-4 gap-md-2 gap-lg-3 gap-2 align-items-lg-center mt-3">
              <div className='d-flex col-lg-6'>
                <label className='mb-2 text-black fontweight'>
                  Please let us know if you require assistance for Visa
                </label>
              </div>
              <div className='d-flex flex-row col-lg-6'>
                {member_status == 0 ? <div>
                  <input type="radio" value="yes" name="visa" {...register("visa", { required: "This field should not be empty" })} disabled={member_status == 1 || status != 1 ? true : false} />
                  <span className='px-1'>Yes</span>
                </div> :
                  <div>
                    <input type="radio" value="yes" disabled={member_status == 1 || status != 1 ? true : false} />
                    <span className='px-1'>Yes</span>
                  </div>
                }
                {member_status == 0 ? <div className='px-2'>
                  <input type="radio" value="no" name="visa" {...register("visa", { required: "This field should not be empty" })} disabled={member_status == 1 || status != 1 ? true : false} />
                  <span className='px-1'>No</span>
                </div> :
                  <div className='px-2'>
                    <input type="radio" value="no" disabled={member_status == 1 || status != 1 ? true : false} />
                    <span className='px-1'>No</span>
                  </div>}
              </div>
            </div>
            {errors.visa && <span className="error d-block">{errors.visa.message}</span>}

            {/* <div className="col-lg-6 mt-4">
            <label className='mb-2 text-black'><FaCircle style={{ "font-size": "6px" }} /> </label>
            <div className='mx-2'>
              <input type="radio" value="yes" name="visa" {...register("visa", { required: "This field should not be empty" })} /><span className='mx-1'>Yes</span><span className='mx-1'></span>
              <input type="radio" value="no" name="visa" {...register("visa", { required: "This field should not be empty" })} /><span className='mx-1'>No</span>
            </div>
            {errors.visa && <span className="error d-block">{errors.visa.message}</span>}
          </div> */}

            <div className="col-lg-12 mt-4">
              <div className='d-flex col-lg-6'>
                <label className='mb-2 text-black fontweight'>
                  Meals Preference
                </label>
              </div>
            </div>
            <div className='col-lg-12 d-flex flex-lg-row flex-column flex-xs-column flex-sm-column flex-md-column'>
              <div className='col-lg-6 d-flex flex-lg-row flex-column flex-xs-column flex-sm-column flex-md-column'>
                <div><input type="radio" value="Regular" name="meals" {...register("meals")}
                  //{...register("meals", { required: "This field should not be empty" })} 
                  disabled={member_status == 1 || status != 1 ? true : false} onChange={handleMealsChange} /><span className='px-1'>Regular</span><span className='mx-1'></span></div>
                <div><input type="radio" value="Vegetarian" name="meals"  {...register("meals")}
                  //{...register("meals", { required: "This field should not be empty" })} 
                  disabled={member_status == 1 || status != 1 ? true : false} onChange={handleMealsChange} /><span className='px-1'>Vegetarian</span><span className='mx-1'></span></div>
                <div><input type="radio" value="Gluten-free" name="meals"  {...register("meals")}
                  //{...register("meals", { required: "This field should not be empty" })} 
                  disabled={member_status == 1 || status != 1 ? true : false} onChange={handleMealsChange} /><span className='mx-1'>Gluten-free</span><span className='mx-1'></span></div>
                <div><input type="radio" value="Halal" name="meals"  {...register("meals")}
                  //{...register("meals", { required: "This field should not be empty" })} 
                  disabled={member_status == 1 || status != 1 ? true : false} onChange={handleMealsChange} /><span className='mx-1'>Halal</span><span className='mx-1'></span></div>
                <div className='mb-2'> <input type="radio" value="Others" name="meals"  {...register("meals")}
                  //{...register("meals", { required: "This field should not be empty" })} 
                  disabled={member_status == 1 || status != 1 ? true : false} onChange={handleMealsChange} /><span className='mx-1'>Others</span></div>
              </div>
              <div className='col-lg-6'>
                {/* <textarea className="form-control"  {...register("preferences")} /> */}
                <div className='col-lg-4'>
                  <div>
                    <input type="text" className="form-control"
                      required
                      {...register("preferences")}
                      disabled={showMelas ? true : false}
                    //disabled
                    />
                  </div>
                </div>
                <div className='mt-2'><span style={{ fontSize: "12px" }}>(Please specify any other preferences or allergies)</span></div>
              </div>
            </div>
            {errors.meals && <span className="error d-block">{errors.meals.message}</span>}

            <div className="col-lg-12">
              <label className='mb-2 text-black fontweight'></label>

            </div>

            <hr class="hr-11 formHr mt-3" />

            <div className='d-flex col-lg-12'>
              <label className='mb-2 text-black fontweight'>
                You can submit it at a later time, after you've made your flight booking.
              </label>
            </div>

            <div className='col-lg-12 d-flex flex-lg-row flex-column flex-xs-column flex-sm-column flex-md-column mt-3'>
              <div className='d-flex flex-row col-lg-6'>
                <div className='col-4 d-flex align-items-center'>
                  <label className='text-black fontweight'>Arrival date</label>
                </div>
                <div className='col-7 mb-2'>
                  <Form.Control
                    type="date"
                    name="fromDate"
                    value={fromDate}
                    min={moment(new Date()).subtract(0, 'days').format('YYYY-MM-DD')}
                    onChange={handleFromDateChange}
                    disabled={status == 1 ? false : true}
                  />
                  {/* {fromDateVal && <span className="error d-block">This field should not be empty</span>} */}
                </div>
              </div>

              <div className='d-flex flex-row col-lg-6'>
                <div className='col-4 d-flex align-items-center'>
                  <label className='text-black fontweight'>Departure date</label>
                </div>
                <div className='col-7 mb-2'>
                  <Form.Control
                    type="date"
                    value={toDate}
                    min={fromDate} // Set the minimum selectable date based on "From" date
                    onChange={handleToDateChange}
                    disabled={status == 1 ? false : true}
                  />
                  {/* {fromDateVal && <span className="error d-block">This field should not be empty</span>} */}
                </div>
              </div>
            </div>

            {/* <div className='col-lg-12 d-flex flex-row mt-2'>
            <div className="d-flex flex-row col-lg-6  mx-4 ">
              <div className='col-4 d-flex align-items-center mt-2'>
                <label className='mb-2 text-black fontweight'>Arrival date</label>
              </div>
              <div className='col-6'>
                <div className='col-12'>
                  <Form.Control
                    type="date"
                    name="fromDate"
                    value={fromDate}
                    min={moment(new Date()).subtract(0, 'days').format('YYYY-MM-DD')}
                    onChange={handleFromDateChange}
                  />
                </div>
              </div>
              {fromDateVal && <span className="error d-block">This field should not be empty</span>}
            </div>

            <div className="d-flex flex-row col-lg-6 mt-4 mx-4 ">
              <div className='col-2 d-flex align-items-center mt-2'>
                <label className='mb-2 text-black fontweight'>Departure date</label>
              </div>
              <div className='col-10'>
                <div className='col-3'>
                  <Form.Control
                    type="date"
                    value={toDate}
                    min={fromDate} // Set the minimum selectable date based on "From" date
                    onChange={handleToDateChange}
                  />
                </div>
              </div>
              {toDateVal && <span className="error d-block">This field should not be empty</span>}
            </div>
          </div> */}

            <div className='col-lg-12 d-flex flex-lg-row flex-column flex-xs-column flex-sm-column flex-md-column mt-3'>
              <div className='d-flex flex-row col-lg-6'>
                <div className='col-4 d-flex align-items-center'>
                  <label className='text-black fontweight'>Arrival Flight No</label>
                </div>
                <div className='col-7 mb-2'>
                  <input type="text" className="form-control"  {...register("flight_no")}
                    // {...register("flight_no", {
                    //   required: "This field should not be empty",
                    // })} 
                    disabled={status == 1 ? false : true} />
                  {errors.flight_no && <span className="error d-block">{errors.flight_no.message}</span>}
                </div>
              </div>
              <div className='d-flex flex-row col-lg-6'>
                <div className='col-4 d-flex align-items-center'>
                  <label className='text-black fontweight'>Departure Flight No</label>
                </div>
                <div className='col-7 mb-2'>
                  <input type="text" className="form-control"  {...register("d_flight_no")}
                    // {...register("flight_no", {
                    //   required: "This field should not be empty",
                    // })} 
                    disabled={status == 1 ? false : true} />
                  {errors.flight_no && <span className="error d-block">{errors.flight_no.message}</span>}
                </div>
              </div>
            </div>

            {/* <div className='mx-2 mx-4'>
            (Please provide information if you require early check-in, subject to hotel availability
            <span style={{ color: "red" }}>*</span>)
          </div> */}
            <div className='mt-2 col-12 row' style={{ fontSize: "12px" }}>
              <div className='col-2'></div>
              <div className='col-6 mx-4'>
                (Please provide information if you require early check-in and/or late checkout, subject to hotel availability
                <span style={{ color: "red" }}>*</span>)
              </div>
            </div>
            {/* 
          <div className="d-flex flex-row col-lg-12 mt-4 mx-4 ">
            <div className='col-2 d-flex align-items-center mt-2'>
              <label className='mb-2 text-black fontweight'>Flight Number</label>
            </div>
            <div className='col-10'>
              <div className='col-5'>
                <input type="text" className="form-control" {...register("flight_no", {
                  required: "This field should not be empty",
                })} />
              </div>
            </div>
          </div>
          {errors.flight_no && <span className="error d-block">{errors.flight_no.message}</span>} */}

          </div>
          <div className="col-lg-12 mt-5">
            <h6 style={{ color: "red" }} className='mt-2'>Note:</h6>
            <p> If the conference reaches full capacity, there's a chance you might lose your spot,
              so please ensure that you secure your place <b> by making payment immediately after receiving the invoice.</b>
            </p>
            <p> Please be advised: Events worldwide can be volatile, unpredictable, and subject to
              sudden changes beyond our control.
            </p>
            <p> While we will make every effort to assist in communicating with hotels should venue changes or
              cancellations become necessary for safety or other reasons, we cannot be held liable for costs
              associated with non-refundable flight booking.
            </p>
          </div>
          {member_status == 0 ? <div className='d-flex flex-row  gap-1 mt-4'>
            <input type="checkbox" value="true" {...register("accept", {
              required: "Please accept our disclaimer",
            })} disabled={member_status == 1 || status != 1 ? true : false} /><span className='d-flex align-items-center'>I am accepting the terms.</span>
          </div> :
            <div className='d-flex flex-row  gap-1 mt-4'>
              <input type="checkbox" value="true" disabled={member_status == 1 || status != 1 ? true : false} /><span className='d-flex align-items-center'>I am accepting the terms. </span>
            </div>
          }
          {errors.accept && <span className="error d-block">{errors.accept.message}</span>}
          {status == 1 && <div className="justify-content-center d-flex flex-row">
            <div className="widget-footer">
              <button type="submit" className='btn btn-success m-4' onClick={handleSubmit(onSubmit)} style={{ color: "white" }}>{member_status == 1 ? 'Update' : 'Register'}</button>
            </div>
          </div>
          }
        </form> :
          <div className='col-12 d-flex justify-content-center'>
            <div className="col-6 card-box mt-5">
              <div style={{ color: "#0570BE", fontSize: "20px", textAlign: "center" }}><TbAlertCircle /></div>
              <div className='al-sub text-center'>You are already submitted</div>

              <div className='al-sub text-center'>
                <span style={{ color: "blue" }} className="btn btn-sm bg-gradient-primary text-white mt-2"
                  onClick={() => setCancelShow(true)}>
                  Cancel
                </span>
                <span style={{ color: "blue" }} className="btn btn-sm bg-gradient-primary text-white mt-2 mx-3"
                  onClick={() => setUpdateShow(true)}>
                  Update
                </span>
              </div>
              <Modal show={cancelshow} onHide={() => setCancelShow(false)}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ color: "#1B4D70" }}><TbAlertCircle /> Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you Want to Cancel?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setCancelShow(false)}>
                    No
                  </Button>
                  <Button variant="primary" onClick={() => cancelHandle('attend')}>
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        }
      </div> :
        <div className="col-xl-12 col-lg-12" style={{ margin: "15% 40%" }}>
          <RotatingLines
            strokeColor="#FF0091"
            strokeWidth="5"
            animationDuration="1.00"
            width="70"
            visible={true}
          />
        </div>
      }

      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title className='px-2'>Size Guide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center><img src="https://staging.tala.aero/backend/core/public/uploads/size_guide.png" width={500}></img></center>
        </Modal.Body>
      </Modal>

      <Modal show={addshow} onHide={() => setAddShow(false)} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title className='px-2'>Registration Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center><h5 className='text-black'>Thank you for registering!</h5></center>
          <div className='text-black mt-3 mx-2'>
            We are delighted to confirm that your registration has been successfully received.
          </div>
          <div className='text-black mt-3 mx-2'>
            What's Next?
          </div>
          <div className='text-black mt-3 mx-2'>
            • Invoice Processing: Our team will process your registration details and prepare the invoice accordingly.
          </div>
          <div className='text-black mt-3 mx-2'>
            • Confirmation Email: You will receive a confirmation email shortly with detailed information regarding your registration and payment process. Please make sure to check your inbox (and spam folder, just in case).
          </div>
          <div className='text-black mt-3 mx-2'>
            • Stay Connected: In the meantime, feel free to explore more about the Annual conference on our dashboard or follow us on social media for updates and news.
          </div>
          <div className='text-black mt-3 mx-2'>
            Should you have any questions or require further assistance, please contact us.
          </div>
          <div className='text-black mt-3 mx-2'>
            <b>We look forward to welcoming you!</b>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Attend