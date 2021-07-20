import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Auth } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(Auth);
    console.log(!!currentUser)
    console.log(rest)
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                        <Redirect to={"/login"} />
                    )
            }
        />
    );
};


export default PrivateRoute