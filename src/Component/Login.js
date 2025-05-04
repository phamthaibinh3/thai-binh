import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { loginApi } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'
const Login = () => {
    const navigate = useNavigate();
    const { loginContext } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const [loginAPI, setLoginAPI] = useState(false);


    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Password is required");
            return;
        }
        setLoginAPI(true)
        let res = await loginApi(email, password);
        if (res && res.token) {
            localStorage.setItem('token',res.token)
            localStorage.setItem('email',email)
            // loginContext(email, res.token)
            navigate("/")
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error);
            }
        }
        setLoginAPI(false);
    }

    const handleGoBack = () => {
        navigate("/")
    }

    console.log('check state password: ', isShowPassword);

    return (
        <div className='login-container col-12 col-sm-4'>
            <div className='title'>Login</div>
            <div className='text'>Email or username(eve.holt@reqres.in)</div>
            <input
                type='text'
                placeholder='Email or password'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <div className='input-pass'>
                <input
                    type={isShowPassword ? "text" : "password"}
                    placeholder='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <i className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={() => setIsShowPassword(!isShowPassword)}></i>
            </div>
            <button
                className={email && password ? "active" : ""}
                disabled={(email && password) ? false : true}
                onClick={() => handleLogin()}
            >
                {loginAPI && <i className='fa-slod fa-sync fa-spin'></i>}
                &nbsp;Login
            </button>
            <div className='back' onClick={() => handleGoBack()}>
                <i className='fa-solid fa-angles-left'></i>Go back
            </div>
        </div>
    )
}

export default Login