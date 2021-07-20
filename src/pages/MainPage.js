import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchPrinters, cleanPrinters } from '../Redux/actions'
import { useHistory } from 'react-router-dom';
import m200plus from '../img/m200.jpg'
import m200 from '../img/m2001.jpg'


const MainPage = ({ fetchPrinters, cleanPrinters, printers }) => {
    let history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false)


    useEffect(() => {
        if (!isLoaded) {
            fetchPrinters();
            console.log('FETCH PRINTERS')
            setIsLoaded(true)
        }
        return () => {
            cleanPrinters();
        };
    }, [fetchPrinters, cleanPrinters, isLoaded]);

    const handleClick = (printer) => {
        history.push(`/printers/${printer.serial}`)
    }


    return (
        <Container>
            <Row>
                {printers.map(printer => (
                    <Col key={printer.serial} md={4} className="mt-4">
                        <Card style={{ backgroundImage: `url(${m200plus})` }} className="card card-cover h-100 overflow-hidden text-white rounded-5 shadow-lg">
                            <Card.Body className="card-body d-flex flex-column h-100 p-5 text-white text-shadow-1">
                                <Card.Title>SERIAL: {printer.serial}</Card.Title>
                                <Card.Text className="card-text pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                                    {printer.name}
                                </Card.Text>
                                <Button onClick={() => handleClick(printer)} variant="btn btn-outline-secondary">Zgłoś serwis</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPrinters: () => dispatch(fetchPrinters()),
        cleanPrinters: () => dispatch(cleanPrinters()),
    }
}

function mapStateToProps(state, ownProps) {
    const { printers } = state.appReducer
    return {
        printers: printers
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
