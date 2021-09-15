import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

export const LogForm = () => {
    const {id} = useParams();
    const history = useHistory();
    const [brandName, setBrandName] = useState('');
    const [modelName, setModelName] = useState('');
    const [modelYear, setModelYear] = useState('');
    const [modelColor, setModelColor] = useState('Red')
    const [mileage, setMileage] = useState('');
    const [oilChanged, setOilChanged] = useState(false);
    const [brakesChecked, setbrakesChecked] = useState(false);
    const [lightsChecked, setLightsChecked] = useState(false);
    const [anyDamages, setAnyDamages] = useState(false);
    const [extraInformation, setExtraInformation] = useState('');

    useEffect(() => {
        if(id !== undefined) {
            getLogs()
        }
    }, [])

    const handleBack = () => {
        history.goBack();
    };

    const getLogs = async () => {
        const logsRes = await axios.get('/logs/' + id);
        setBrandName(logsRes.data.brandName);
        setModelName(logsRes.data.modelName);
        setModelYear(logsRes.data.modelYear);
        setModelColor(logsRes.data.modelColor);
        setMileage(logsRes.data.mileage);
        setOilChanged(logsRes.data.oilChanged);
        setbrakesChecked(logsRes.data.brakesChecked);
        setLightsChecked(logsRes.data.lightsChecked);
        setAnyDamages(logsRes.data.anyDamages);
        setExtraInformation(logsRes.data.extraInformation);
    }

    const submit = async (e) => {
        e.preventDefault();

        try {
            const logFormData = {
                brandName,
                modelName,
                modelYear,
                modelColor,
                mileage,
                oilChanged,
                brakesChecked,
                lightsChecked,
                anyDamages,
                extraInformation
            };

            if(id === undefined) { 
                await axios.post('/logs/', logFormData);
            }
            else {
                await axios.put('/logs/update/' + id, logFormData);
            }
            history.push('/')
        } 
        
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <Button onClick={handleBack}>Go Back</Button>
            <h3>{id === undefined ? 'Create New Log' : 'Edit Log'}</h3>
            <Form onSubmit={submit}>
                <FormGroup>
                    <Label>
                        Brand Name
                        <Input 
                            type='text'
                            value={brandName}
                            onChange={e => setBrandName(e.target.value)}
                        />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Model Name
                        <Input 
                            type='text'
                            value={modelName}
                            onChange={e => setModelName(e.target.value)}
                        />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Model Year
                        <Input 
                            type='text'
                            value={modelYear}
                            onChange={e => setModelYear(e.target.value)}
                        />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Model Color
                        <Input 
                            type='select'
                            value={modelColor}
                            onChange={e => setModelColor(e.target.value)}
                        >
                            <option value='Red'>Red</option>
                            <option value='Blue'>Blue</option>
                            <option value='White'>White</option>
                            <option value='Black'>Black</option>
                            <option value='Yellow'>Yellow</option>
                            <option value='Orange'>Orange</option>
                            <option value='Green'>Green</option>
                            <option value='Gray'>Gray</option>
                            <option value='Purple'>Purple</option>
                            <option value='Pink'>Pink</option>
                        </Input>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Mileage
                        <Input 
                            type='text'
                            value={mileage}
                            onChange={e => setMileage(e.target.value)}
                        />
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input 
                            type='checkbox'
                            checked={oilChanged}
                            onChange={e => setOilChanged(e.target.checked)}
                        /> {''} Oil Changed?
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input 
                            type='checkbox'
                            checked={brakesChecked}
                            onChange={e => setbrakesChecked(e.target.checked)}
                        /> {''} Brakes Checked?
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input 
                            type='checkbox'
                            checked={lightsChecked}
                            onChange={e => setLightsChecked(e.target.checked)}
                        /> {''} Lights Checked?
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input 
                            type='checkbox'
                            checked={anyDamages}
                            onChange={e => setAnyDamages(e.target.checked)}
                        /> {''} Any Damages?
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Extra Information
                        <Input 
                            type='textarea'
                            value={extraInformation}
                            onChange={e => setExtraInformation(e.target.value)}
                        />
                    </Label>
                </FormGroup>
                <Button type='submit'> {id === undefined ? 'Submit Log' : 'Submit Updated Log'} </Button>
            </Form>
        </div>
    )
}
