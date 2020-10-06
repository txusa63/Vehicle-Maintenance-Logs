import React, {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import Error from '../Error';
import {useHistory} from 'react-router-dom';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default function Register() {
    const {users} = useContext(UserContext);
    const [setUserVallue] = users;
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [role, setRole] = useState();
    const [error, setError] = useState();
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const newUser = {firstName, lastName, email, password, passwordCheck, role};
            await axios.post('/users/register', newUser);

            const loginResponse = await axios.post('/users/login', {email, password});
            setUserVallue({
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
            <h2>Register</h2>
            {error && <Error message={error} clearError={() => setError(undefined)} />}
            <Form onSubmit={submit}>
                <FormGroup>
                    <Label for='registerFirstName'>First Name</Label>
                    <Input id='registerFirstName' type='text' name='firstName' onChange={e => setFirstName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for='registerLastName'>Last Name</Label>
                    <Input id='registerLastName' type='text' name='lastName' onChange={e => setLastName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for='registerEmail'>Email</Label>
                    <Input id='registerEmail' type='email' name='email' onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for='registerPassword'>Password</Label>
                    <Input id='registerPassword' type='password' name='password' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Input id='reenterPassword' type='password' placeholder='Please Reenter Your Password' onChange={e => setPasswordCheck(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for='registerRole'>Role</Label>
                    <Input id='registerRole' type='text' name='role' placeholder='Enter Employee if you are Admin' onChange={e => setRole(e.target.value)} />
                </FormGroup>
                <Button color='success' >Submit</Button>
            </Form>
        </div>
    )
}
