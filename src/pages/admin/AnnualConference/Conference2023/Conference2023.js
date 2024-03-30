import React, { useRef, useEffect, useState } from 'react'
import KeyPoints from '../KeyPoints/KeyPoints'
import OurPartners from '../OurPartners/OurPartners'
import ListAttendence from '../ListAttendence/ListAttendence'
import AnnualConference2023 from './AnnualConference2023/AnnualConference2023'
import {
    getSponsersList,
    getAttendeeList,
    getKeyEventsList
} from "redux/Actions/AnnualConference"
import { useDispatch, useSelector } from 'react-redux';
import "../../../../assets/css/AnnualConference/AnnualConference.css"
import { Link } from 'react-router-dom'
import { BsArrowLeftShort } from "react-icons/bs";

const Conference2023 = () => {
    const dispatch = useDispatch();
    const [sponser, setSpomser] = useState('');
    useEffect(() => {
        dispatch(getAttendeeList());
        dispatch(getSponsersList());
        dispatch(getKeyEventsList());
        window.scrollTo(0, 0);
    }, [])
    const {
        sponsersList,
        attendeeList,
        keyEventsList } = useSelector(state => state.annualconference);
    const scrollRef = useRef(null);

    return (
        <>
            <div className="col-xl-12 col-lg-12 align-self-center w-100 mt-4">
                <Link to="/annualconference">
                    <div className="btn btn-sm readmorebtn text-white p-1">
                        <i className="las la-arrow-left">
                            <BsArrowLeftShort />
                        </i>
                        Back &nbsp;
                    </div>
                </Link>
            </div>
            <div className="layout-px-spacing" >
                <div className="row layout-spacing pt-4">
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4'>
                        <div className='widget-content widget-content-area'
                            style={{ marginBottom: "25px", padding: "10px 20px" }}>
                            <AnnualConference2023 />
                        </div>
                        <div className='widget-content widget-content-area' style={{ marginBottom: "25px" }}>
                            <KeyPoints keyEventsList={keyEventsList} />
                        </div>
                        <div className='widget-content widget-content-area' style={{ marginBottom: "25px" }}>
                            <OurPartners
                                scrollRef={scrollRef}
                                sponsersList={sponsersList}
                                setSpomser={setSpomser}
                            />
                        </div>
                        <div className='widget-content widget-content-area' style={{ marginBottom: "25px" }}>
                            <ListAttendence attendeeList={attendeeList} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Conference2023