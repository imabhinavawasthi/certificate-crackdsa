import React,{useRef,useState} from 'react'

import {img} from '../assests'
import '../style.css';
import { PDFDocument, rgb,fontkit} from 'pdf-lib'


const Home = () => {
  const userName = useRef();
  const submitBtn = useRef();
  let [val,setVal] = useState("");
  
const handleChange = ()=>{

  setVal(userName.current.value);
}

const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

  //  submit name handler
  const submitHandler=()=>{
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
  const existingPdfBytes = await fetch("./cert.pdf").then((res) =>res.arrayBuffer()
  );


  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  // const fontBytes = await fetch("./Sanchez-Regular.ttf").then((res) =>
  //   res.arrayBuffer()
  // );
  // PDFDocument.registerFontkit(fontBytes);
  // Embed our custom font in the document
  // const SanChezFont = await pdfDoc.embedFont(fontBytes);
  
  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: 180,
    y: 270,
    size: 58,
    // font: SanChezFont,
    color: rgb(0, 0, 0),
  });

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
  let blob = new Blob([pdfBytes], {type: "application/pdf"});
  let link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  let fileName = 'CrackDSA_Participation.pdf';
  link.download = fileName;
  link.click();
};
  return (
    <>
      <header>
    <img src={img} alt="CrackDSA logo" />
    <h4>Get Your Certificate of Participation to</h4>
    <h3 className="front">crackDSA Event</h3>
    
  </header>
  <main>
    <label htmlFor="name">Type Your Name</label>
    <input required type="text" ref={userName} name="Name" autoComplete="name" placeholder="Name" id="name" minLength={3} maxLength={26} value={val} onChange={handleChange}/>
    <button id="submitBtn" ref={submitBtn} onClick={submitHandler}>Get Certificate</button>
  </main>
      </>
  )
}

export default Home