import React, { useState } from 'react';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addServiceRequest } from '../Redux/actions';


function Form({ show, handleClose, printer, addServiceRequest, printerId }) {
    const [description, setDescription] = useState();


    const handleSubmit = (e) => {
        e.preventDefault();
        addServiceRequest(printerId, description);
        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Zgłoszenie serwisowe</Modal.Title>
                </Modal.Header>
                <Modal.Body as="div">
                    <Container>
                        <Row>
                            <Col>
                                <form>
                                    <div class="mb-3">
                                        <h3>Model drukarki: {printer ? printer.name : 'ładowanie...'}</h3>
                                        <h3>Numer seryjny: {printer ? printer.serial : 'ładowanie...'}</h3>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleInputPassword1" class="form-label">Napisz co nie działa</label>
                                        <textarea onChange={(e) => setDescription(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Zamknij
            </Button>
                    <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
                        Wyślij zgłoszenie
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapDispatchToProps = (dispatch) => {

    return {
        addServiceRequest: (printerId, description) => dispatch(addServiceRequest(printerId, description)),
    }
}

function mapStateToProps(state) {
    return {
        printerId: state.appReducer.id
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);