import { getFirestore } from 'redux-firestore';

export function fetchPrinters() {
    return (dispatch) => {
        const firestore = getFirestore();
        firestore.collection('printers').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dispatch({
                    type: 'FETCH_PRINTERS',
                    payload: {
                        data: doc.data(),
                        id: doc.id
                    }
                })
            });
        });
    }
}

export function cleanPrinters() {
    return (dispatch) => {
        dispatch({
            type: 'CLEAN_PRINTERS',
            payload: []
        })
    }
}

export function getCurrentPrinter(id) {
    return (dispatch) => {
        const firestore = getFirestore();
        firestore.collection('printers').where("serial", "==", id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dispatch({
                    type: 'GET_CURRENT_PRINTER',
                    payload: doc
                })
            });
        });
    }
}

export function addServiceRequest(id, description) {
    return (dispatch) => {
        const firestore = getFirestore();
        firestore.collection('printers').doc(id).update({
            services: firestore.FieldValue.arrayUnion(
                {
                    newServiceRequest: true,
                    dateOfService: new Date(),
                    attentions: description,
                    scopeOfWork: [],

                }
            )
        })

        dispatch({
            type: 'ADD_SERVICE_REQUEST',
            payload: 'fdfdsfds'
        })
    }
}
