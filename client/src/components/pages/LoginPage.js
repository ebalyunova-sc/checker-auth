import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Context } from '../../App';

import '../style/login&registrationPages.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [info, setInfo] = useState('');

    useEffect(() => {
        store.checkAuth();
        if (localStorage.getItem('auth') 
            && localStorage.getItem('user')
            && localStorage.getItem('token'))
        {
            navigate('/');
        }
    }, [localStorage.getItem('auth')]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        await store.login(username, password);
        localStorage.getItem('auth') 
            ? navigate('/')
            : setInfo('Invalid username or password');
    }
    
    return(
        <>
            <div className='environment' />
            <form
                onSubmit = {handleSubmit}
                className='login modalWindow'>
                <div className='loginText'>Login</div>
                <input
                    onChange={(event) => setUsername(event.target.value)}
                    type='text'
                    placeholder='Username'
                    className='input'
                />
                <input
                    onChange={(event) => setPassword(event.target.value)}
                    type='password'
                    placeholder='Password'
                    className='input'
                />
                <div className='info'>{info}</div>
                <input
                    type='submit'
                    value='SIGN IN'
                    className='submit'
                />
                <div className='registrationLink'>
                    {'Don\'t have an account? '}
                    <a
                        href='/registration'
                        className='link'>
                        Sign up
                    </a>
                </div>
            </form>
        </>
    )
}

export default LoginPage;