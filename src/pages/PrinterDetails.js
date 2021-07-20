import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as useParams } from "react-router-dom";
import { getCurrentPrinter } from '../Redux/actions';
import { Jumbotron, Button, Table, Col, Image, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import Services from '../components/Services';
import Form from '../components/Form';

const PrinterDetails = ({ printerId, getCurrentPrinter, printer }) => {
    let uniqid = require('uniqid');

    useEffect(() => {
        getCurrentPrinter();
    }, [getCurrentPrinter]);

    const isLoaded = useMemo(() => printer && Object.keys(printer).length !== 0, [printer])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(uniqid())
    return (
        <React.Fragment>
            {isLoaded ?
                <>
                    <Jumbotron>
                        <Container>
                            <Row>
                                <Col xs={6} md={4}>
                                    <Image style={{ width: '100%' }} src="https://images-na.ssl-images-amazon.com/images/I/61aiRuGPewL._SL1500_.jpg" rounded />
                                </Col>
                                <Col xs={6} md={4}>
                                    <h1>{isLoaded ? printer.name : "nie załadowano"}</h1>
                                    <h3>
                                        SERIAL: {isLoaded ? printer.serial : "nie działa"}
                                    </h3>
                                    <p>
                                        <Button variant="primary" onClick={handleShow}>Zgłoś serwis</Button>
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>

                    <Form show={show} handleClose={handleClose} printer={printer} />

                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Data Serwisu</th>
                                <th>Zakres prac</th>
                                <th>Uwagi</th>
                            </tr>
                        </thead>
                        {isLoaded ? printer.services ? printer.services.map((data, index) => (
                            <Services key={uniqid()} index={index} data={data} />
                        )) : <tbody><tr><td>brak danych</td></tr></tbody> : "nie działa"}
                    </Table>
                </>
                :
                <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                </div>
            }
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const id = ownProps.match.params.product
    return {
        getCurrentPrinter: () => dispatch(getCurrentPrinter(id)),
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params
    console.log(state)
    return {
        printerId: id,
        printer: state.appReducer.currentPrinter
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrinterDetails)
