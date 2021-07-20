import React, { useState, useEffect } from 'react'
import { Button, Nav, Navbar, Container } from 'react-bootstrap';
import app from "../firebase.js";
import {
    Link
} from "react-router-dom";
import logo from '../logo.svg'

export default function TopNav() {
    const [user, setUser] = useState()



    useEffect(() => {
        app.auth().onAuthStateChanged(function (user) {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        });
    });

    return (
        <div>
            {user &&
                <Navbar bg="light" variant="light">
                    <Container>
                        <Navbar.Brand className="ml-auto" href="/main">
                            <img className="brand-logo" src={logo} alt="serwis drkarek 3D" />
                        </Navbar.Brand>
                        <Nav className="mr-auto">
                            <Link className="nav-link" to="/details">Wszystkie serwisy</Link>
                            <Link className="nav-link" to="/main">Drukarki</Link>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Button onClick={() => app.auth().signOut()} variant="outline-primary">Wyloguj</Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            }
        </div>
    )
}
