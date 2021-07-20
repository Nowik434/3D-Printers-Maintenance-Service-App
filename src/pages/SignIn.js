import React, { useCallback, useContext, useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import app from '../firebase';
import { Auth } from '../components/Auth';
import { withRouter, Redirect } from 'react-router';


const SignIn = ({ history }) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        const checkbox = localStorage.getItem('checkbox')
        console.log(checkbox)
        if (checkbox) {
            setFormData({
                ...formData,
                email: localStorage.getItem('userName'),
                password: localStorage.getItem('password')
            });
            setIsChecked(true)
        }
        console.log(isChecked)
        return {

        }
    }, [])

    const updateFormData = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleLogin = useCallback(async event => {
        event.preventDefault();
        // const { email, password } = formData;

        if (isChecked) {
            localStorage.setItem('userName', formData.email);
            localStorage.setItem('password', formData.password);
            localStorage.setItem('checkbox', true);
            setIsChecked(true)
        } else {
            localStorage.removeItem('userName');
            localStorage.removeItem('password');
            localStorage.removeItem('checkbox');
            setIsChecked(false)
        }

        try {
            await app
                .auth()
                .signInWithEmailAndPassword(formData.email, formData.password);
            history.push("/main");
        } catch (error) {
            // console.log(error);
            switch (error.code) {
                case 'auth/invalid-email':
                    setErrorMessage('Niepoprawny adres email')
                    break;
                case 'auth/wrong-password':
                    setErrorMessage('Nieprawidłowe hasło')
                    break;
                case 'auth/user-not-found':
                    setErrorMessage('Taki użytkownik nie istnieje')
                    break;
                default:
                    console.log(error.message)
            }
        }
    }, [history, isChecked, formData]);

    const { currentUser } = useContext(Auth);

    if (currentUser) {
        return <Redirect to="/main" />
    }


    return (
        <main className="signin" style={{
            backgroundImage: `linear-gradient(#f9fafb, #f9fafbcc), url(/images/bg1.jpg)`,
            backgroundRepeat: 'no-repeat',
            'backgroundSize': 'cover',
        }}>
            <Form className="form-signin" onSubmit={handleLogin}>
                <h1 className="h3 mb-3 fw-normal">Zaloguj się</h1>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Adres Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Wpisz adres email..." value={formData.email} onChange={e => updateFormData(e)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Wpisz hasło..." value={formData.password} onChange={e => updateFormData(e)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>{errorMessage}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check checked={isChecked} type="checkbox" onChange={() => setIsChecked(!isChecked)} label="Zapamiętaj mnie" className="checkbox mb-3 mt-3" />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 btn btn-lg btn-primary">
                    Zaloguj
            </Button>
            </Form>
        </main>
    )
}

export default withRouter(SignIn);