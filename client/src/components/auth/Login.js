import React, {useState, useContext} from 'react';
import UserContext from '../../context/UserContext';
import {useHistory} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios';
import Error from '../Error';

export default function Login() {
    const {users, logs} = useContext(UserContext);
    const [userValue, setUserValue] = users;
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = {email, password};
            const loginResponse = await axios.post('/users/login', loginUser);
            setUserValue({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem('auth-token', loginResponse.data.token);
            history.push('/');
        }

        catch(err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            {error && <Error message={error} clearError={() => setError(undefined)} />}
            <Form onSubmit={submit}>
                <FormGroup>
                    <Label for='loginEmail'>Email</Label>
                    <Input id='loginEmail' type='email' name='email' onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for='loginPassword'>Password</Label>
                    <Input id='loginPassword' type='password' name='password' onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <Button color='success'>Submit</Button>
            </Form>
        </div>
    )
}
