
const initialState = {
    step: 0,
    printers: [

    ]
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_PRINTERS': {
            return {
                ...state,
                printers: [...state.printers, action.payload.data],
            }
        }
        case 'CLEAN_PRINTERS': {
            return {
                ...state,
                printers: [],
            }
        }
        case 'GET_CURRENT_PRINTER': {
            return {
                ...state,
                currentPrinter: action.payload.data(),
                id: action.payload.id
            }
        }
        default:
            return state
    }
}