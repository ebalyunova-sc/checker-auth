import React, { useState, useContext, useEffect } from 'react';

import LoginContext from '../../contexts/LoginContext';
import UserContext from '../../contexts/UserContext';
import AuthService from '../../services/AuthService';

const MainPage = () => {
    let [isLogin, setIsLogin] = useContext(LoginContext);
    let [user, setuser] = useContext(UserContext);

    const handleClick = async (event) => {
        const response = await AuthService.logout();
        localStorage.removeItem('token');
        setIsLogin(false);
    }

    return(
        <>
        <>{user}</>
        <button onClick={handleClick}>Выйти</button>
        </>
    );
}

export default MainPage;