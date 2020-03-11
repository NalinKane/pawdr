import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCustomerStore } from "../../store";

function PrivateRoute({ children, ...rest }) {
  const { user } = useCustomerStore();
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
