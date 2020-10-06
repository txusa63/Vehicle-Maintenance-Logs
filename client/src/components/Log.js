import React, {useState, useEffect} from 'react'
import {Collapse, Button, Card, CardBody} from 'reactstrap';
import axios from 'axios';

export default function Log(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState();
   
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        const getUserName = async (id) => {
            const name = await axios.get('/users/'+id);
            setUserName(name.data['displayName']);
        }
        getUserName(props.data['userId']);
    });

    return (
        <div>
            <Button outline color='primary' onClick={toggle} className='btn-link' >{userName}</Button>
            <Collapse isOpen={isOpen} >
                <Card>
                    <CardBody> 
                        <p><strong>Vehicle Make</strong>: {props.data['brandName']}</p>
                        <p><strong>Vehicle Model</strong>: {props.data['modelName']}</p>
                        <p><strong>Vehicle Mileage</strong>: {Number(props.data['mileage']).toLocaleString() + ' mile(s)'}</p>
                        <p><strong>Oil changed?</strong>: {props.data['oilChanged']}</p>
                        <p><strong>Brakes Checked?</strong>: {props.data['brakesChecked']}</p>
                        <p><strong>Lights Checked?</strong>: {props.data['lightsChecked']}</p>
                        <p><strong>Any Extra Information to Add?</strong>: {props.data['anyDamages']}</p>
                        <p><strong>Date of Log</strong>: {props.data['date']}</p>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}