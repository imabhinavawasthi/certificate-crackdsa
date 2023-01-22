import React, { useRef, useState } from 'react'
import { img } from '../assests'
import '../style.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { PDFDocument, StandardFonts, rgb, fontkit } from 'pdf-lib'
import Footer from "./Footer/Footer.jsx"

const Home = () => {
  const navigate = useNavigate()

  const curruser = JSON.parse(localStorage.getItem('crackdsa-user'));
  
  const userName = useRef();
  const submitBtn = useRef();
  let [val, setVal] = useState("");

  const handleChange = () => {
    setVal(userName.current.value);
  }

  const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    );

  //  submit name handler
  const submitHandler = () => {
    const val = capitalize(userName.current.value);

    //check if the text is empty or not
    if (val.trim() !== "") {
      // console.log(val);
      generatePDF(val);
    } else {
      userName.reportValidity();
    }
  }

  // yu
  const generatePDF = async (name) => {
    const existingPdfBytes = await fetch("./certificate1.pdf").then((res) => res.arrayBuffer()
    );




    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    // Embed our custom font in the document

    const TimesRomanItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic)


    // // get font
    // const fontBytes = await fetch("./Sanchez-Regular.ttf").then((res) =>
    //   res.arrayBuffer()
    // );
    // PDFDocument.registerFontkit(fontBytes);
    // // Embed our custom font in the document
    // const SanChezFont = await pdfDoc.embedFont(fontBytes);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];



    // Draw a string of text diagonally across the first page
    if (name.length < 17) {
      firstPage.drawText(name, {
        x: 60,
        y: 330,
        size: 58,
        font: TimesRomanItalic,
        color: rgb(0, 0, 0),
      });
    }
    else {
      firstPage.drawText(name, {
        x: 60,
        y: 330,
        size: 40,
        font: TimesRomanItalic,
        color: rgb(0, 0, 0),
      });
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    // console.log("Done creating");

    // this was for creating uri and showing in iframe

    // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    // document.getElementById("pdf").src = pdfDataUri;

    // var file = new File(
    //   [pdfBytes],
    //   "CrackDSA_Participation.pdf",
    //   {
    //     type: "application/pdf;charset=utf-8",
    //   }
    // );
    let blob = new Blob([pdfBytes], { type: "application/pdf" });
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    let fileName = 'crackDSA DSA Bootcamp Certificate.pdf';
    link.download = fileName;
    link.click();
  };
  return (

    <>
    <div style={{widht:"100%",minHeight:"10px", backgroundColor:"#055ada"}}></div>
      <div class="newsletter-subscribe">
        <div class="container p-5">
          <div class="intro">
            <h2 class="text-center">Get Your Certificate of Participation</h2>
            <p class="text-center">Hi {curruser?.name}, Welcome to <strong style={{color:"#055ada"}}>crackDSA bootcamp certification program!</strong> We are excited to offer our students the opportunity to earn a certificate upon completion of our intensive training course.</p>
          </div>
          {curruser?
        <form class="form-inline" >
        <div class="form-group"><input class="form-control" required type="text" ref={userName} name="Name" autoComplete="name" placeholder="Enter Your Name" id="name" minLength={3} maxLength={26} value={val} onChange={handleChange}/></div>
        <div class="form-group"><button class="btn btn-primary p-1" id="submitBtn" ref={submitBtn} onClick={submitHandler}>Get Certificate </button></div>
      </form>
      :
      <form class="form-inline" >    
            <div className='row'>
            <div class="form-group">
              <NavLink to="auth"><button class="btn-large btn btn-primary p-1" >Signup/Login to get Certificate </button></NavLink>
            </div>
            </div>
          </form>  
        }
          <div class="intro-about mt-5">
            <h2 class="text-center">About Us</h2>
            <p class="text-center" >Our bootcamp is designed to provide students with the knowledge and skills needed to succeed in their chosen field. Our course curriculum covers a wide range of topics, including programming languages, web development, data analysis, and more. Our instructors are industry experts with years of experience in their respective fields, and are dedicated to providing students with the best possible learning experience.
              <br />
              Upon completion of the bootcamp, students will take a comprehensive exam to test their knowledge and skills. Those who pass the exam with a passing grade will be awarded a certificate of completion, recognizing their achievement and demonstrating their proficiency in the material covered during the course.
              <br /><br />
              In addition to the certificate, our program also provides students with a number of other benefits, including:
              <br />
              *Access to a network of industry professionals<br />
              *Career support and job placement assistance<br />
              *A community of like-minded individuals to collaborate and learn with
              <br /><br />
              We are committed to helping our students succeed, and we believe that our certification program is an essential component of that success. We look forward to helping you achieve your goals and advance your career.
              <br /><br />
              Thank you for considering our crackDSA Bootcamp Certification Program. We are excited to work with you and help you reach your full potential.
              <br />
              Please contact us if you have any questions or would like to enroll in our program.</p>

          </div>
        </div>
        <Footer/>
      </div>
      
    </>
  )
}

export default Home;