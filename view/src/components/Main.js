import React, { useContext } from 'react';
import Login from './Login';
import Projects from './Projects';
import AppContext from '../context/AppContext';

export default function Main() {
    const { appState } = useContext(AppContext);

    return (
        <main className='main-container'>
            {
                appState.isLoggedIn ? <Projects /> : <Login />
            }
        </main>
    )
}