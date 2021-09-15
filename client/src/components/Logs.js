import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'
import { Button } from 'reactstrap';
import { Log } from './Log';

export const Logs = () => {
    const {role} = useParams();
    const history = useHistory();
    const {push} = useHistory();
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        getLogs();
    }, []);

    const handleBack = () => {
        history.goBack();
    };

    const getLogs = async () => {
        if(role === 'admin') {
            const logsRes = await axios.get('/logs/employees');
            setLogs(logsRes.data);
        }
        if(role === 'employee') {
            const logsRes = await axios.get('/logs/');
            setLogs(logsRes.data);
        }
    }

    const mapLogs = () => {
        return logs.map((log) => {
            return (
                <span key={log._id}>
                    <Log log={log}/>
                </span>
            )
        })
    }

    return (
        <div>
            {role === 'admin' ? <Button onClick={handleBack}>Go Back</Button> : null}

            {role === 'employee' ? <Button color='success' size='lg' onClick={() => push('/logForm')} block>Add New Log</Button> : null}
            {logs !== undefined ? mapLogs(): null}
        </div>
    )
}
