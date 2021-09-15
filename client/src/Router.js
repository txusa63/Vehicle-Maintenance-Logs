import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import {Login} from './components/auth/Login';
import {Register} from './components/auth/Register';
import { Dashboard } from './components/Dashboard';
import { Employees } from './components/Employees';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { LogForm } from './components/LogForm';
import {Logs} from './components/Logs';
import AuthContext  from './context/AuthContext'

export const Router = () => {
    const {loggedIn, getLoggedIn, user} = useContext(AuthContext);

    useEffect(() => {
        getLoggedIn()
    }, []);

    return (
        <BrowserRouter>
            <Header />
            <Switch>
                {/* // Fragment for Spinner component and ComputedMatch */}
                <>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    {
                        loggedIn !== undefined ? (
                            loggedIn === false ? (
                                <>
                                    <Route path='/login'>
                                        <Login />
                                    </Route>
                                </>
                            ): (
                                user !== undefined ? (
                                    Object.entries(user).length !== 0 ? (
                                        user.role === 'ADMIN' ? (
                                            <>
                                                <Route exact path='/register'>
                                                    <Register />
                                                </Route>
                                                <Route path='/register/:id'>
                                                    <Register />
                                                </Route>
                                                <Route path='/dashboard'>
                                                    <Dashboard />
                                                </Route>
                                                <Route path='/logs/:role'>
                                                    <Logs />
                                                </Route>
                                                <Route path='/users'>
                                                    <Employees />
                                                </Route>
                                            </>
                                        ) : (
                                            <>
                                                <Route path='/logs/:role'>
                                                    <Logs />
                                                </Route>
                                                <Route exact path='/logForm'>
                                                    <LogForm />
                                                </Route>
                                                <Route path='/logForm/:id'>
                                                    <LogForm />
                                                </Route>
                                            </>
                                        )
                                    ) : null
                                ) : null
                            )
                        ) : <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}  ><Spinner color='primary' /></div>
                    }
                </>
            </Switch>
        </BrowserRouter>
    )
}
