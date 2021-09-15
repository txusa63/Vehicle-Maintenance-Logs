import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { Employee } from './Employee';
import { Button } from 'reactstrap';

export const Employees = () => {
    const history = useHistory();
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const handleBack = () => {
        history.goBack();
    };

    const getUsers = async () => {
        const usersRes = await axios.get('/users/all');
        setEmployees(usersRes.data);
    }

    const mapLogs = () => {
        return employees.map((employee) => {
            return (
                <span key={employee._id}>
                    <Employee employee={employee}/>
                </span>
            )
        })
    }

    return (
        <div>
            <Button onClick={handleBack}>Go Back</Button>
            {mapLogs?.()}
        </div>
    )
}
