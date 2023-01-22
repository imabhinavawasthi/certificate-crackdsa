import React, { useState } from "react";
import registerpic from "./register.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope, faUniversity, faLockOpen,faAnchorLock } from "@fortawesome/free-solid-svg-icons";
import "./signup.css"
import log from "./log.svg"
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router';
import * as api from "../../axios.js"

const Signup = (props) => {
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState();
  const [logemail, setLogEmail] = useState();
  const [usercred, setUserCred] = useState();
  const [password, setPassword] = useState();
  const [logpassword, setLogPassword] = useState();
  const [name, setName] = useState();
  const [errormess, setErrormess] = useState();
  const [logerrormess, setLogErrormess] = useState();
  const [errortmess, setErrortmess] = useState();
  const [infomess, setInfomess] = useState();
  const [loginfomess, setLogInfomess] = useState();
  const [vermess, setVermess] = useState();
  const [logvermess, setLogVermess] = useState();
  const [logsuccessmess, setLogSuccessmess] = useState();
  const [successmess, setSuccessmess] = useState();
  const [college, setCollege] = useState();
  const [signupOtpPage, setSignupOtpPage] = useState(false);
  const [loginOtpPage, setLoginOtpPage] = useState(false);
  const [signupotp, setSignupotp] = useState();
  const [loginotp, setLoginotp] = useState();
  const [reset,setReset]=useState(false);

  const curruser = JSON.parse(localStorage.getItem('crackdsa-user'));

  if (curruser) {
    navigate("/")
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const changeauth = (e) => {
    setErrormess(); setInfomess(); setErrortmess(); setSuccessmess();
    setLogErrormess(); setLogInfomess(); setLogSuccessmess();
    setIsActive((current) => !current);
  };
  let ress;
  let resl;
  const login = async (e) => {
    e.preventDefault();
    setLogInfomess("Verifying ...")
    if (!logemail) {
      setLogErrormess("Please Enter Email!")
      setLogInfomess()
      return;
    }
    if (isValidEmail(logemail) == false) {
      setLogErrormess("Enter Valid Email");
      setLogInfomess()
      return;
    }
    resl = await api.checkUserExists({ email: logemail });
    if (resl.data.message == "user not exists") {
      setLogInfomess("User Doesn't Exists");
      return;
    }
    else {
      setLogErrormess();
      setLogInfomess("Sending Email Verification OTP...")
      let otpsendres = await api.sendOTP({ email: logemail, name: logemail });
      setLogInfomess();
      setLogVermess(logemail);
      setLoginOtpPage(true);
      return;
    }
  }
  const verifyloginOTP = async (e) => {
    e.preventDefault();
    if (!loginotp) {
      setLogErrormess("Please Enter OTP");
      return;
    }
    else {
      let otpres = await api.verifyOTP({ email: logemail, OTP: loginotp });

      if (otpres.data.message == "wrong otp") {
        setLogErrormess("Wrong OTP");
      }
      else {
        setLogSuccessmess("Successfully Verified")
        setReset(true);
        // navigate(`/auth/resetpassword/${logemail}`)
      }
    }
  }
    const [pass, setPass] = useState()
    const [conpass, setConPass] = useState()
    const [logrerrormess, setLogrErrormess] = useState();
    const [logrinfomess, setLogrInfomess] = useState();
    const [logrsuccessmess, setLogrSuccessmess] = useState();
    const resetPass = async (e) => {
        e.preventDefault()
        if (!pass || !conpass) {
            setLogrErrormess("Please fill both the fields!")
            setLogrInfomess()
            return;
        }
        else if (pass != conpass) {
            setLogrErrormess("Password doesn't match!")
            setLogrInfomess()
            return;
        }
        else {
            setLogrInfomess("Updating New Password")
            let res = await api.resetPass({ email: logemail, new_password: pass });
            if (res.data.message == "user not exists") {
                setLogrErrormess("Unauthorised Action")
                setLogrInfomess()
                return;
            }
            else {
                setLogrErrormess()
                setLogrInfomess()
                setLogrSuccessmess("done")

            }
        }
    }
  return (
    <div>
      {reset&&<>
        <div className={isActive ? "containerr sign-up-mode" : "containerr"}>
        <div className="forms-container">
          <div className="signin-signup">
          <form className="sign-in-form mt-5">
                        <h2 className="title">Reset Password</h2>
                        {logrerrormess && (<>
                            <div className="error-mess" >{logrerrormess}</div>
                        </>)}
                        {logrinfomess && <>
                            <div className="info-mess">
                                {logrinfomess}
                            </div>
                        </>}
                        {logrsuccessmess && <>
                            <div className="success-mess mt-5">
                                Password Reset Done, You Can <NavLink style={{textDecoration:"none"}} to="/auth">Login</NavLink> Now!
                            </div>
                        </>}
                        {!logrsuccessmess&&
                        <div>
                        <div className="input-field">
                            <i>
                                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                            </i>
                            <input
                                onChange={(e) => { setPass(e.target.value); setLogrErrormess(); setLogrInfomess(); }}
                                type="password"
                                placeholder="New Password"
                            />
                        </div>
                        <div className="input-field">
                            <i>
                                <FontAwesomeIcon icon={faAnchorLock}></FontAwesomeIcon>
                            </i>
                            <input
                                onChange={(e) => { setConPass(e.target.value); setLogrErrormess(); setLogrInfomess(); }}
                                type="text"
                                placeholder="Confirm Password"
                            />
                        </div>

                        <input
                            onClick={(e) => { resetPass(e) }}
                            type="submit"
                            value="Reset"
                            className="btn solid "
                        />
                        </div>
                        
                        }

                        <p className="for-pass mt-3">
                           <span style={{color:"#000"}}>Back to Login</span> <NavLink style={{ textDecoration: "none" }} className="nav-col" to="/auth">Here</NavLink>
                        </p>
                    </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Events crackDSA.com</h3>
              <p>
                Reset Your Password
              </p>
            </div>
            <img src={log} className="image" alt="img" />
          </div>
        </div>
      </div>
        
      </>}
      {!reset&&<div className={isActive ? "containerr sign-up-mode" : "containerr"}>
        <div className="forms-container">
          <div className="signin-signup">
            {loginOtpPage ? <>
              <form className="sign-in-form">
                <h2 className="title">Verify Email</h2>
                {logerrormess && (<>
                  <div className="error-mess" >{logerrormess}</div>
                </>)}
                {(logvermess && !logsuccessmess) && (
                  <>
                    <div className="ver-mess">
                      <p>An email verification <strong>OTP</strong> has been sent to</p>
                      <strong>{logvermess}</strong>
                      <p>Verify Your Email</p>
                    </div>
                  </>
                )}
                {loginfomess && <>
                  <div className="info-mess">
                    {loginfomess}
                  </div>
                </>}
                {logsuccessmess && <>
                  <div className="success-mess">
                    {logsuccessmess}
                  </div>
                </>}
                <div style={{ display: "none" }} className="input-field">
                  <i>
                    <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                  </i>
                  <input
                    onChange={(e) => { setLoginotp(e.target.value); setLogErrormess(); setLogInfomess(); }}
                    type="number"
                    placeholder="Enter OTP (Check Email)"
                  />
                </div>
                <div className="input-field">
                  <i>
                    <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                  </i>
                  <input
                    onChange={(e) => { setLoginotp(e.target.value); setLogErrormess(); setLogInfomess(); }}
                    type="number"
                    placeholder="Enter OTP (Check Email)"
                  />
                </div>
                <input
                  onClick={verifyloginOTP}
                  type="submit"
                  value="Next"
                  className="btn solid "
                />
              </form>
            </> : <>
              <form className="sign-in-form">
                <h2 className="title">Reset Password</h2>
                {logerrormess && (<>
                  <div className="error-mess" >{logerrormess}</div>
                </>)}
                {loginfomess && <>
                  <div className="info-mess">
                    {loginfomess}
                  </div>
                </>}
                {logsuccessmess && <>
                  <div className="success-mess">
                    {logsuccessmess}
                  </div>
                </>}
                <div className="input-field">
                  <i>
                    <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                  </i>
                  <input
                    onChange={(e) => { setLogEmail(e.target.value); setLogErrormess(); setLogInfomess(); }}
                    type="email"
                    placeholder="Email"
                  />
                </div>

                <input
                  onClick={login}
                  type="submit"
                  value="Verify Email"
                  className="btn solid "
                />

                <p className="for-pass mt-3">
                <span style={{color:"#000"}}>Back to Login</span> <NavLink style={{ textDecoration: "none" }} className="nav-col" to="/auth">Here</NavLink>
                </p>
              </form>
            </>}
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Events crackDSA.com</h3>
              <p>
                Reset Your Password
              </p>
            </div>
            <img src={log} className="image" alt="img" />
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Signup;
