import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Layout from "layout/Adminlayout";
import { AiFillHome } from "react-icons/ai" 
import { BsFillCameraVideoFill } from "react-icons/bs"
import { TbMessageCircle2Filled } from "react-icons/tb"
import { HiDocumentText } from "react-icons/hi"
import { GiVideoConference } from "react-icons/gi"
import {
  FaBook,
  FaSearchPlus,
  FaUserTimes,
  FaDesktop,
  FaHandSpock,
  FaMicrophone,
  FaRegNewspaper,
  FaThumbsDown,
  FaUser,
  FaRegFilePdf,
  FaShareSquare,
  FaStar
} from "react-icons/fa";

const ProtectedRoutes = ({ index, component: Component, ...rest }) => {
  const sidebarroutes = [
    {
      name: "Dashboard",
      img: <AiFillHome />,
      index: 0,
      visible: false,
      link: "/dashboard",
      value1: "Dashboard"
    },
    {
      name: "Video Guide",
      img: <BsFillCameraVideoFill />,
      index: 1,
      visible: false,
      link: "/videoguide",
      value2: "videoguide"
    },
    {
      name: "Company Profile",
      img: <FaBook />,
      index: 2,
      visible: false,
      link: "/companyprofile",
      value1: "Company Profile"
    },
    {
      name: "Members Search",
      img: <FaSearchPlus />,
      index: 3,
      visible: false,
      link: "/membersearch",
      value2: "Member Search"
    },
    {
      name: "Send/View Quote",
      img: <TbMessageCircle2Filled />,
      index: 4,
      visible: false,
      link: "/sendviewquote",
      value1: "SendViewQuote"
    },
    {
      name: "Meet Members",
      img: <FaDesktop />,
      index: 5,
      visible: false,
      link: "/meetmembers",
      value1: "Meet Members"
    },
    {
      name: "SR7 Spotlights",
      img: <FaStar />,
      index: 6,
      visible: false,
      link: "/sr7spotlights",
      value2: "SR7 Spotlights"
    },
    {
      name: "Announcements",
      img: <FaMicrophone />,
      index: 7,
      visible: false,
      link: "/announcements",
      value1: "Announcements"
    },
    {
      name: "Documents",
      img: <HiDocumentText />,
      index: 8,
      visible: false,
      link: "/documents",
      value2: "Documents"

    },
    // {
    //   name: "Financial Protection",
    //   img: <FaRegNewspaper />,
    //   index: 9,
    //   visible: false,
    //   link: "/financialprotection",
    //   value1: "Financial Protection"
    // },
    {
      name: "Resolution Center",
      img: <FaRegNewspaper />,
      index: 10,
      visible: false,
      link: "/resolutionCenter",
      value1: "Resolution Center"
    },
    {
      name: "Monthly Report",
      img: <FaRegFilePdf />,
      index: 11,
      visible: false,
      link: "/monthlyreport",
      value2: "Monthly Report"
    },
    {
      name: " Spotlights Submission",
      img: <FaShareSquare />,
      index: 12,
      visible: false,
      link: "/spotlightsubmission",
      value1: " Spotlights Submission"
    },
    {
      name: "Annual Conference",
      img: <GiVideoConference />,
      index: 13,
      visible: false,
      link: "/annualconference",
      value2: "Annual Conference"
    },
    {
      name: "Events & Exhibitions",
      img: <FaBook />,
      index: 14,
      visible: false,
      link: "/exhibitions",
      value1: "Exhibitions"
    },
    {
      name: "Members Expiry",
      img: <FaUserTimes />,
      index: 15,
      visible: false,
      link: "/memberexpiry",
      value2: "Member Expiry"
    },
    // {
    //   name: "Hall of Shame",
    //   img: <FaThumbsDown />,
    //   index: 16,
    //   visible: false,
    //   link: "/hallofshame",
    //   value2: "Hall of Shame"
    // },
    {
      name: "Departed Members",
      img: <FaUser />,
      index: 17,
      visible: false,
      link: "/departedmembers",
      value1: "Departed Members"
    }        
  ];
  const { isLoggedin } = useSelector(state => state.loggedin);
  return (
    isLoggedin ?
      <>
        <Layout routeIndex={index}>
          <Component {...rest} routeIndex={index} sidebarroutes={sidebarroutes} />
        </Layout>
      </>
      : <Navigate to="/" />
  )
}

export default ProtectedRoutes;