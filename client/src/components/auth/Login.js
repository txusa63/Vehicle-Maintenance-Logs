import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Input, Label } from 'reactstrap'
import Button from 'reactstrap/lib/Button';
import AuthContext from '../../context/AuthContext';
import ErrorNotice from '../Error';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();

    const {getLoggedIn} = useContext(AuthContext);
    const history = useHistory();

    const login = async (e) => {
        e.preventDefault();

        try {
            const loginData = {email, password};

            await axios.post('/users/login', loginData);

            await getLoggedIn();
            history.push('/')
        } 
        
        catch (err) {
            console.error(err);
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    return (
        <div style={{paddingLeft: '2rem'}}>
            <h3>Please log in below:</h3>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)}/>}
            <Form onSubmit={login}>
                <FormGroup>
                    <Label>
                        Email
                        <Input 
                            type='email' 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Password
                        <Input 
                            type='password' 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Label>
                </FormGroup>
                <Button type='submit'>Log In</Button>
            </Form>
        </div>
    )
}
