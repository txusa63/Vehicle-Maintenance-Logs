import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(undefined);
    const [user, setUser] = useState(undefined);

    const getLoggedIn = async () => {
        const loggedInRes = await axios.get('/users/isLoggedIn');
        setLoggedIn(loggedInRes.data);
        if(loggedInRes.data) {
            const usersRes = await axios.get('/users');
            setUser(usersRes.data);
        }
        else {
            setUser({})
        }
    }

    useEffect(() => {
        getLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{loggedIn, getLoggedIn, user}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext