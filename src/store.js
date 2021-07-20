import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './Redux/combineReducers';
import app from "./firebase.js";
import thunk from "redux-thunk";
import 'firebase/firestore'
import {
    getFirebase,
} from "react-redux-firebase";
import { reduxFirestore } from 'redux-firestore';


const store = createStore(rootReducer, composeWithDevTools(
    reduxFirestore(app),
    applyMiddleware(
        thunk.withExtraArgument({
            getFirebase,
            getFirestore: () => getFirebase().firestore()
        })
    ),
));

export default store;
