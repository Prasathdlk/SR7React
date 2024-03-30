import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import {
  companyProfile,
  addBranches,
  getQueryContinent
} from "redux/Actions/Company";
import {
  setIsSuccess
} from "redux/Reducers/CompanySlice";
import { memberProfile } from "redux/Actions/Member";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'

const CompanyInformation = ({
  Upload,
  uploadButton,
}) => {

  const dispatch = useDispatch();
  const [imageCompanyUrl, setImageCompanyUrl] = useState('');
  const { companyId } = useSelector(state => state.loggedin);
  const [branchList, setBranchList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [companyFile, setCompanyFile] = useState(false);
  const {
    companyProfileData,
    isSuccess,
    isContinent } = useSelector(state => state.company);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [open, setOpen] = useState(false);
  const [HQ, setHQ] = useState('');
  const [CT, setCT] = useState('');

  useEffect(() => {
    let list = [];
    let ctl = [];
    if (Object.keys(companyProfileData).length > 0
      && typeof companyProfileData.data !== 'undefined'
      && Object.keys(companyProfileData.data).length > 0) {
      if (typeof companyProfileData?.data?.company_info !== 'undefined'
      ) {
        setImageCompanyUrl(companyProfileData?.data?.company_info?.company_logo);
        setValue('company_name', `${companyProfileData?.data?.company_info.company_name}`);
        setValue('website', `${companyProfileData?.data?.company_info?.website}`);
        setValue('description', `${companyProfileData?.data?.company_info?.description}`);
        setHQ({
          label: companyProfileData?.data?.company_info?.headquarter,
          value: companyProfileData?.data?.company_info?.headquarter_id
        });

        if (typeof companyProfileData?.data?.company_info?.country !== 'undefined'
          && companyProfileData?.data?.company_info?.country.length === 1) {
          dispatch(getQueryContinent(companyProfileData?.data?.company_info?.country[0]));
          setValue('country', `${companyProfileData?.data?.company_info?.country[0]}`);
        }
        if (typeof companyProfileData?.data?.company_info?.country !== 'undefined'
          && companyProfileData?.data?.company_info?.country.length > 1) {
          companyProfileData?.data?.company_info?.country.map((name, index) => {
            if (index === 0) {
              setCT({
                label: name,
                value: name
              });
              dispatch(getQueryContinent(name));
            }
            ctl.push({
              label: name,
              value: name
            })
          });
        }
      }
      if (typeof companyProfileData?.data?.branches !== 'undefined'
        && companyProfileData?.data?.branches.length > 0
      ) {
        companyProfileData?.data?.branches.map(item => {
          list.push({
            label: item.branch_name,
            value: item.id
          })
        })
      }
    }
    setCountryList(ctl);
    setBranchList(list);
  }, [companyProfileData])

  useEffect(() => {

    if (Object.keys(isContinent).length > 0
      && typeof isContinent.data !== 'undefined'
      && Object.keys(isContinent.data).length > 0
      && companyProfileData?.data?.company_info?.country.length > 0
    ) {
      setValue('continent', `${isContinent.data[0]}`);
    }

  }, [isContinent])

  const imageUpload = (file, name) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (name === 'company') {
        setCompanyFile(file)
        setImageCompanyUrl(reader.result)
      }
    }
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    if (isSuccess) {
      if (Object.keys(isSuccess).length > 0
        && typeof isSuccess.message !== 'undefined') {
        toast.success(`${isSuccess.message}`, {
          toastId: 'success',
          autoClose: 1000
        })
      }
      dispatch(companyProfile(companyId));
      dispatch(memberProfile());
      setOpen(false);
      setValue('branch_name', '');
      setValue('address', ``);
      setValue('city', ``);
      setValue('zipcode', ``);
      dispatch(setIsSuccess());
    }
  }, [isSuccess])


  const onSubmit = (data) => {
    let fdata = {};
    fdata.website = data.website;
    fdata.headquarter = HQ.value;
    fdata.description = data.description;
    if (open) {
      fdata.branch_name = data.branch_name;
      fdata.address = data.address;
      fdata.city = data.city;
      fdata.zipcode = data.zipcode;
      fdata.airport_code = data.airport_code;
    }
    dispatch(addBranches(fdata));
    // if (companyFile) {
    //   formdata.append("company_logo", companyFile);
    // }

  };

  const onClose = () => {
    setValue('branch_name', '');
    setValue('address', ``);
    setValue('city', ``);
    setValue('zipcode', ``);
    setOpen(false);
  }

  const propsC = {
    multiple: false,
    onChange(file) {
      imageUpload(file.file, 'company')
    },
    beforeUpload: (file) => {
      return false;
    },
  };

  return (
    <div>
      <div className='col-12 d-flex justify-content-center mt-3'>
        <h4>COMPANY<span style={{ color: "#FF0091" }}> INFORMATION</span>
        </h4>
      </div>

      <div className="d-flex justify-content-center align-items-center mt-3">Company Logo</div>
      <div className='col-12 d-flex flex-md-column flex-xl-column flex-lg-column  flex-sm-column  flex-column'>
        <div className='mt-1 col-md-12 col-12 d-flex flex-column flex-md-row flex-xl-row flex-lg-row justify-content-center gap-5'>
          <div>
            <Upload
              {...propsC}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader d-flex justify-content-center align-items-center mt-md-2"
              showUploadList={false}
            >
              {imageCompanyUrl ? (
                <img
                  src={imageCompanyUrl}
                  alt="avatar"
                  style={{
                    width: '100%',
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>

            <div className="d-flex justify-content-center align-items-center mt-4">
              <h6>Membership ID : <span >{companyProfileData?.data?.company_info?.membership_id}</span>
              </h6>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-9 col-xl-9 col-sm-12 col-lg-9'>
          <div className="row">
            <form className="login-form mt-4"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
              style={{ paddingRight: "30px", marginTop: "20px" }}>
              <div className="col-md-12 clearfix mt-3">
                <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                  <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                    <label>Add New Branch</label>
                  </div>
                  <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                    <div className="col-md-12 clearfix mt-3">
                      <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query gap-3">
                        {open ?
                          <>
                            <div className='col-12 col-xl-8 col-lg-8 col-sm-8 col-md-8'>
                              <input type="text"
                                className="keyword-input col-12"
                                placeholder='Branch City'
                                {...register("branch_name", {
                                  required: "Branch name should not be empty",
                                })}
                              />
                              {errors.branch_name && <span className="col-12 error d-block d-flex justify-content-end">{errors.branch_name.message}</span>}
                            </div>
                            <div className='col-12 col-xl-8 col-lg-8 col-sm-8 col-md-8'>
                              <button type="button"
                                className="btn btn-outline-success"
                                onClick={() => onClose()}> Close </button>
                            </div>
                          </>
                          :
                          <div className='col-12 col-xl-8 col-lg-8 col-sm-8 col-md-8'>
                            <button type="button"
                              className="btn btn-outline-success"
                              onClick={() => setOpen(!open)}> Add New Branch </button>
                          </div>
                        }
                      </div>
                      {open === true &&
                        <>
                          <div className="col-md-12 clearfix mt-3">
                            <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query gap-3">
                              <div className='col-12 col-xl-8 col-lg-8 col-sm-8 col-md-8'>
                                <input type="text"
                                  className="keyword-input col-12"
                                  placeholder='Company Name'
                                  {...register("company_name", {
                                    required: "Company name should not be empty",
                                  })}
                                  readOnly
                                />
                              </div>
                              <div className='col-12 col-xl-8 col-lg-8 col-sm-8 col-md-8'>
                                <input type="text"
                                  className="keyword-input col-12"
                                  placeholder='Address'
                                  {...register("address", {
                                    required: "Address should not be empty",
                                  })}
                                />
                                {errors.address && <span className="col-12 error d-block d-flex justify-content-end">{errors.address.message}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 clearfix mt-2">
                            <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query gap-3">
                              <div className='col-12 col-xl-8 col-lg-8 col-sm-8 col-md-8'>
                                <input type="text"
                                  className="keyword-input col-12"
                                  placeholder='City'
                                  {...register("city", {
                                    required: "City should not be empty",
                                  })}
                                />
                                {errors.city && <span className="col-12 error d-block d-flex justify-content-end">{errors.city.message}</span>}
                              </div>
                              <div className='col-12 col-xl-8 col-lg-8 col-sm-8 col-md-8'>
                                <input type="text"
                                  maxLength={3}
                                  className="keyword-input col-12"
                                  placeholder='Airport Code'
                                  {...register("airport_code", {
                                    required: "Airport Code should not be empty",
                                  })}
                                />
                                {errors.airport_code && <span className="col-12 error d-block d-flex justify-content-end">{errors.airport_code.message}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 clearfix mt-2">
                            <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query gap-3">
                              <div className='col-12 col-xl-8 col-lg-8 col-sm-8 col-md-8'>
                                <input type="text"
                                  className="keyword-input col-12"
                                  placeholder='Continent'
                                  {...register("continent", {
                                    required: false,
                                  })}
                                  readOnly
                                />
                              </div>
                              <div className='col-12 col-xl-8 col-lg-8 col-sm-8 col-md-8'>
                                {countryList.length > 0 ?
                                  <>
                                    <Select
                                      value={CT}
                                      className='branchSelect'
                                      options={countryList}
                                      isSearchable={true}
                                      placeholder="Select"
                                      onChange={(value) => {
                                        setCT(value);
                                        dispatch(getQueryContinent(value.value));
                                      }}
                                    />
                                  </> :
                                  <input type="text"
                                    className="keyword-input col-12"
                                    placeholder='Country'
                                    {...register("country", {
                                      required: "Country should not be empty",
                                    })}
                                    readOnly
                                  />
                                }
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 clearfix mt-2">
                            <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query gap-3">
                              <div className='col-12 col-xl-8 col-lg-8 col-sm-8 col-md-8'>
                                <input type="text"
                                  className="keyword-input col-12"
                                  placeholder='Zipcode'
                                  {...register("zipcode", {
                                    required: "Zipcode should not be empty",
                                  })}
                                />
                                {errors.zipcode && <span className="col-12 error d-block d-flex justify-content-end">{errors.zipcode.message}</span>}
                              </div>
                            </div>
                          </div>
                        </>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 clearfix mt-3">
                <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                  <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                    <label>Headquarter</label>
                  </div>
                  <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                    <Select
                      value={HQ}
                      className='branchSelect'
                      options={branchList}
                      isSearchable={true}
                      placeholder="Select HQ"
                      onChange={(value) => {
                        setHQ(value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-12 clearfix mt-3">
                <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                  <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                    <label>Website URL</label>
                  </div>
                  <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                    <input type="text"
                      className="keyword-input col-12"
                      {...register("website", {
                        required: "Website URL should not be empty",
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 clearfix mt-3">
                <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                  <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                    <label>Company Description</label>
                  </div>
                  <div className='col-12 col-xl-12 col-lg-12 col-sm-12 col-md-12'>
                    <textarea id="description" name="w3review" rows="4" cols="80"
                      {...register("description", {
                        required: "Description should not be empty",
                      })}>
                    </textarea>
                  </div>
                </div>
              </div>
              <div className="col-md-12 clearfix mt-3">
                <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                  <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                  </div>
                  <div className='col-12 d-flex justify-content-start mb-4 mt-3'>
                    <button type="submit" className="text-white btn btn-sm readmorebtn mr-2">Submit</button>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default CompanyInformation


