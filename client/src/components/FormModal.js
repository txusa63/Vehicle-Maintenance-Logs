import React, {useState, useContext} from 'react';
import UserContext from '../context/UserContext';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    ModalFooter
} from 'reactstrap';
import axios from 'axios';
import Error from '../components/Error';

const FormModal = () => {
    const {users, logs} = useContext(UserContext);
    const [userValue] = users;
    const [logsValue, setLogsValue] = logs;
    const [modal, setModal] = useState(false);
    const [brandName, setBrandName] = useState();
    const [modelName, setModelName] = useState();
    const [mileage, setMileage] = useState();
    const [oilChanged, setOilChanged] = useState('No');
    const [brakesChecked, setbrakesChecked] = useState('No');
    const [lightsChecked, setLightsChecked] = useState('No');
    const [anyDamages, setAnyDamages] = useState();
    const [error, setError] = useState();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const newLog = {brandName, modelName, mileage, oilChanged, brakesChecked, lightsChecked, anyDamages};
            const addedLog = await axios.post('/logs/', newLog, {headers: {'x-auth-token': userValue.token}});
            if(logsValue.logs !== undefined) {
                setLogsValue((prevState) => {
                    return {
                        logs: [...prevState.logs, addedLog.data]
                    }
                });
            }
            else {
                const role = userValue.user['role'];
                let logsResponse;
                if(role === 'ADMIN' || role === 'ADMINISTRATOR') {
                    logsResponse = await axios.get('/logs/adminAll', {headers: {'x-auth-token': userValue.token}});
                }
                else {
                    logsResponse = await axios.get('/logs/usersAll', {headers: {'x-auth-token': userValue.token}});
                }
                if(logsResponse.data.length !== 0) {
                    setLogsValue({
                        logs: logsResponse.data
                    });
                }
            }
            toggle();
        }

        catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button onClick={toggle} >Create New Log</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle} >Log Entries</ModalHeader>
                {error && <Error message={error} clearError={() => setError(undefined)} />}
                <ModalBody >
                    <Form onSubmit={submit}>
                        <FormGroup>
                            <Label for='vehicleBrand'>Vehicle Brand</Label>
                            <Input id='vehicleBrand' type='text' name='brandName' onChange={e => setBrandName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='vehicleModel'>Vehicle Model</Label>
                            <Input id='vehicleModel' type='text' onChange={e => setModelName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for='mileage'>Vehicle Mileage</Label>
                            <Input id='mileage' type='text' onChange={e => setMileage(e.target.value)} />
                        </FormGroup>
                        <FormGroup tag='fieldset'>
                            <legend>Oil Changed?</legend>
                            <FormGroup check>
                                <Label check>
                                    <Input type='radio' name='oilChanged' value='Yes' onChange={e => setOilChanged(e.target.value)} />
                                    Yes
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type='radio' name='oilChanged' value='No' onChange={e => setOilChanged(e.target.value)} />{' '}
                                    No
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup tag='fieldset'>
                            <legend>Brakes Checked?</legend>
                            <FormGroup check>
                                <Label check>
                                    <Input type='radio' name='brakesChecked' value='Yes' onChange={e => setbrakesChecked(e.target.value)} />
                                    Yes
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type='radio' name='brakesChecked' value='No' onChange={e => setbrakesChecked(e.target.value)} />
                                    No
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup tag='fieldset'>
                            <legend>Lights Checked?</legend>
                            <FormGroup check>
                                <Label check>
                                    <Input type='radio' name='lightsChecked' value='Yes' onChange={e => setLightsChecked(e.target.value)} />
                                    Yes
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type='radio' name='lightsChecked' value='No' onChange={e => setLightsChecked(e.target.value)} />
                                    No
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for='anyDamages'>Any damages or extra information to submit?</Label>
                            <Input id='anyDamages' type='textarea' name='anyDamages' placeholder='Add N/A if not applicable' onChange={e => setAnyDamages(e.target.value)} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color='success' onClick={submit} >Submit</Button>
                    <Button color='secondary' onClick={toggle} >Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default FormModal;