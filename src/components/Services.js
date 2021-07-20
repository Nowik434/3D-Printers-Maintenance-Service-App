import React from 'react';

function Services(data) {
    const { dateOfService, scopeOfWork, attentions, newServiceRequest } = data.data;
    console.log(newServiceRequest)

    const serviceDate = new Date(dateOfService.seconds * 1000).toLocaleDateString()

    return (
        <React.Fragment>
            <tbody className={newServiceRequest ? "bg-primary" : null}>
                <tr>
                    <td>{data.index + 1}</td>
                    <td>{serviceDate}</td>
                    <td>
                        {newServiceRequest ? <p>Nowe zgłoszenie serwisowe</p> :
                            <ul>
                                {scopeOfWork.map(done => (<li>{done}</li>))}
                            </ul>}
                    </td>
                    <td>{attentions ? attentions : 'brak uwag'}</td>
                </tr>
            </tbody>
        </React.Fragment>
    )
}

export default Services;