import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

export const Home = () => {
    const history = useHistory();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        checkStatus()
    }, [user])

    const checkStatus = () => {
        if(user !== undefined) {
            if(Object.entries(user).length !== 0) {
                if(user.role === 'ADMIN') {
                    history.push('/dashboard');
                }
                if(user.role === 'EMPLOYEE') {
                    history.push('/logs/employee')
                }
            }
            else {
                history.push('/login')
            }
        }
    }
    return (
        <>
            
        </>
    )
}
