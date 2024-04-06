import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaCalendarAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { setValidation } from "redux/Reducers/EventExhibitionSlice";
import { addExhibition } from "redux/Actions/EventExhibition";
import { loctaionsAllCountryList } from "redux/Actions/Member";
import Select from 'react-select'
import styles from "components/ScrollStyle"
import moment from 'moment';

const AddEvent = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const [isFile, setIsFile] = useState(false);
  const [file, setFile] = useState(false);
  const [fileName, setFileName] = useState("Upload Boundary File");
  const [currentDate, setCurrentDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const { isLoading, validation, isSuccess } = useSelector(state => state.exhibition);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { countryAllList } = useSelector(state => state.member);
  const [fromDate, setFromDate] = useState('');
  const [fromDateVal, setFromDateVal] = useState(false);
  const [toDate, setToDate] = useState('');
  const [toDateVal, setToDateVal] = useState(false);

  useEffect(() => {
    dispatch(setValidation());
    dispatch(loctaionsAllCountryList());
  }, []);

  const [CTV, setCTV] = useState(false);
  const [optionList, setoptionList] = useState([]);
  useEffect(() => {
    let op = [];
    if (Object.keys(countryAllList).length > 0
      && Object.keys(countryAllList.data).length > 0) {
      countryAllList.data.map((item) => {
        op.push({
          value: item,
          label: item
        });
      });
      setCTV(op[0].value);
    }
    setoptionList(op);
  }, [countryAllList])

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        reset();
        setFile(false);
        setShow(false);
        setFromDate('');
        setToDate('');
      }, 1000);
    }
  }, [isSuccess])


  const onSubmit = async (fdata) => {
    // if (!file) {
    //   setIsFile(true);
    //   return false;
    // } else {
    //   setIsFile(false);
    // }


    if (fromDate) {
      setFromDateVal(false)
    }
    else {
      setFromDateVal(true)
      return false;
    }


    if (toDate) {
      setToDateVal(false)
    }
    else {
      setToDateVal(true)
      return false;
    }

    var formdata = new FormData();
    formdata.append("name", fdata.name);
    formdata.append("website", fdata.website);
    formdata.append("address1", fdata.address1);
    formdata.append("for_year", fromDate);
    formdata.append("to_date", toDate);
    formdata.append("city", fdata.city);
    formdata.append("country", CTV);
    formdata.append("thumbnail", file);
    console.log("fdata", formdata);
    dispatch(addExhibition(formdata));

  }


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

  return (
    <>

      <Modal scrollable={true} show={show} onHide={() => setShow(false)} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <div className='col-12 calenderIcon'>
            <FaCalendarAlt className='col-12 calenderIconMain d-flex justify-content-center align-items-center mt-1' />
          </div>
          <Modal.Title className='px-2' style={{color:"black"}}>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="login-form mt-1" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            {isLoading &&
              <div className="spin-loader" style={{ zIndex: 99 }}>
                <RotatingLines
                  strokeColor="#1D4AEB"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="70"
                  visible={true}
                />
              </div>
            }
            {Object.keys(validation)?.length > 0 &&
              Object.keys(validation?.error).length > 0 &&
              validation?.error?.name?.length > 0 &&
              <span className="error d-block">
                {validation?.error?.name[0]}
              </span>
            }
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <div className="d-flex flex-row">
                <Form.Label className='px-1'>Event Name</Form.Label>
              </div>
              <div className='p-1'>
                <Form.Control
                  type="text"
                  placeholder="Type event name here..."
                  autoFocus
                  className='p-3'
                  {...register("name", {
                    required: "Name should not be empty",
                  })}
                />
                {errors?.name && <span className="error d-block">{errors?.name?.message}</span>}
              </div>
            </Form.Group>

            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <div className="d-flex flex-row">
                <Form.Label className='px-1'>Event Date</Form.Label>
              </div>
              <div className='col-12 d-flex flex-md-row flex-column flex-lg-row flex-xl-row'>
                <div className='d-flex flex-row col-12 col-md-6 p-1'>
                  <div className="col-2 d-flex justify-content-center align-items-center"
                    style={{ textAlign: "center", fontSize: "12px" }}>From</div>
                  <div className="col-10">
                    {/* <Form.Control
                      min={currentDate}
                      type="date"
                      autoFocus
                      className='p-3 '
                      placeholder="Due date"
                      {...register("date", {
                        required: "Date should not be empty",
                      })}
                    /> */}
                    
                    <Form.Control
                      type="date"
                      value={fromDate}
                      min={moment(new Date()).subtract(0, 'days').format('YYYY-MM-DD')}
                      onChange={handleFromDateChange}
                    />
                    {fromDateVal && <span className="error d-block">This field should not be empty</span>}
                  </div>
                </div>
                <div className='d-flex flex-row  col-12 col-md-6 p-1'>
                  <div className="col-2 d-flex justify-content-center align-items-center"
                    style={{ textAlign: "center", fontSize: "12px" }}>To</div>
                  <div className="col-10">
                    {/* <Form.Control
                      min={currentDate}
                      type="date"
                      autoFocus
                      className='p-3'
                      placeholder='From'
                      {...register("date", {
                        required: "Date should not be empty",
                      })}
                    /> */}
                    <Form.Control
                      type="date"
                      value={toDate}
                      min={fromDate} // Set the minimum selectable date based on "From" date
                      onChange={handleToDateChange}
                    />
                    {toDateVal && <span className="error d-block">This field should not be empty</span>}
                  </div>
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <div className="d-flex flex-row">
                <Form.Label className='px-1'>Event Location</Form.Label>
              </div>
              <div className='p-1'>
                <Form.Control
                  type="text"
                  placeholder="📍 Enter Location here"
                  autoFocus
                  className='p-3'
                  {...register("address1", {
                    required: "Location should not be empty",
                  })}
                />
                {errors?.address1 && <span className="error d-block">{errors?.address1?.message}</span>}
              </div>
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <div className="d-flex flex-row">
                <Form.Label className='px-1'>Event Country</Form.Label>
              </div>
              <div className='p-1'>
                <Select
                  styles={styles}
                  value={
                    optionList.filter(option => option.label === CTV)}
                  options={optionList}
                  isSearchable={true}
                  onChange={(value) => setCTV(value.value)}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <div className="d-flex flex-row">
                <Form.Label className='px-1'>Event City</Form.Label>
              </div>
              <div className='p-1'>
                <Form.Control
                  type="text"
                  placeholder="Enter City here"
                  autoFocus
                  className='p-3'
                  {...register("city", {
                    required: "City should not be empty",
                  })}
                />

                {errors?.city && <span className="error d-block">{errors?.city?.message}</span>}
              </div>
            </Form.Group>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <div className="d-flex flex-row">
                <Form.Label className='px-1'>Event Website</Form.Label>
              </div>
              <div className='p-1'>
                <Form.Control
                  type="text"
                  placeholder="Enter Website"
                  autoFocus
                  className='p-3'
                  {...register("website", {
                    required: "Website should not be empty",
                  })}
                />
                {errors?.website && <span className="error d-block">{errors?.website?.message}</span>}
              </div>
            </Form.Group>
            <Form.Group >
              <Form.Label className='px-1'>Upload Thumbnail</Form.Label>
              <div className='p-1'>
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
                {isFile && <span className="error d-block">Thumbnail should not be empty</span>}
              </div>
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}> Close </Button>
              <Button type='submit' variant="primary" class> Submit </Button>
            </Modal.Footer>
          </form >
        </Modal.Body>
      </Modal>
    </>
  );
} 

export default AddEvent;