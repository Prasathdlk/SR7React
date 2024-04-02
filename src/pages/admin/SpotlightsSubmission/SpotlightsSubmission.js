import React, { useEffect, useState } from 'react'
import Cards from 'components/Cards/Cards'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "assets/css/Spotlights/Spotlights.css"
import { RotatingLines } from 'react-loader-spinner';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import SpotlightListing from "components/Spotlight/SpotlightListing";
import {
  getSpotlightListing,
  getSpotlightAdd,
  getSpotlightCategoryListing
} from "redux/Actions/Spotlight";
import { setInitialState } from "redux/Reducers/SpotlightSlice";
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select'

const TalaSpotlights = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const dispatch = useDispatch();
  const {
    spotlightCatgoryListing,
    isLoading,
    isSuccess,
    error
  } = useSelector(state => state.spotlight);

  const [value, setValue] = useState(false);
  const [isBlank, setIsBlank] = useState(false);
  const [isBlankImage, setIsBlankImage] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [fileList, setFileList] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [file, setFile] = useState(false);

  useEffect(() => {
    dispatch(getSpotlightCategoryListing());
    if (Object.keys(error).length > 0) {
      dispatch(setInitialState());
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      if (Object.keys(isSuccess).length > 0
        && typeof isSuccess.message !== 'undefined') {
        toast.success(`${isSuccess.message}`, {
          toastId: 'success',
          autoClose: 1000
        })
      }
      setTimeout(() => {
        dispatch(getSpotlightListing({ history: 1 }));
        dispatch(setInitialState());
        setFileList([]);
        setFile(false);
        setImagePreviewUrl('');
        reset();
        setValue(false);
      }, 2000);
    }
  }, [isSuccess]);


  const [idCategory, setIdCategory] = useState(false);
  const [idCatError, setidCatError] = useState(false);
  const onSubmit = async (fdata) => {
    if (!idCategory) {
      setidCatError(true);
      return false;
    } else {
      setidCatError(false);
    }

    if (fileList.length === 0) {
      setIsBlankImage(true);
      return false;
    } else {
      setIsBlankImage(false);
    }
    // console.log('value',value);
    // return false;
    if (!value || value === '' || value === '<p><br></p>') {
      setIsBlank(true);
      return false;
    } else {
      setIsBlank(false);
    }

    let comments = fdata.comments;
    let title = fdata.title;

    var formdata = new FormData();
    formdata.append("title", title);
    formdata.append("post", '');
    formdata.append("id_category", idCategory);
    formdata.append("comments", comments);
    formdata.append("description", value);
    formdata.append("thumbnail", file);
    fileList.forEach((file) => {
      formdata.append('thumbnails[]', file.originFileObj);
    });
    dispatch(getSpotlightAdd(formdata));
  }


  const props = {
    multiple: true,
    onChange(file) {
      setIsBlankImage(false);
      setFileList([...file.fileList]);
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      return false;
    },
    fileList,
  };

  const [optionList, setoptionList] = useState([]);
  useEffect(() => {
    let optionsArr = []
    if (Object.keys(spotlightCatgoryListing).length > 0
      && spotlightCatgoryListing.data.length > 0) {
      spotlightCatgoryListing.data.map((item) => {
        optionsArr.push({
          value: item.id,
          label: item.title
        });
      });
    }
    setoptionList(optionsArr);
  }, [spotlightCatgoryListing])

  const styles = {
    menuList: (base) => ({
      ...base,
      "::-webkit-scrollbar": {
        width: "5px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1"
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888"
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555"
      }
    })
  }

  return (
    <div className="layout-px-spacing">
      <div className="row layout-spacing pt-4">
        <div className="col-lg-12 layout-spacing">
          <Cards
            heading=" Spotlights Submission"
            Para={<>Highlight your company's latest updates, accomplishments, and significant milestones. Share descriptions of these events along with high-resolution images to showcase our achievements.
              <br />
              <ul>
                <li>Unique cargo handling</li>
                <li>Milestones achieved.</li>
                <li>Attending/Participating in Automotive Logistics events</li>
                <li>Management updates/Leadership team updates</li>
                <li>New Ventures</li>
              </ul>

              Your valuable news will be featured on SR7 dashboard, LinkedIn page, email
              newsletter and other social media platforms to create brand among other SR7
              Network and global audience.
            </>}
          />
        </div>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {isLoading &&
            <div className="spin-loader-submission">
              <RotatingLines
                strokeColor="#FF6700"
                strokeWidth="5"
                animationDuration="0.75"
                width="70"
                visible={true}
              />
            </div>
          }
          <div className='col-xl-12 col-lg-4 col-md-12 col-12 col-sm-12'>
            <div className='widget-content widget-content-area'>
              <div className='widget-header'>
                <div className="row">
                  {/* <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                    <h4 className='annualTitles'> Spotlights Submission</h4><br />
                  </div> */}

                </div>
              </div>
              <div className="w-100">
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label className='mb-2'>Title  <span style={{ color: "red" }}> *</span></label>
                    <input type="text" className="form-control"
                      placeholder='Title'
                      {...register("title", {
                        required: "Title should not be empty"
                      })} />
                    {Object.keys(error).length > 0 &&
                      Object.keys(error.error).length > 0 &&
                      error.error.title.length > 0 &&
                      <span className="error d-block">{error.error.title[0]}</span>
                    }
                    {errors.title && <span className="error d-block">{errors.title.message}</span>}
                  </div>
                  <div className="col-lg-6">
                    <label className='mb-2'>Category  <span style={{ color: "red" }}> *</span></label>
                    <Select
                      styles={styles}
                      options={optionList}
                      isSearchable={true}
                      onChange={(value) => {
                        setIdCategory(value.value);
                        setidCatError(false);
                      }}
                    />

                    {idCatError &&
                      <span className="error d-block">
                        Category should not be empty
                      </span>
                    }
                  </div>
                </div>
                <div className="form-group row">

                  <div className="col-lg-12">
                    <label className='mb-2'>Upload a File  <span style={{ color: "red" }}> *</span></label>
                    <br />
                    <Upload {...props}
                      defaultFileList={[...fileList]}
                      listType="picture"
                      className="upload-list-inline"
                    >
                      <Button icon={<UploadOutlined />}>Upload here</Button>
                    </Upload>
                    {isBlankImage && <span className="error d-block">Image should not be empty</span>}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <div className="form-group row">
                      <label className='mb-2'>Description  <span style={{ color: "red" }}> *</span></label>
                      <div className="col-lg-12 col-sm-12">
                        <ReactQuill
                          required
                          theme="snow"
                          value={value}
                          onChange={(e) => {
                            setValue(e)
                            setIsBlank(false);
                          }}
                          placeholder='Type Your Description'
                        />
                        {isBlank && <span className="error d-block">Description should not be empty</span>}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <label className='mb-2'>Additional Comments to Team</label>
                    <div className="input-group">
                      <textarea className="form-control" style={{ height: "4.75rem" }}
                        {...register("comments", {
                          required: false,
                        })}>
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="widget-footer text-right">
                <button type="submit" className="btn readmorebtn text-white mr-2">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
      <div className='col-xl-12 col-lg-6 col-md-12 col-sm-12 col-12 layout-spacing'>
        <div className='widgetNoPad widget-table-one'>
          <div className="col-xl-12 col-md-12 col-sm-12 col-12">
            <h4 style={{ textAlign: "center", color: "white", backgroundColor: "#FF6700", padding: "20px" }}>Submission History</h4><br />
          </div>
          <div className='widget-content' style={{ padding: "20px" }}>
            <div className="row">
              <SpotlightListing spot={"sub"} />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default TalaSpotlights
