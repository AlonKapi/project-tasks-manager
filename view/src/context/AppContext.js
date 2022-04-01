import React, { useState, createContext } from 'react';

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    email: 'asdasd'
}

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [appState, setAppState] = useState(initialState);

    const login = (email) => {
        setAppState((prevState) => ({
                ...prevState,
                isLoggedIn: true,
                email: email
            }
        ));
    };

    const logout = () => {
        setAppState((prevState) => ({
                ...prevState,
                isLoggedIn: false,
                email: ''
            }
        ));
    };

    return (
       <AppContext.Provider value={{appState, login, logout}}>
           {children}
       </AppContext.Provider> 
    ); 
};

export default AppContext;