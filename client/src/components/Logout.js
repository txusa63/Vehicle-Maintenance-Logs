import axios from 'axios';
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import AuthContext from '../context/AuthContext'

export const Logout = () => {
    const {getLoggedIn} = useContext(AuthContext);
    const history = useHistory();

    const logOut = async () => {
        await axios.get('/users/logout');
        await getLoggedIn();
        history.push('/')
    }

    return (
        <div>
            <Button outline color='secondary' size='sm' onClick={logOut}>Log Out</Button>
        </div>
    )
}
