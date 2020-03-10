import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCustomerStore } from "../../services/LoginService";

function PrivateRoute({ children, ...rest }) {
  const { user } = useCustomerStore();
  console.log("user", user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
