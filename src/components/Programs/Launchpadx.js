import React, { useRef, useState } from 'react'
import { img } from '../../assests'
import '../../style.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { PDFDocument, StandardFonts, rgb, fontkit } from 'pdf-lib'


const Launchpadx = () => {
    const navigate = useNavigate()

    const curruser = JSON.parse(localStorage.getItem('crackdsa-user'));
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("crackdsa-user");
        window.location.reload(false);
    }
    const userName = useRef();
    const submitBtn = useRef();
    let [val, setVal] = useState("");
    let [done, setDone] = useState(false);
    const handleChange = () => {
        setVal(userName.current.value);
    }

    const capitalize = (str, lower = false) =>
        (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
            match.toUpperCase()
        );

    //  submit name handler
    const submitHandler = (e) => {
        e.preventDefault();

        const val = capitalize(userName.current.value);

        //check if the text is empty or not
        if (val.trim() !== "") {
            // console.log(val);

            generatePDF(val);

        } else {
            alert("Enter Valid Name")
            userName.reportValidity();

        }
    }

    // yu
    const generatePDF = async (name) => {
        const existingPdfBytes = await fetch(".././launchpadx.pdf").then((res) => res.arrayBuffer());



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
        let fileName = 'Boarding Pass LaunchPadx.pdf';
        link.download = fileName;
        link.click();
        setDone(true);
    };
    return (

        <>
            <section class="w-full px-8 text-gray-700 bg-white">
                <div class="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
                    <div class="relative flex flex-col md:flex-row">
                        <NavLink to="/" class="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
                            <span class="mx-auto text-xl font-black leading-none text-gray-900 select-none">crack<span class="text-indigo-600">DSA</span> Certification<span class="text-indigo-600">.</span></span>
                        </NavLink>
                        <nav class="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
                            <a href="https://certificate.crackdsa.com/" class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Home</a>
                            <a href="https://crackdsa.com/" target="_blank" class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">crackDSA.com</a>
                            <a href="https://launchpadx.crackdsa.com/" target="_blank" class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">LaunchPadx</a>
                            {/* <a href="#_" class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Blog</a> */}
                        </nav>
                    </div>

                    {curruser ? <>
                        <div class="inline-flex items-center ml-5 space-x-6 lg:justify-end">
                            <button onClick={(e) => logout(e)}>
                                <a href="" class="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900">
                                    Log out
                                </a>
                            </button>
                        </div>
                    </> : <>
                        <div class="inline-flex items-center ml-5 space-x-6 lg:justify-end">
                            <a href="/auth" class="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900">
                                Log in
                            </a>
                            <a href="/auth" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                                Sign up
                            </a>
                        </div>
                    </>}
                </div>
            </section>
            <section class="py-20 bg-gray-50">
                <div class="container items-center max-w-6xl px-4 px-10 mx-auto sm:px-20 md:px-32 lg:px-16">
                    <div class="flex flex-wrap items-center -mx-3">
                        <div class="order-1 w-full px-3 lg:w-1/2 lg:order-0">
                            <div class="w-full lg:max-w-md">
                                <h2 class="mx-auto text-4xl font-extrabold tracking-tight text-gray-900">
                                    <span class="block xl:inline">Get Your Certificate: </span>
                                    <span class="block text-indigo-600 xl:inline">LaunchPadx 2023.</span>
                                </h2>
                                <br/>
                                <p class="mx-auto text-base text-gray-500 ">Hi, {curruser?.name}. We are thrilled to have you as a participant in our bootcamp. We hope that you found the program informative, challenging, and rewarding, and that you gained valuable skills and knowledge that you can apply to your coding career.</p>

                            </div>
                        </div>
                        <div class="w-full px-3 mb-12 lg:w-1/2 md:w-3/4 sm:w-3/4 order-0 lg:order-1 lg:mb-0">
                            <div class="relative flex flex-col sm:flex-row py-10">

                                {curruser ?
                                    <>
                                        {done ?
                                            <>
                                                <h2 class="mx-auto text-black">Certificate Downloaded!</h2>

                                            </> :
                                            <form class="w-full form-inline">
                                                <div class="form-group flex items-center border-b border-indigo-500 py-2" style={{width:"100%"}}>
                                                    {/* <input class="form-control appearance-none bg-transparent border-none w-full text-black-700 mr-3 py-1 px-2 leading-tight focus:outline-none" required type="text" ref={userName} name="Name" autoComplete="name" placeholder="Enter Your Name" id="name" minLength={3} maxLength={26} value={val} onChange={handleChange} /> */}
                                                    <div class="form-group "><input class="form-control focus:outline-none text-black" required type="text" ref={userName} name="Name" autoComplete="name" placeholder="Enter Your Name" id="name" minLength={3} maxLength={26} value={val} onChange={handleChange} /></div>
                                                    
                                                </div>
                                                <div class="py-5">
                                                <button class="flex-shrink-0 bg-indigo-600 hover:bg-indigo-600 border-indigo-500 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded" id="submitBtn" ref={submitBtn} onClick={(e) => submitHandler(e)}>
                                                        Download
                                                    </button>
                                                </div>
                                            </form>
                                        }
                                    </>
                                    :
                                    <form class="form-inline" >
                                        <div className='row'>
                                            <div class="form-group">
                                                <NavLink to="/auth"><button class="btn-large btn btn-primary p-1" >Signup/Login to get Certificate </button></NavLink>
                                            </div>
                                        </div>
                                    </form>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div style={{ widht: "100%", minHeight: "10px", backgroundColor: "#055ada" }}></div>
            <section class="py-20 bg-gray-50">
                <div class="container items-center max-w-6xl px-4 px-10 mx-auto sm:px-20 md:px-32 lg:px-16">
                    <div class="flex flex-wrap items-center -mx-3">
                        <div class="order-1 w-full px-3 lg:w-1/2 lg:order-0">
                            <div class="w-full lg:max-w-md">
                                <h2 class="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl font-heading text-black">More about crackDSA Certification!</h2>
                                <p class="mb-4 font-medium tracking-tight text-gray-400 xl:mb-6">Our certificates are industry-recognized, validating your achievements and providing you with greater professional recognition.</p>
                                <ul>
                                    <li class="flex items-center py-2 space-x-4 xl:py-3">
                                        <svg class="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
                                        <span class="font-medium text-gray-500">Our certificates are digital and shareable</span>
                                    </li>
                                    <li class="flex items-center py-2 space-x-4 xl:py-3">
                                        <svg class="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                                        <span class="font-medium text-gray-500">Our certificates are a testament to your commitment to learning</span>
                                    </li>
                                    <li class="flex items-center py-2 space-x-4 xl:py-3">
                                        <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                        <span class="font-medium text-gray-500">Our certificates are verified</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0"><img class="mx-auto sm:max-w-sm lg:max-w-full" src="https://cdn.devdojo.com/images/november2020/feature-graphic.png" alt="feature image" /></div>
                    </div>
                </div>
            </section>
            <section class="bg-white">
                <div class="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                    <nav class="flex flex-wrap justify-center -mx-5 -my-2">
                        <div class="px-5 py-2">
                            <a href="https://certificate.crackdsa.com/" target="_blank" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                                Certificate
                            </a>
                        </div>
                        <div class="px-5 py-2">
                            <a href="https://crackdsa.com/" target="_blank" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                                crackDSA
                            </a>
                        </div>
                        <div class="px-5 py-2">
                            <a href="https://events.crackdsa.com/" target="_blank" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                                Events
                            </a>
                        </div>
                        <div class="px-5 py-2">
                            <a href="https://launchpadx.crackdsa.com/" target="_blank" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                                LaunchPadx
                            </a>
                        </div>
                        <div class="px-5 py-2">
                            <NavLink to="/terms&conditions">
                                <a href="" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                                    Terms & Conditions
                                </a>
                            </NavLink>
                        </div>
                        {/* <div class="px-5 py-2">
                            <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                                Terms
                            </a>
                        </div> */}
                    </nav>
                    {/* <div class="flex justify-center mt-8 space-x-6">
                        <a href="#" class="text-gray-400 hover:text-gray-500">
                            <span class="sr-only">Linkedin</span>
                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-gray-500">
                            <span class="sr-only">Instagram</span>
                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-gray-500">
                            <span class="sr-only">Twitter</span>
                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                            </svg>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-gray-500">
                            <span class="sr-only">GitHub</span>
                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-gray-500">
                            <span class="sr-only">Dribbble</span>
                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </div> */}
                    <p class="mt-8 text-base leading-6 text-center text-gray-400">
                        © 2023 crackDSA. All rights reserved.
                    </p>
                </div>
            </section>

        </>
    )
}

export default Launchpadx;