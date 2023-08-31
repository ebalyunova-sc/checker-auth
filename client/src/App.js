import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginContext from './contexts/LoginContext';
import UserContext from './contexts/UserContext';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';

const App = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState('');

    return(
        <LoginContext.Provider value={[isLogin, setIsLogin]}>
            <UserContext.Provider value={[user, setUser]}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={isLogin ? <MainPage /> : <LoginPage />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </LoginContext.Provider>
    )
}

export default App;