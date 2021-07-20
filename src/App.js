
import React, { useState } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import { Container, Row } from 'react-bootstrap';
import SignIn from "./pages/SignIn";
import { AuthProvider } from "./components/Auth";
import app from "./firebase.js";
import MainPage from './pages/MainPage';
import PrinterDetails from './pages/PrinterDetails';
import AllServices from './pages/AllServices'
import PrivateRoute from './components/PrivateRoute';
import TopNav from './components/Navbar';
import {
  ReactReduxFirebaseProvider,
  createFirestoreInstance
} from "react-redux-firebase";
import 'firebase/database';



function App() {
  const [user, setUser] = useState()

  app.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  });


  return (
    <Router>
      <Provider store={store}>
        <ReactReduxFirebaseProvider
          firebase={app}
          config={{
            useFirestoreForProfile: true,
            userProfile: "printers",
            createFirestoreInstance,
          }}
          dispatch={store.dispatch}
          createFirestoreInstance={createFirestoreInstance}
        >
          <AuthProvider>
            {user && <TopNav />}
            {!user ? <Redirect to="/main" /> : null}
            <Switch>
              <>
                <Route exact path="/login">
                  <SignIn />
                </Route>
                <Container>
                  <Row>
                    <PrivateRoute path="/printers/:product" component={PrinterDetails} />
                    <PrivateRoute path="/main" component={MainPage} />
                    <PrivateRoute path="/details" component={AllServices} />
                  </Row>
                </Container>
              </>
            </Switch>
          </AuthProvider>
        </ReactReduxFirebaseProvider>
      </Provider>
    </Router>
  );
}

export default App;
