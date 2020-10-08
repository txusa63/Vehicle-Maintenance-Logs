import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import UserContext from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'reactstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  const [logsData, setLogsData] = useState({
    logs: undefined
  })

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if(token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }

      const tokenResponse = await axios.post('/users/isTokenValid', null, {headers: {'x-auth-token': token}});
      if(tokenResponse.data) {
        const userResponse = await axios.get('/users/', {headers: {'x-auth-token': token}});
        setUserData({
          token,
          user: userResponse.data
        });

        if(userData.user.role === 'ADMIN' || userData.user.role === 'ADMINISTRATOR') {
          const logsResponse = await axios.get('/logs/adminAll');
          setLogsData({
            logs: logsResponse.data
          })
        }
        else {
          const logsResponse = await axios.get('/logs/usersAll', {headers: {'x-auth-token': token}});
          setLogsData({
            logs: logsResponse.data
          })
        }
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <Fragment>
      <Router>
        <UserContext.Provider value={{users: [userData, setUserData], logs: [logsData, setLogsData]}} >
          <div>
            <Container>
              <Header/>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
              </Switch>
            </Container>
          </div>
        </UserContext.Provider>
      </Router>
    </Fragment>
  );
}

export default App;
