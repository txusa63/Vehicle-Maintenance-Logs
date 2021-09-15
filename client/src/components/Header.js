import React, { useContext, useState } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import AuthContext from '../context/AuthContext';
import { Logout } from './Logout';

export const Header = () => {
    const {loggedIn, user} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color='light' light expand='md' fixed='top'>
                <NavbarBrand href='/'>Vehicle Maintenance System</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className='mr-auto' navbar>
                        <NavItem>
                            <NavLink tag={RRNavLink} exact to='/'>Home</NavLink>
                        </NavItem>
                        {
                            loggedIn === 'false' && (
                                <>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to='/login'>Login</NavLink>
                                    </NavItem>
                                </>
                            )
                        }
                        {
                            loggedIn === true && (
                                <>
                                    {user?.role === 'ADMIN' ? (
                                        <NavItem>
                                            <NavLink tag={RRNavLink} to='/register'>Register</NavLink>
                                        </NavItem>
                                    ) : null}
                                    <Logout />
                                </>
                            )
                        }
                    </Nav>
                    {user?.role !== undefined ? (
                        <NavbarText> {'Welcome, ' + user.displayName} </NavbarText>
                    ) : null}
                </Collapse>
            </Navbar>
        </div>
    )
}
