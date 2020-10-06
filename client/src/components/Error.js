import React from 'react';
import {Alert, Button, ButtonGroup} from 'reactstrap'

export default function Error(props) {
    return (
        <div>
            <Alert color='danger'>
                {props.message}
                <ButtonGroup>
                    <Button color='danger' onClick={props.clearError} >&times;</Button>
                </ButtonGroup>
            </Alert>
        </div>
    )
}
