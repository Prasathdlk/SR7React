import React, { useEffect,useState } from 'react';
import { useForm } from "react-hook-form";
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { interestToSponser } from "redux/Actions/AnnualConference";
import { BsCheck2 } from "react-icons/bs"
import { Button, Tooltip } from 'antd';

const Sponser = ({ list }) => {
  const dispatch = useDispatch();
  const { isLoadingS,isSuccess } = useSelector(state => state.annualconference);
  const { companyProfileData } = useSelector(state => state.company);
  const { memberProfileData } = useSelector(state => state.member);
  const { conferenceBanner } = useSelector(state => state.annualconference);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [hide, setHide] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    setValue('name', `${memberProfileData?.data?.first_name} ${memberProfileData?.data?.last_name}`)
    setValue('designation', memberProfileData?.data?.designation);
    setValue('email', memberProfileData?.data?.email)
    setValue('phone', memberProfileData?.data?.phone)
    const sponser = conferenceBanner?.data?.already_sponser_to_attended;
    const sponser_status = conferenceBanner?.data?.sponser_status;
    const company_sponser = conferenceBanner?.data?.company_sponser;
    if(sponser_status > 1)
    {
      setHide(true);
      setMessage('Sponsorship will be announced soon.');
    }
    else if(sponser == 1)
    {
      setHide(true);
      setMessage("You've already submitted a sponsorship application.");
    }
    else if(company_sponser == 1)
    {
      setHide(true);
      setMessage("Your team member has already submitted a sponsorship application.");
    }
    else
    {
      setHide(false);
    }
  }, [conferenceBanner])

  useEffect(() => {
    if (list?.sponser) {
      if(Object.keys(list?.sponsersList).length > 0 &&
      list.sponsersList.data.length > 0 )
      list.sponsersList.data.map((item, index) => {
        if(list?.sponser == item.category)
        {
            item.show == 1 ? setValue('sponsers', list?.sponser) : setValue('sponsers', '');
        }
        
      });
      
    }
  }, [list?.sponser])

  const onSubmit = async (data) => {
    data.conference_id = conferenceBanner?.data?.id;
    dispatch(interestToSponser(data));
  }

  const status = conferenceBanner?.data?.status;

  return (
    <>
     {hide && <center style={{color:'red'}}><h5>{message}</h5></center> }
      <form onSubmit={handleSubmit(onSubmit)} >
        {isLoadingS &&
          <div className="spin-loader">
            <RotatingLines
              strokeColor="#FF0091"
              strokeWidth="5"
              animationDuration="0.75"
              width="70"
              visible={true}
            />
          </div>
        }
        {/* <div className='col-12 d-flex justify-content-center'>
          <span className="error d-block mt-5" style={{ fontSize: "18px" }}>
            Note: Registration is currently unavailable.
          </span>
        </div> */}
        <div className="form-group row pt-5">
          <div className="col-lg-6">
            <label className='mb-2'>Name</label>
            <input type="text" className="form-control"
              //disabled={status == 1 ? false : true}
              disabled={hide}
              {...register("name", {
                required: "Name should not be empty",
              })} />
            {errors.name && <span className="error d-block">{errors.name.message}</span>}
          </div>
          <div className="col-lg-6">
            <label className='mb-2'>Designation</label>
            <input type="text" className="form-control"
              //disabled={status == 1 ? false : true}
              disabled={hide}
              {...register("designation", {
                required: "Designation should not be empty",
              })} />
            {errors.designation && <span className="error d-block">{errors.designation.message}</span>}
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-6">
            <label className='mb-2'>Email Address</label>
            <input type="email" className="form-control"
             //disabled={status == 1 ? false : true}
             disabled={hide}
              {...register("email", {
                required: "Email should not be empty",
              })} />
            {errors.email && <span className="error d-block">{errors.email.message}</span>}
          </div>
          <div className="col-lg-6">
            <label className='mb-2'>Phone Number</label>
            <input type="text" className="form-control"
              //disabled={status == 1 ? false : true}
              disabled={hide}
              {...register("phone", {
                required: "Phone number should not be empty",
              })} />
            {errors.phone && <span className="error d-block">{errors.phone.message}</span>}
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-6">
            <label className='mb-2'>Company Name</label>
            <input type="text" className="form-control"
              placeholder='XYZ Company'
              //disabled={status == 1 ? false : true}
              disabled={hide}
              {...register("company_name", {
                required: "Company Name should not be empty",
              })}
              value={companyProfileData?.data?.company_info?.company_name}
              // readOnly 
              />
            {errors.company_name && <span className="error d-block">{errors.company_name.message}</span>}
          </div>
          <div className="col-lg-6">
            <label className='mb-2'>Select Sponsors  <span style={{ color: "red" }}> *</span></label>
            <select className="form-control"
              {...register("sponsers", {
                required: "Sponsers should not be empty",
              })}
              //disabled={status == 1 ? false : true}
              disabled={hide}
            >
              <option value={""}>-Select-</option>
              {Object.keys(list?.sponsersList).length > 0 &&
                list.sponsersList.data.length > 0 && 
                list.sponsersList.data.map((item, index) => {
                  return (
                    <option key={`sp${index}`} value={item.category} disabled={item.show == 0 ? true : false}>{item.category}</option>
                  )
                })}
            </select>
            {errors.sponsers && <span className="error d-block">{errors.sponsers.message}</span>}
          </div>
        </div>

        {!hide  && <div className="form-group row">
          <div className="widget-footer">
             <button type="submit" className="btn readmorebtn text-white mr-2">
              Submit
            </button>
          </div>
        </div>
        }
      </form>
    </>
  )
}

export default Sponser