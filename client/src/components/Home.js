import React, {useEffect, useContext} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {Container} from 'reactstrap';
import UserContext from '../context/UserContext';
import FormModal from './FormModal'
import Logs from './Logs';

export default function Home() {
    const {users, logs} = useContext(UserContext);
    const [userValue] = users;
    const [logsValue, setLogsValue] = logs;

    const history = useHistory();

    useEffect(() => {
        if(!userValue.user) {
            history.push('/login');
        }

        else {
            if(!logsValue.logs) {
                const loadLogs = async () => {
                    const role = userValue.user['role'];
                    let logsResponse;
                    if(role === 'ADMINISTRATOR' || role === 'ADMIN') {
                        logsResponse = await axios.get('/logs/adminAll');
                    }
                    else {
                        logsResponse = await axios.get('/logs/usersAll', {headers: {'x-auth-token': userValue.token}});
                    }
                    if(logsResponse.data.length !== 0) {
                        setLogsValue({
                            logs: logsResponse.data
                        })
                    }
                }
                loadLogs();
            }
        }
    },[]);

    return (
        <div>
            <Container>
                <FormModal />
                <Logs />
            </Container>
        </div>
    )
}
