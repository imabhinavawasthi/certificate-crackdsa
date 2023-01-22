import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchorLock, faLock } from "@fortawesome/free-solid-svg-icons";
import "./signup.css"
import log from "./log.svg"
import { NavLink } from "react-router-dom";
import * as api from "../../axios.js"

const ResetPassword = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [pass, setPass] = useState()
    const [conpass, setConPass] = useState()
    const [logrerrormess, setLogrErrormess] = useState();
    const [logrinfomess, setLogrInfomess] = useState();
    const [logrvermess, setLogrVermess] = useState();
    const [logrsuccessmess, setLogrSuccessmess] = useState();
    if (!params.email) {
        navigate("/")
    }
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
            let res = await api.resetPass({ email: params.email, new_password: pass });
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
            {params?.email && <div>
                <>
                    
                </></div>}
        </div>
    )
}

export default ResetPassword