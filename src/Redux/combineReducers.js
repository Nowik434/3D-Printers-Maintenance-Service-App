import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import appReducer from '../Redux/reducer'

const rootReducer = combineReducers({
    firestore: firestoreReducer,
    appReducer
})
export default rootReducer