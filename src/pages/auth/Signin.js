import React, { useState, useEffect } from "react";
import talalogo from "assets/img/translogo1.png"
// import log1 from "assets/img/log4.jpg"
import log1 from "assets/img/sign8.png"
import "assets/css/Login.css"
import { useForm } from "react-hook-form";
import { getLogin } from "redux/Actions/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedin, setExteraRoute } from "redux/Reducers/LoggedSlice";
import { setInitialState } from "redux/Reducers/AuthenticationSlice";
import { Link, useNavigate } from "react-router-dom";
import { memberProfile } from "redux/Actions/Member";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    dispatch(memberProfile());
    if (isSuccess || isLoggedin) {
      if (sub) {
        toast.success("Login Successfully!!! Welcome to SR7 Ship Spares", {
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
    <section className="login-block">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="auth-box card">
              <div className="card-block login-form-box checkout-page-style">
                <div className='col-12 d-flex justify-content-center mt-4 mb-4'>
                  <img src={talalogo} className="img-fluid" style={{ width: "150px" }} />
                </div>
                <h3 className="mb-30 mt-4" style={{ fontSize: "20px", color: "#515365", fontWeight: "700" }}>Login</h3>
                {error
                  && typeof error.error !== 'undefined'
                  && <span className="error d-block">
                    {error.error} {timer && `${timer} minutes`}
                  </span>
                }
                <form className="login-form mt-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-box mb-4">
                    <div className="d-flex">
                      <input
                        type="text"
                        placeholder="Email"
                        className='col-12'
                        {...register("email", {
                          onChange: (e) => { dispatch(setInitialState()); },
                          required: "Email should not be empty",
                        })}
                      />
                    </div>
                    <div>
                      {errors.username && <span className="error d-block">{errors.username.message}</span>}
                    </div>
                  </div>
                  <div className="d-flex flex-column input-box mb-4">
                    <div className="d-flex">
                      <input
                        type={type}
                        placeholder="Password"
                        className="col-12"
                        name="password"
                        {...register("password", {
                          onChange: (e) => { dispatch(setInitialState()); },
                          required: "Password should not be empty",
                        })}
                      />
                      <span className="d-flex align-items-center" onClick={handleToggle} style={{ justifyContent: "right" }}>
                        <Icon className="d-flex mr-10" icon={icon} size={25}
                          style={{ position: "absolute", width: "3%", color: "#094D72", marginRight: "2%" }}
                        />
                      </span>
                    </div>
                    <div>
                      {errors.password && <span className="error d-block">{errors.password.message}</span>}
                    </div>
                  </div>
                  <div className="boxCheck">
                    <input id="one" type="checkbox" {...register("remember", {
                      required: false,
                    })} />
                    <span className="check"></span>
                    <label htmlFor="one" className='px-2'>Remember me</label>
                  </div>
                  <div className="col-12 d-flex justify-content-center mt-4">
                    <button type="submit" className="col-6 btn bg-gradient-primary text-white "> Login </button>
                  </div>
                  <div className="input-box forget col-12 d-flex justify-content-center mt-3">
                    <span className="lost-password" style={{ cursor: "pointer" }} >
                      <Link to="forgot-password"> Forgot Your Password?</Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Signin;
