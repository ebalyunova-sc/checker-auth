import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Context } from '../../App';

const MainPage = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context);

    useEffect(() => {
        store.checkAuth();
        if (!localStorage.getItem('auth'))
        {
            navigate('/login');
        }
    }, [localStorage.getItem('auth')]);

    const handleOnClick = async (event) => {
        await store.logout();
        try {
            navigate('/login');
        } catch (e) {
            console.log(e);
        }
    }

    const goToGamePage = () => {
        if (localStorage.getItem('auth'))
        {
            try {
                navigate('/game');
            } catch (e) {
                console.log(e);
            }
        }
        else
        {
            try {
                navigate('/login');
            } catch (e) {
                console.log(e);
            }
        }
    }

    return(
        <>
        <>{localStorage.getItem('user')}</>
        <button onClick={handleOnClick}>Выйти</button>
        <button onClick={goToGamePage}>начать игру</button>
        </>
    );
}

export default MainPage;