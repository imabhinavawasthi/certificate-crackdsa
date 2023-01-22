import React, { useState } from "react";
import registerpic from "./register.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope, faUniversity, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import "./signup.css"
import log from "./log.svg"
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router';
import * as api from "../../axios.js"

const Signup = (props) => {
  const navigate=useNavigate()
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

  const curruser = JSON.parse(localStorage.getItem('crackdsa-user'));

  if(curruser){
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
  const signup = async (e) => {
    e.preventDefault();

    setInfomess("Registering User...")
    if (!name || !email || !password || !college) {
      setErrormess("Please fill all the fields")
      setInfomess()
      return;
    }
    if (password.length < 6) {
      setErrormess("Passsword should contain atleast 6 characters");
      setInfomess()
      return;
    }
    if (isValidEmail(email) == false) {
      setErrormess("Enter Valid Email");
      setInfomess()
      return;
    }
    ress = await api.userRegister({ name: name, email: email, password: password, college: college, verified: false });
    if (ress.data.message == "user already exists") {
      setInfomess("User Already Exists, Please Login");
      return;
    }
    else if(ress.data.message=="user registered"){
      // console.log(ress);
    setInfomess();
    setErrormess();
    setInfomess("Sending Email Verification OTP.")
    let res2 = await api.sendOTP({ email: email, name:name });
    setInfomess();
    setSignupOtpPage(true);
    setVermess(email);
    }
    
  }

  const verifysignupOTP = async (e) => {
    e.preventDefault();
    if (!signupotp) {
      setErrormess("Please Enter OTP");
      return;
    }
    else {
      setInfomess("Verifying OTP...")
      let otpres = await api.verifyOTP({ email: email, OTP: signupotp });

      if (otpres.data.message == "wrong otp") {
        setErrormess("Wrong OTP");
        setInfomess("")
      }
      else {
        setInfomess("")
        setSuccessmess("Successfully Verified, Welcome to crackDSA!")
        setTimeout(() => {
          setSuccessmess("Taking you in...")
        }, 1000);
        let resl = await api.userLogin({ email: email, password: password });
        localStorage.setItem("crackdsa-user", JSON.stringify(resl.data))
        setTimeout(() => {
          window.location.reload()
        }, 1000);

      }
    }
  }
  const login = async (e) => {
    e.preventDefault();
    setLogInfomess("Logging You In...")
    if (!logemail || !logpassword) {
      setLogErrormess("Please fill all the fields")
      setLogInfomess()
      return;
    }
    if (isValidEmail(logemail) == false) {
      setLogErrormess("Enter Valid Email");
      setLogInfomess()
      return;
    }
    console.log(logemail," ",logpassword);
    let resl = await api.userLogin({ email: logemail, password: logpassword });
    if (resl.data.message == "wrong email or password") {
      setLogInfomess("Oops! Wrong Email or Password");
      return;
    }
    else if (resl.data.message == "email not verified") {

      setLogErrormess();
      setLogInfomess("Sending Email Verification OTP...")
      let otpsendres = await api.sendOTP({ email: logemail,name:logemail });
      setLogInfomess();
      setLogVermess(logemail);
      setLoginOtpPage(true);
      return;
    }
    else if (resl.data.message == "user not exists") {
      setLogInfomess("User Doesn't Exists");
      return;
    }
    else {
      setLogInfomess();
      setLogSuccessmess("You are logged in!")
      setSuccessmess("You are welcome :)")
      localStorage.setItem("crackdsa-user", JSON.stringify(resl.data))
      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
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
        setLogSuccessmess("Successfully Verified, taking you in...")
        let resl = await api.userLogin({ email: logemail, password: logpassword });
        localStorage.setItem("crackdsa-user", JSON.stringify(resl.data))
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      }
    }
  }
  return (
    <div>
      <div className={isActive ? "containerr sign-up-mode" : "containerr"}>
        <div className="forms-container">
          <div className="signin-signup">
            {loginOtpPage ? 
            <>
              <form className="sign-in-form">
                <h2 className="title">Verify Email</h2>
                {logerrormess && (<>
                  <div className="error-mess" >{logerrormess}</div>
                </>)}
                {(logvermess && !logsuccessmess) && (
                  <>
                    <div className="ver-mess">
                      <p>Your email is not verified</p>
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
                {!logsuccessmess&&<>
                <div style={{ display: "none" }} className="input-field">
                  <i>
                    <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                  </i>
                  <input
                    onChange={(e) => { setLoginotp(e.target.value); setLogErrormess(); setLogInfomess(); }}
                    type="number"
                    placeholder="Enter OTP (Check Email)"
                    autoComplete="off"
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
                    autoComplete="off"
                  />
                </div>
                <input
                  onClick={verifyloginOTP}
                  type="submit"
                  value="Enter"
                  className="btn solid "
                />
                </>}
              </form>
            </> : <>
              <form className="sign-in-form">
                <h2 className="title">Log in</h2>
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
                {!logsuccessmess&&<>
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
                <div className="input-field">
                  <i>
                    <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                  </i>
                  <input
                    onChange={(e) => { setLogPassword(e.target.value); setLogErrormess(); setLogInfomess(); }}
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <p className="for-pass">
                  <span style={{color:"black"}}>Forgot Password?</span> <NavLink className="nav-col" style={{textDecoration:"none"}} to="/auth/forgotpassword">Reset Now!</NavLink>
                </p>
                <input
                  onClick={login}
                  type="submit"
                  value="Login"
                  className="btn solid "
                />
                </>}
                {/* <p className="social-text for-pass">Or Sign in with social platforms</p>
              <div className="social-media">
                <button
                  onClick={SignInWithFirebase}
                  className="social-icon googlebutton"
                >
                  <i>
                    <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                  </i>
                </button>
                <a href="#" class="social-icon">
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="#" class="social-icon">
                  <i class="fab fa-google"></i>
                </a>
                <button
                  onClick={SignInWithGithub}
                  className="social-icon googlebutton"
                >
                  <i>
                    <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
                  </i>
                </button>
              </div> */}
              </form>
            </>}

            {(
              <>
                {signupOtpPage ? <>
                  <form id="signup-form" className="sign-up-form">
                    <h2 className="title">Enter OTP</h2>
                    {errormess && <div className="error-mess">{errormess}</div>}
                    {infomess && <div className="info-mess">{infomess}</div>}
                    {successmess && <>
                      <div className="success-mess">
                        {successmess}
                      </div>
                    </>}
                    {(vermess && !successmess) && (
                      <>
                        <form className="sign-up-form">
                          <div className="ver-mess">
                            <p>An email verification <strong>OTP</strong> has been sent to</p>
                            <strong>{vermess}</strong>
                            <p>Verify Your Email</p>
                          </div>
                        </form>
                      </>
                    )}
                    {!successmess&&<>
                      <div className="input-field">
                      <i>
                        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                      </i>
                      <input
                        onChange={(e) => { setSignupotp(e.target.value); setErrormess(); setInfomess(); }}
                        type="number"
                        placeholder="Enter OTP (Check Email)"
                      />
                    </div>

                    <input
                      type="submit"
                      className="btn"
                      value="Sign up"
                      onClick={verifysignupOTP}
                    />
                      </>}
                    {/* <p className="social-text">
                    Or Sign up with social platforms
                  </p>
                  <div className="social-media">
                    <button
                      onClick={SignInWithFirebase}
                      className="social-icon googlebutton"
                    >
                      <i>
                        <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                      </i>
                    </button>
                    <a href="#" class="social-icon">
                  <i class="fab fa-twitter"></i>
                </a>
                    <a href="#" class="social-icon">
                  <i class="fab fa-google"></i>
                </a>
                    <a
                      onClick={SignInWithGithub}
                      className="social-icon googlebutton"
                    >
                      <i>
                        <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
                      </i>
                    </a>
                  </div> */}
                  </form>
                </> : <>
                  <form id="signup-form" className="sign-up-form">
                    <h2 className="title">Sign up</h2>
                    {errormess && <div className="error-mess">{errormess}</div>}
                    {infomess && <div className="info-mess">{infomess}</div>}
                    {successmess && <>
                      <div className="success-mess">
                        {successmess}
                      </div>
                    </>}
                    {!successmess&&<>
                    <div className="input-field">
                      <i>
                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                      </i>
                      <input
                        onChange={(e) => { setName(e.target.value); setErrormess(); setInfomess(); }}
                        type="text"
                        placeholder="Name"
                      />
                    </div>
                    <div className="input-field">
                      <i>
                        <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                      </i>
                      <input
                        onChange={(e) => { setEmail(e.target.value); setErrormess(); setInfomess(); }}
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="input-field">
                      <i>
                        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                      </i>
                      <input
                        onChange={(e) => { setPassword(e.target.value); setErrormess(); setInfomess(); }}
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                    <div className="input-field">
                      <i>
                        <FontAwesomeIcon icon={faUniversity}></FontAwesomeIcon>
                      </i>
                      <input
                        onChange={(e) => { setCollege(e.target.value); setErrormess(); setInfomess(); }}
                        type="text"
                        placeholder="College"
                      />
                    </div>
                    <input
                      type="submit"
                      className="btn"
                      value="Verify Email"
                      onClick={signup}
                    />
                    </>}
                    {/* <p className="social-text">
                    Or Sign up with social platforms
                  </p>
                  <div className="social-media">
                    <button
                      onClick={SignInWithFirebase}
                      className="social-icon googlebutton"
                    >
                      <i>
                        <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                      </i>
                    </button>
                    <a href="#" class="social-icon">
                  <i class="fab fa-twitter"></i>
                </a>
                    <a href="#" class="social-icon">
                  <i class="fab fa-google"></i>
                </a>
                    <a
                      onClick={SignInWithGithub}
                      className="social-icon googlebutton"
                    >
                      <i>
                        <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
                      </i>
                    </a>
                  </div> */}
                  </form>
                </>}
              </>
            )}
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Events crackDSA.com</h3>
              <p>
                New Here? Register Now!
              </p>
              <button
                onClick={changeauth}
                className="btn transparent"
                id="sign-up-btn"
              >
                Sign up
              </button>
            </div>
            <img src={log} className="image" alt="img" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Events crackDSA.com</h3>
              <p>
                One of us? Login Now!
              </p>
              <button
                onClick={changeauth}
                className="btn transparent"
                id="sign-in-btn"
              >
                Sign in
              </button>
            </div>
            <img src={registerpic} className="image" alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
