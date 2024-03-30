import React, { useState, useEffect } from "react";
import talalogo from "assets/img/translogo1.png"
// import log1 from "assets/img/log4.jpg"
import log1 from "assets/img/sign8.jpg"
import "assets/css/Login.css"
import { useForm } from "react-hook-form";
import { getLogin } from "redux/Actions/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedin, setExteraRoute } from "redux/Reducers/LoggedSlice";
import { setInitialState } from "redux/Reducers/AuthenticationSlice";
import { Link, useNavigate,useSearchParams } from "react-router-dom";
import { memberProfile } from "redux/Actions/Member";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { RotatingLines } from 'react-loader-spinner';

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isSuccess,
    error,
    userData } = useSelector(state => state.authentication);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isLoggedin } = useSelector(state => state.loggedin);
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [ip, setIP] = useState('');
  const [timer, setTimer] = useState(false);
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const authMail = searchParams.get("auth_email");
    const authPassword = searchParams.get("auth_password");
    if(authMail && authPassword)
    {
      const data = {};
      data.email = authMail;
      data.password = authPassword;
      dispatch(getLogin(data));
      setSub(true);
    }
  }, [])

  useEffect(() => {
    dispatch(memberProfile());
    if (isSuccess || isLoggedin) {
      if (sub) {
        toast.success("Login Successfully!!! Welcome to SR7 Automotive", {
          toastId: 'success',
          autoClose: 2000
        });
        setSub(false);
      }
      setTimeout(() => {
        dispatch(setIsLoggedin(userData));
        dispatch(setExteraRoute('Dashboard'));
        navigate(`/dashboard`);
      }, 500);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error
      && typeof error.error !== 'undefined'
      && typeof error.minutes !== 'undefined'
    ) {
      let mt = ((parseInt(error.minutes) * 60) + parseInt(error.seconds)) / 60;
      var countDownDate = new Date(Date.now() + (mt * 60 * 1000)).getTime();
      var x = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var M = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        if(M < 10) { M = `0${M}` }

        var S = Math.floor((distance % (1000 * 60)) / 1000);
        if(S < 10) { S = `0${S}` }

        setTimer(`${M}:${S}`);

        if (distance < 0) {
          dispatch(setInitialState());
          setTimer(false);
          clearInterval(x);
        }
      }, 1000);

    }
  }, [error])

  const [sub, setSub] = useState(false);

  const onSubmit = (data) => {
    data.ip = ip;
    dispatch(getLogin(data));
    setSub(true);
  }
  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }
  return (
    <>
    {error ? <section className="login-block">
    <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="auth-box card">
              <div className="card-block login-form-box checkout-page-style">
                <div className='col-12 d-flex justify-content-center mt-4 mb-4'>
                  <img src={talalogo} className="img-fluid" style={{ width: "150px" }} />
                </div>
                {error
                  && typeof error.error !== 'undefined'
                  && <span className="error d-block">
                    {error.error} {timer && `${timer} minutes`}
                    <div className="col-12 d-flex justify-content-center mt-1"><button type="submit" class="col-4 btn bg-gradient-primary text-white " fdprocessedid="llsprm"> <a href="https://sr7automotive.com/" style={{color:'white'}}>Go Back </a></button></div>
                  </span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
       : <div className="col-xl-12 col-lg-12" style={{ margin: "20% 50%" }}>
       <RotatingLines
          strokeColor="#FF6700"
          strokeWidth="5"
          animationDuration="1.00"
          width="70"
          visible={true}
        /> 
      </div>
      }
    </>
    
  );
};

export default Signin;
