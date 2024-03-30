import React, { useEffect, useState } from 'react';
import BoldHeading from 'components/BoldHeading/BoldHeading';
import { setExteraRoute } from "redux/Reducers/LoggedSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { BiRefresh } from "react-icons/bi";
import { Select } from 'antd';
import "assets/css/Search.css";
import {
  companyList,
  companyListParms
} from "redux/Actions/Company";
import {
  setInitialListParms
} from "redux/Reducers/CompanySlice";
import {
  loctaionsCountryList,
  loctaionsRegionList,
  memberSearch,
  companySearchBranches
} from "redux/Actions/Member";
import {
  setForSearchInit,
  setInitialState,
  setCountryList,
  setForSearch
} from 'redux/Reducers/MemberSlice';

const SearchBox = ({ heading, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    companyListData,
    ListParms
  } = useSelector(state => state.company);
  const {
    forSearch,
    regionList,
    countryList,
  } = useSelector(state => state.member);

  useEffect(() => {
    if (type === 'dashboard' && Object.keys(forSearch).length > 0) {
      dispatch(setExteraRoute('Members Search'));
      navigate('/membersearch');
    }
  }, [forSearch])

  useEffect(() => {
    if (Object.keys(companyListData).length === 0) {
      dispatch(companyList());
    }
    if (Object.keys(regionList).length === 0) {
      dispatch(loctaionsRegionList({}));
    }
    dispatch(setCountryList());
    window.scrollTo(0, 0);
  }, []);

  const [value, setValue] = useState({});
  const [searchLicensees, setSearchLicensees] = useState([]);
  const [searchContinent, setSearchContinent] = useState([]);
  const [searchCountry, setSearchCountry] = useState([]);

  useEffect(() => {
    let region = [];
    if (Object.keys(regionList).length > 0
      && regionList.data.length) {
      regionList.data.map(item => {
        region.push({
          value: item,
          label: item,
        })
      })  
    }
    setSearchContinent(region);

  }, [regionList])

  useEffect(() => {
    let company = [];
    if (Object.keys(ListParms).length > 0
      && ListParms.data.length > 0) {
      ListParms.data.map(item => {
        company.push({
          value: item.company_name,
          label: item.company_name
        })
      })
    } else if (Object.keys(companyListData).length > 0
      && companyListData.data.length > 0) {
      companyListData.data.map(item => {
        company.push({
          value: item.company_name,
          label: item.company_name
        })
      })
    }
    setSearchLicensees(company);
  }, [companyListData, ListParms])

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
    setSearchCountry(country);
  }, [countryList]);


  useEffect(() => {
    if (Object.keys(value).length > 0 && value.name === 'region') {
      dispatch(loctaionsCountryList({ region: value.value }));
    }
  }, [value])

  const ResetSearch = () => {
    dispatch(setInitialListParms());
    dispatch(setForSearchInit());
  }


  useEffect(() => {
    localStorage.setItem('city',0);
    localStorage.setItem('latlng',0);
    localStorage.setItem('region',"");
  }, [])

  const handleOnChange = (value, name) => {
    if(name == 'region' &&  typeof value !== 'undefined')
    {
      let latlng = 0;
      if(value == 'Africa')
      {
        latlng = {lat:8.7832,lng:34.5085};
      
      }
      else if(value == 'Asia')
      {
        latlng = {lat:34.0479,lng:100.6197};
      
      }
      else if(value == 'Europe')
      {
        latlng = {lat:54.5260,lng:15.2551};
      
      }
      else if(value == 'North America')
      {
        latlng = {lat:40.69754,lng:-74.3093276};
      
      }
      else if(value == 'Oceania')
      {
        latlng = {lat:-37.7444067,lng:139.4002296};
      
      }
      else if(value == 'South America')
      {
        latlng = {lat:-19.7654386,lng:-61.9980672};
      
      }
       localStorage.setItem('latlng', JSON.stringify(latlng));
       localStorage.setItem('city',0);
       localStorage.setItem('region', value);
    }
    else if(name == "company_name" )
    {
      localStorage.setItem('latlng',0);
      typeof value !== 'undefined' ? localStorage.setItem('city','company') : localStorage.setItem('city',0);
      localStorage.setItem('region',"");
    } 
    else if(name == 'country' && typeof value === 'undefined' || name == 'region' &&  typeof value === 'undefined')
    {
      localStorage.setItem('city',0);
      if(name == 'country')
      {
        let newRegion = localStorage.getItem('region');
        dispatch(setForSearch({"region":newRegion }));
        return;
      }
      else
      {
        localStorage.setItem('latlng',0);
        localStorage.setItem('region',"");
      }
      
    }
    else if(name == 'country' && typeof value !== 'undefined')
    {
      localStorage.setItem('city',value);
    }

    if (typeof value !== 'undefined') {
      let fvalue = value;
      let newRegion = localStorage.getItem('region');
      if(newRegion && name == "country" && typeof newRegion !== 'undefined')
      {
        dispatch(setForSearch({ [name]: fvalue,"region":newRegion }));
      }
      else
      {
        dispatch(setForSearch({ [name]: fvalue }));
      }
      
    } else {
      dispatch(setForSearch({}));
    }
    if (typeof value !== 'undefined' && name === 'region') {
      dispatch(companyListParms({ continent: value }));
    }
    if (typeof value === 'undefined' && name === 'region') {
      dispatch(setInitialListParms());
    }
    
  }

  useEffect(() => {
    if (Object.keys(forSearch).length > 0) {
      dispatch(memberSearch(forSearch))
      dispatch(companySearchBranches(forSearch))
    } else {
      dispatch(setInitialState());
      dispatch(companySearchBranches({}))
    }
  }, [forSearch]);


  return (
    <>
      <div className="">
        <div className="widget-header">
          <div className="row">
            <div className="memberHeader col-xl-12 col-md-12 col-sm-12 col-12">
              <div className="widget-header">
                <BoldHeading
                  Boldheading={heading}
                />
              </div>
              <br />
            </div>
          </div>
        </div>
        <div className="card-box">
          <div className="col-12 col-md-12 d-flex flex-md-column flex-xl-row flex-lg-row flex-column justify-content-between gap-2">
            <div className='col-12 col-md-12 col-xl-4 col-lg-4 d-flex justify-content-start filtered-list-search'>
              <Select
                allowClear
                showSearch
                value={forSearch['company_name']}
                style={{ width: "100%" }}
                placeholder={"Search Members"}
                optionFilterProp={"children"}
                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={searchLicensees}
                className={"searchAntd"}
                onChange={(value) => {
                  handleOnChange(value, 'company_name');
                }}
              />
            </div>
            <div className='col-12 col-md-12 col-xl-3 col-lg-3 d-flex contact-options'>
              <Select
                allowClear
                showSearch
                value={forSearch["region"]}
                style={{ width: "100%" }}
                placeholder={"Search Continent"}
                optionFilterProp={"children"}
                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                // filterSort={(optionA, optionB) =>
                //   (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                // }
                options={searchContinent}
                onChange={(value) => {
                  handleOnChange(value, "region");
                  setValue({ name: "region", value: value })
                }}
              />
            </div>
            <div className='col-12  col-md-12 col-xl-3 col-lg-3 d-flex contact-options'>
              <Select
                allowClear
                showSearch
                value={forSearch["country"]}
                style={{ width: "100%" }}
                placeholder={"Search Country"}
                optionFilterProp={"children"}
                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={searchCountry}
                onChange={(value) => {
                  handleOnChange(value, "country");
                }}
                notFoundContent="Select Continent First"
              />
            </div>
            <div className="col-md-2 col-xl-2 col-lg-2 btn btn-sm btn-primaryss" onClick={() => ResetSearch()}>
              <div className='mt-1' >
                <i className="las la-arrow-left">
                  <BiRefresh style={{ fontSize: "20px" }} />
                </i>
                <span className='mt-2'>Reset</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBox