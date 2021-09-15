import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Collapse } from 'reactstrap'
import AuthContext from '../context/AuthContext';

export const Log = (props) => {
    const {_id, brandName, modelName, modelYear, modelColor, mileage, oilChanged, brakesChecked, lightsChecked, anyDamages, extraInformation, createdAt} = props.log;
    const [collapse, setCollapse] = useState(false);
    const {push} = useHistory();
    const {user} = useContext(AuthContext);
    const date = new Date(createdAt);


    const toggle = () => setCollapse(!collapse);

    return (
        <div>
            <Button  color='primary' size='sm' block onClick={toggle} style={{marginTop: '1rem'}} >
                {date.toLocaleString('en-US', {day:'numeric', month: 'long', year:'numeric'})}
            </Button>
            <Collapse isOpen={collapse}>
                <Card outline color='secondary' >
                    <CardHeader style={{textAlign: 'center', backgroundColor: 'silver'}}>
                        <strong>Log ID:</strong> {_id} {user.role !== 'ADMIN' ? <Button size='sm' onClick={() => push('/logForm/' + _id)} >Edit Log</Button> : null}
                    </CardHeader>
                    <CardBody>
                        <CardTitle></CardTitle>
                        <CardText><strong>Brand Name: </strong>{brandName}</CardText>
                        <CardText><strong>Model Name: </strong>{modelName}</CardText>
                        <CardText><strong>Model Year: </strong>{modelYear}</CardText>
                        <CardText><strong>Model Color: </strong>{modelColor}</CardText>
                        <CardText><strong>Mileage: </strong>{Number(mileage).toLocaleString('en-US')}</CardText>
                        <CardText><strong>Oil Changed? : </strong>{oilChanged === true ? 'Yes' : 'No'}</CardText>
                        <CardText><strong>Brakes Checked? : </strong>{brakesChecked === true ? 'Yes' : 'No'}</CardText>
                        <CardText><strong>Lights Checked? : </strong>{lightsChecked === true ? 'Yes' : 'No'}</CardText>
                        <CardText><strong>Any Damages? : </strong>{anyDamages === true ? 'Yes' : 'No'}</CardText>
                        <CardText><strong>Any Additional Information to Add/Include? : </strong>{extraInformation}</CardText>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}
