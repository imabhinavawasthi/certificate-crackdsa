import axios from 'axios'

const API = axios.create({
    // baseURL: 'http://localhost:8080/'
    baseURL: 'https://notes-crackdsa-backend-render.onrender.com'
    // baseURL:'https://notes-crackdsa-backend-production.up.railway.app'
})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('crackdsa-user')) {
        req.headers.auth = `${JSON.parse(localStorage.getItem('crackdsa-user')).token}`
    }

    return req
})

export const userRegister = async (userData) => {

    let user = await API.post('/auth/register', userData)

    return user;
}

export const userLogin = async (userData) => {

    let user = await API.post('/auth/login', userData)

    return user;
}

export const sendOTP = async (userData) => {

    let user = await API.post('/auth/otpsent', userData)

    return user;
}

export const verifyOTP = async (userData) => {

    let user = await API.post('/auth/otpverify', userData)

    return user;
}

export const addProblem = async (userData) => {

    let user = await API.post('/user/createtodo', userData)

    return user;
}

export const fetchProblems=async()=>{
    let data=await API.get('/user/alltodo')

    return data;
}

export const fetchProblemDetails = async (problemId) => {

    let user = await API.post('/user/fetchproblemdata', problemId)

    return user;
}

export const checkUserExists = async (userEmail) => {

    let user = await API.post('/auth/checkuser', userEmail)

    return user;
}

export const resetPass = async (userDetails) => {

    let user = await API.post('/auth/forgotpassword', userDetails)

    return user;
}

export const markProblem=async(problemID)=>{
    let res=await API.post("/user/marktodo",problemID);
    return res;
}
