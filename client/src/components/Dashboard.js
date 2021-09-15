import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Card, CardImg, CardText, CardTitle, Col, Row } from 'reactstrap'

export const Dashboard = () => {
    const {push} = useHistory();

    return (
        <div >
            <h3 style={{paddingBottom: '30px', textAlign: 'center'}}>Welcome to your Dashboard</h3>
            <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Col sm='3'>
                    <Card body outline color='info'>
                        <CardImg top width='40%' src='/log1.png' alt='Log img' />
                        <CardTitle tag='h6' style={{textAlign: 'center'}}>Employee Logs</CardTitle>
                        <Button color='primary' onClick={() => push('/logs/admin')}>View Logs</Button>
                    </Card>
                </Col>
                <Col sm='3'>
                    <Card body outline color='info'>
                        <CardImg top width='40%' src='/account.png' alt='Log img' />
                        <CardTitle tag='h6' style={{textAlign: 'center'}}>Employees</CardTitle>
                        <Button color='primary' onClick={() => push('/users')}>View Accounts</Button>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
