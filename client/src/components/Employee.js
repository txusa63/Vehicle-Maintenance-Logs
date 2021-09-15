import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardText, Collapse } from 'reactstrap';

export const Employee = (props) => {
    const {_id, firstName, lastName, email, displayName, role, gender} = props.employee;
    const [collapse, setCollapse] = useState(false);
    const {push} = useHistory();

    const toggle = () => setCollapse(!collapse);

    return (
        <div>
            <Button  color='primary' size='sm' block onClick={toggle} style={{marginTop: '1rem'}} >
                {displayName}
            </Button>
            <Collapse isOpen={collapse}>
                <Card outline color='secondary'>
                    <CardHeader style={{textAlign: 'center', backgroundColor: 'silver'}}>
                        <strong>Employee Id: </strong> {_id} <Button size='sm' onClick={() => push('/register/' + _id)} >Edit Account</Button>
                    </CardHeader>
                    <CardBody>
                        <CardText><strong>First Name: </strong>{firstName}</CardText>
                        <CardText><strong>Last Name: </strong>{lastName}</CardText>
                        <CardText><strong>Email: </strong>{email}</CardText>
                        <CardText><strong>Password: </strong><em>Not displayed for security reasons</em></CardText>
                        <CardText><strong>Role: </strong>{role}</CardText>
                        <CardText><strong>Gender: </strong>{gender}</CardText>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}
