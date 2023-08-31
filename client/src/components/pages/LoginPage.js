import React, { useState, useContext, useEffect } from 'react';

import LoginContext from '../../contexts/LoginContext';
import UserContext from '../../contexts/UserContext';
import AuthService from '../../services/AuthService';

const LoginPage = () => {
    let [isLogin, setIsLogin] = useContext(LoginContext);
    let [user, setuser] = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [info, setInfo] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token'))
        {
            setIsLogin(true);
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem('token', response.data.accessToken);
            setIsLogin(true);
            setuser(username);
        } catch (e) {
            setInfo('Invalid username or password');
        }
    }
    
    return(
        <>
            <form
                onSubmit = {handleSubmit}>
                <div>Login</div>
                <input
                    onChange={(event) => setUsername(event.target.value)}
                    type="text"
                    placeholder="Username"
                />
                <input
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <div className='info'>{info}</div>
                <input
                    type="submit"
                    value="SIGN IN"
                    
                />
            </form>
            <div>{isLogin ? 'login' : 'isnt login'}</div>
        </>
    )
}

export default LoginPage;