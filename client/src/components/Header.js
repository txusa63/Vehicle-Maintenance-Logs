import React, {useState, useContext} from 'react';
import {useHistory, Link} from 'react-router-dom';
import UserContext from '../context/UserContext';
import {
    Button, 
    ButtonGroup, 
    Collapse, 
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav, 
    NavItem,
    Container
} from 'reactstrap';

export default function Header() {
    const {users} = useContext(UserContext);
    const [userValue, setUserValue] = users;
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();

    const toggle = () => setIsOpen(!isOpen);
    const register = () => history.push('/register');
    const login = () => history.push('login');
    const logout = () => {
        setUserValue({
            token: undefined,
            user: undefined
        });
        localStorage.setItem('auth-token', '');
        history.push('/login');
        window.location.reload(false);
    }

    return (
        <div>
            <Navbar color='info' dark expand='sm' className='mb-5' >
                <Container>
                    <NavbarBrand tag={Link} to={'/'} >
                        <h2 className='title'>Maintenance Log System</h2>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav >
                            {userValue.user ? (
                                <div>
                                    <NavItem>
                                        <span className='navbar=text mr-3'>
                                            <strong>Welcome {userValue.user['displayName']} </strong>
                                        </span>
                                    </NavItem>
                                    <NavItem>
                                        <Button color='success' onClick={logout} >Logout</Button>
                                    </NavItem>
                                </div>
                            ): (
                                <ButtonGroup>
                                    <Button color='success' onClick={register} >Register</Button>
                                    <Button color='success' onClick={login} >Login</Button>
                                </ButtonGroup>
                            )}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
