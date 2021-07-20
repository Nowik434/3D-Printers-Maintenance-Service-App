import React, { useCallback, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import app from '../firebase';
import { Auth } from '../components/Auth';
import { withRouter, Redirect } from 'react-router';


const SignIn = ({ history }) => {
    const handleLogin = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    // const { currentUser } = useContext(Auth);
    console.log(useContext(Auth))

    // if (currentUser) {
    //     return <Redirect to="/" />
    // }

    return (
        <main className="form-signin">
            <Form onSubmit={handleLogin}>
                <h1 className="h3 mb-3 fw-normal">Zaloguj się</h1>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Adres Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember Me" className="checkbox mb-3 mt-3" />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 btn btn-lg btn-primary">
                    Zaloguj
            </Button>
            </Form>
        </main>
    )
}

export default withRouter(SignIn);