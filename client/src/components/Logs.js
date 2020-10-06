import React from 'react'
import UserContext from '../context/UserContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {ListGroup, ListGroupItem} from 'reactstrap';
import Log from './Log';

export default function Logs() {
    const {logs} = React.useContext(UserContext);
    const [logsValue] = logs;

    return (
        <div>
            <ListGroup>
                <TransitionGroup>
                    {logsValue.logs !== undefined ? (
                        logsValue.logs.map((elem) => (
                            <CSSTransition timeout={500} classNames='fade' >
                                <ListGroupItem>
                                    < Log data={elem}/>
                                </ListGroupItem>
                            </CSSTransition>
                        ))
                    ):null}
                </TransitionGroup>
            </ListGroup>
        </div>
    )
}
