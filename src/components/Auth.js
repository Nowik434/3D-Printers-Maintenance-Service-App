import React, { useEffect, useState } from "react";
import app from "../firebase.js";

export const Auth = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    if (pending) {
        return <>Ładowanie...</>
    }

    return (
        <Auth.Provider
            value={{
                currentUser: currentUser
            }}
        >
            {children}
        </Auth.Provider>
    );
};