import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { useHistory, useParams } from 'react-router-dom';
import ErrorNotice from '../Error';

export const Register = () => {
    const {id} = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [role, setRole] = useState('EMPLOYEE');
    const [gender, setGender] = useState('MALE');
    const [error, setError] = useState();

    const history = useHistory();

    useEffect(() => {
        if(id !== undefined) {
            getUsers();
        }
    }, [])

    const handleBack = () => {
        history.goBack();
    };

    const getUsers = async () => {
        const usersRes = await axios.get('/users/' + id);
        setFirstName(usersRes.data.firstName);
        setLastName(usersRes.data.lastName);
        setEmail(usersRes.data.email);
        setPassword(usersRes.data.passwordHash);
        setPasswordCheck(usersRes.data.passwordHash);
        setRole(usersRes.data.role);
        setGender(usersRes.data.gender);
    }

    const register = async (e) => {
        e.preventDefault();
        try {
            const registerData = {
                firstName,
                lastName,
                email, 
                password,
                passwordCheck,
                role,
                gender
            };

            if(id === undefined) {
                await axios.post('/users/register', registerData);
            }
            else {
                await axios.put('/users/update/' + id, registerData);
            }
            history.push('/')
        } 
        
        catch (err) {
            console.error(err);
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    const adminExists = async () => {
        const adminExistsRes = await axios.get('/users/adminExists');
        if(adminExistsRes) {
            return true
        }
        return false
    }
    
    return (
        <div style={{paddingLeft: '2rem'}}>
            <Button onClick={handleBack}>Go Back</Button>
            <h3>{id === undefined ? 'Please register an account below' : 'Edit User Account'}</h3>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)}/>}
            <Form onSubmit={register}>
                <FormGroup>
                    <Label>
                        First Name
                        <Input 
                            type='text' 
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Last Name
                        <Input 
                            type='text' 
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </Label>
                </FormGroup>
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
                <FormGroup>
                    <Label>
                        Reenter Password
                        <Input 
                            type='password' 
                            value={passwordCheck}
                            onChange={e => setPasswordCheck(e.target.value)}
                        />
                    </Label>
                </FormGroup>
                <FormGroup tag='fieldset'>
                    <legend>Choose Gender</legend>
                    <FormGroup check>
                        <Label>
                            <Input 
                                type='radio' 
                                checked={gender === 'MALE'}
                                value='MALE'
                                onChange={() => setGender('MALE')}
                            /> Male
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label>
                            <Input 
                                type='radio' 
                                checked={gender === 'FEMALE'}
                                value='FEMALE'
                                onChange={() => setGender('FEMALE')}
                            /> Female
                        </Label>
                    </FormGroup>
                </FormGroup>
                {
                    adminExists() === false ? (
                        <FormGroup tag='fieldset'>
                            <legend>Choose Role</legend>
                            <FormGroup check>
                                <Label>
                                    <Input 
                                        type='radio' 
                                        checked={role === 'EMPLOYEE'}
                                        onChange={e => setRole('EMPLOYEE')}
                                    /> Employee
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                {/* Look into this more for disabling if not from admin */}
                                <Label>
                                    <Input 
                                        type='radio' 
                                        checked={role === 'ADMIN'}
                                        onChange={e => setRole('ADMIN')}
                                    /> Admin
                                </Label>
                            </FormGroup>
                        </FormGroup>
                    ) : (
                            <FormGroup tag='fieldset'>
                                <legend>Choose Role</legend>
                                <FormGroup check>
                                    <Label>
                                        <Input 
                                            type='radio' 
                                            checked={role === 'EMPLOYEE'}
                                            onChange={e => setRole('EMPLOYEE')}
                                        /> Employee
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                    )
                }
                
                <Button type='submit'>{id === undefined ? 'Register Account' : 'Submit Changes'}</Button>
            </Form>
        </div>
    )
}
