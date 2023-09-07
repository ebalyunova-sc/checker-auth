import React, { createContext } from 'react';
import {BrowserRouter , Routes, Route } from 'react-router-dom';

import Store from './store/store';
import MainPage from './components/pages/MainPage';
import GamePage from './components/pages/GamePage';
import LoginPage from './components/pages/LoginPage';

export const store = new Store();
export const Context = createContext({
    store
})

const App = () => {
    return(
        <Context.Provider value={{
            store
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/game' element={<GamePage />} />
                    <Route path='/login' element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    )
}

export default App;