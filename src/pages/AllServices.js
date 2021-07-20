import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchPrinters, cleanPrinters } from '../Redux/actions';


const AllServices = ({ fetchPrinters, cleanPrinters, printers }) => {

    useEffect(() => {
        fetchPrinters();
        return () => {
            cleanPrinters();
        };
    }, [fetchPrinters, cleanPrinters]);

    return (
        <div className="mt-5">
            {printers.map(printer => (
                <>
                    <h1>{printer.name} - {printer.serial}</h1>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Data Serwisu</th>
                                <th>Zakres prac</th>
                                <th>Uwagi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {printer.services.map(service => (
                                <tr>
                                    <td>{new Date(service.dateOfService.seconds * 1000).toLocaleDateString()}</td>
                                    <td>
                                        <ul>
                                            {service.scopeOfWork >= 0 ? null :
                                                service.scopeOfWork.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))
                                            }
                                        </ul>
                                    </td>
                                    <td>{service.attentions}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            ))}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllServices)