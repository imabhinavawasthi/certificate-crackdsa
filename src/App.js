import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { Helmet } from 'react-helmet-async'
import Signup from "./components/auth/Signup.jsx"
import ResetPassword from "./components/auth/ResetPassword.jsx"
import ForgotPassword from "./components/auth/ForgotPassword.jsx"
import Home from './components/Home'
import PreLaunch from './components/PreLaunch/PreLaunch.js'
import TermsAndConditions from "./components/helpers/TermsAndConditions.jsx"
import NewHome from './components/NewHome.js';
import AllCerti from './components/Pages/AllCerti.jsx';
import DSABootcamp from './components/Programs/DSABootcamp.jsx';

const App = () => {
  const user = JSON.parse(localStorage.getItem('crackdsa-user'));
  // <Helmet>
  //   <script type="text/jsx" src="homeScript.js"></script>
  //       <script type="text/jsx" src="https://unpkg.com/pdf-lib@1.4.0" />
  //   <script type="text/jsx" src="FileSaver.js"/>
  //   <script type="text/jsx" src="https://unpkg.com/@pdf-lib/fontkit@0.0.4"/>

  //       </Helmet>
  return (
    <>
      <BrowserRouter>
        <Routes>
        {/* <Route exact path="/" element={<PreLaunch curruser={user} />} /> */}

          <Route exact path="/" element={<NewHome curruser={user} />} />
          <Route exact path="/programs" element={<AllCerti curruser={user} />} />
          <Route exact path="/program/dsa-bootcamp" element={<DSABootcamp curruser={user} />} />
          <Route exact path="/auth" element={<Signup />} />
          <Route exact path="/auth/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/auth/resetpassword/:email" element={<ResetPassword />} />
          <Route exact path="/terms&conditions" element={<TermsAndConditions />} />
          <Route exact path="/test" element={<Home curruser={user} />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App